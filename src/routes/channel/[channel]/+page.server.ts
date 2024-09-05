import type { PageServerLoad } from "./$types"
import { youtube, type youtube_v3 } from "@googleapis/youtube"
import type { GaxiosResponse, GaxiosPromise } from "gaxios"

import { ytApiKey } from "$lib/utils"
import { error } from "@sveltejs/kit"

export const ssr = true

export const load = (async ({ params }) => {
  const channelParam = params.channel!

  const isChannelId = channelParam.startsWith("UC")
  const isChannelHandle = channelParam.startsWith("@")

  if (!ytApiKey) {
    error(500, { message: "YouTube API key missing or undefined." })
  }

  // YouTube Data API
  const yt = youtube("v3")

  let fetchContents:
    | GaxiosResponse<youtube_v3.Schema$ChannelListResponse>
    | GaxiosPromise<PageServerLoad>

  const COMMON_PARAMS = {
    part: ["snippet", "contentDetails"],
    maxResults: 50,
    key: ytApiKey
  }

  const HEADERS = {
    headers: {
      "Cache-Control": "public, max-age=1200" // cache results for 20 mins
    }
  }

  if (isChannelId) {
    fetchContents = await yt.channels.list(
      {
        id: channelParam,
        ...COMMON_PARAMS
      },
      HEADERS
    )
  }

  if (isChannelHandle) {
    fetchContents = await yt.channels.list(
      {
        forHandle: channelParam,
        ...COMMON_PARAMS
      },
      HEADERS
    )
  }

  try {
    // @ts-ignore
    const _items = fetchContents.data.items![0]
    const idUploads = _items.contentDetails?.relatedPlaylists?.uploads!

    const channelUploadResponse = await yt.playlistItems.list({
      playlistId: idUploads,
      part: ["contentDetails"],
      key: ytApiKey,
      maxResults: 40
    })

    const videoIterable = channelUploadResponse.data.items?.map(
      (i) => i.contentDetails!.videoId!
    )
    const videoContents = await yt.videos.list(
      {
        id: videoIterable,
        ...COMMON_PARAMS
      },
      HEADERS
    )

    const queryData = {
      details: {
        title: _items.snippet?.title!,
        avatar: _items.snippet?.thumbnails?.high?.url!
      },
      videos: videoContents.data.items!.map(
        ({ snippet, contentDetails, id }) => {
          const publishDate = new Date(
            snippet?.publishedAt!
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          })

          return {
            id: id!,
            title: snippet?.title!,
            thumbnail: snippet?.thumbnails?.medium?.url!,
            publishDate: publishDate!,
            duration: contentDetails?.duration!
          }
        }
      )
    }

    console.log("qData", queryData)

    return queryData
  } catch (e) {
    if (e.status === 404) {
      error(404, { message: "No contents for this channel" })
    }

    return {
      errors: {
        msg: "Returned undefined, check if the handle/id is a valid YouTube channel",
        channelParam
      }
    }
  }
}) satisfies PageServerLoad
