import type { SBSegmentData, Segments } from "$lib/types"
import type { PageServerLoad } from "./$types"
import { parseDateStr, ytApiKey } from "$lib/utils"
import { error, redirect } from "@sveltejs/kit"
import { youtube } from "@googleapis/youtube"

const SB_BASE_URL = "https://sponsor.ajay.app/api"

const endpoints = {
  segments: {
    search: `${SB_BASE_URL}/searchSegments`,
    lock: `${SB_BASE_URL}/lockCategories`
  }
}

export const load = (async ({ params, url }) => {
  const { id } = params

  // TODO rewrite url and strip ?from* query params if channel, handle, or username don't match to the video
  if (id === "rickroll") {
    redirect(308, "/video/dQw4w9WgXcQ?isRickrollEasterEgg=1")
  }

  if (!ytApiKey) {
    error(500, { message: "YouTube API key missing or undefined." })
  }

  const fromPlaylistIdQuery = url.searchParams.get("fromPlaylistId")
  const fromUsernameQuery = url.searchParams.get("fromUsername")
  const fromChannelIdQuery = url.searchParams.get("fromChannelId")

  const CACHE_HEADERS = {
    headers: {
      "cache-control": "public, max-age=1800"
    }
  }

  // YouTube Data API
  const yt = youtube("v3")

  const ytVideoDetails = await yt.videos.list(
    {
      id: params.id,
      part: ["snippet"],
      key: ytApiKey
    },
    CACHE_HEADERS
  )

  const { items } = ytVideoDetails.data

  if (items!.length === 0) {
    error(404, {
      message: "Video not found; check if URL is a vaild YouTube video"
    })
  }

  const {
    channelId,
    channelTitle,
    title: videoTitle,
    publishedAt
  } = items![0].snippet!

  const ytChannelDetails = await yt.channels.list(
    {
      id: [channelId] as string[],
      part: ["snippet"],
      key: ytApiKey
    },
    CACHE_HEADERS
  )

  const {
    customUrl: channelHandle,
    thumbnails,
    publishedAt: channelJoinDate
  } = ytChannelDetails.data.items![0].snippet!

  const ytData = {
    channelId,
    channelTitle,
    channelHandle,
    channelJoinDate,
    channelAvatar: thumbnails?.medium?.url!,
    videoTitle,
    videoPublishDate: new Date(publishedAt!).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }

  // SponsorBlock
  // TODO wrap this into it's own file
  // I'll clean this up sometime, this is an eyesore lol

  const lockedRes = await fetch(
    `${SB_BASE_URL}/lockCategories?videoID=${params.id}&actionType=["skip"]`
  )

  interface LockedSegmentActionType {
    reason?: string
    categories?: Segments
  }

  interface LockedSegments {
    skip: LockedSegmentActionType
    mute: LockedSegmentActionType
    fullLabel: LockedSegmentActionType
  }

  let errorMsg = ""
  let segmentCount = 0
  let parsedSegments: object[] = []
  let lockedSegments: LockedSegments

  // Locked segments
  try {
    const lockedJSONRes = await lockedRes.json()

    console.log("lockedJSONRes =>", lockedJSONRes)

    lockedSegments = {
      skip: {
        reason: lockedJSONRes.reason,
        categories: lockedJSONRes.categories
      },
      mute: {},
      fullLabel: {}
    }
  } catch {
    if (lockedRes.status == 404) {
      lockedSegments = {
        skip: {},
        mute: {},
        fullLabel: {}
      }
    }
  }

  const segmentRes = await fetch(
    `${endpoints.segments.search}?videoID=${id}`,
    CACHE_HEADERS
  )
  // Video segments
  try {
    const segmentJSONRes = await segmentRes.json()

    segmentCount = segmentJSONRes.segmentCount

    // TODO add a check for more segments, by default it gets recent segments up to 10
    if (segmentCount > 10) {
      console.log("loop that shit")
    }

    segmentJSONRes.segments.forEach((segment) => {
      const {
        timeSubmitted,
        UUID,
        category,
        actionType,
        startTime,
        endTime,
        votes,
        views,
        locked,
        shadowHidden,
        hidden,
        description,
        userID
      } = segment

      const { isoDate, readableDate } = parseDateStr(timeSubmitted)

      parsedSegments.push({
        submittedDate: isoDate,
        submittedDateReadable: readableDate,
        segmentLabel: category,
        segmentAction: actionType,
        startTime,
        endTime,
        votes,
        views,
        isLocked: Boolean(locked),
        isHidden: Boolean(hidden),
        isShadowHidden: Boolean(shadowHidden),
        uuid: UUID,
        userid: userID,
        actionType,
        chapterLabel: description
      })
    })
  } catch {
    if (segmentRes.status === 404) {
      errorMsg =
        "Couldn't fetch segments, either the video ID may be invalid, or there are no submitted segments available for this video."
    }
  }

  const data = {
    id,
    fromPlaylistIdQuery,
    fromUsernameQuery,
    fromChannelIdQuery,
    yt: ytData,
    sponsorblock: {
      statusCode: segmentRes.status,
      segmentCount,
      items: parsedSegments as SBSegmentData[],
      lockedSegments,
      errors: errorMsg
    }
  }

  console.log("Response =>", data)

  return data
}) satisfies PageServerLoad
