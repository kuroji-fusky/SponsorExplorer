import type { SBSegmentData } from "$lib/types"
import type { PageServerLoad } from "./$types"
import { parseDateStr } from "$lib/utils"
import { SECRET_YT_DATA_API_KEY } from "$env/static/private"
import { youtube } from "@googleapis/youtube"

const SB_BASE_URL = "https://sponsor.ajay.app/api"

const endpoints = {
  segments: {
    search: `${SB_BASE_URL}/searchSegments`,
    lock: `${SB_BASE_URL}/lockCategories`
  }
}

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params

  // YouTube Data API
  // const yt = youtube("v3")

  // yt.videos.list({
  //   id: params.id,
  //   key: SECRET_YT_DATA_API_KEY
  // })

  // SponsorBlock
  // TODO wrap this into it's own file
  // I'll clean this up sometime, this is an eyesore lol
  const segmentRes = await fetch(`${endpoints.segments.search}?videoID=${id}`)
  // const lockedRes = await fetch(
  //   `${SB_BASE_URL}/lockCategories?videoID=${params.id}&service=YouTube&actionTypes=["skip","poi","chapter","mute","full"]`
  // )

  let errorMsg = ""
  let parsedSegments: object[] = []
  // let lockedSegments = {}

  try {
    // TODO add a check for more segments, by default it gets recent segments up to 10
    const segmentJSONRes = await segmentRes.json()
    // const lockedJSONRes = await lockedRes.json()

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
        "Couldn't fetch segments, either the video ID is invalid, the main server (https://sponsor.ajay.app/) is temporarily unavailable or couldn't handle request. Switch to a different server as they have cached segments at this time."
    }
  }

  console.log("Parsed segments =>", parsedSegments)

  return {
    id,
    sponsorblock: {
      statusCode: segmentRes.status,
      items: parsedSegments as SBSegmentData[],
      errors: errorMsg
    }
  }
}
