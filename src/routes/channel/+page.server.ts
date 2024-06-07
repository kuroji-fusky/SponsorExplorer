import type { PageServerLoad } from "./$types"
import { SECRET_YT_DATA_API_KEY } from "$env/static/private"
import { youtube, type youtube_v3 } from "@googleapis/youtube"
import type { GaxiosResponse } from "../../../node_modules/gaxios/build/src"

interface ChannelDetails {
  title: string
  handle: string
  avatar: string
  videos?: {
    id: string
    title: string
    publishDate: string
    thumbnail: string
    duration: string
  }[]
}

export const load = (async ({ url }) => {
  const channelIdQuery = url.searchParams.get("id")
  const channelHandleQuery = url.searchParams.get("handle")

  // YouTube Data API
  const yt = youtube("v3")

  let channelDetails: Partial<ChannelDetails> = {}
  let fetchContents: GaxiosResponse<youtube_v3.Schema$ChannelListResponse>

  const COMMON_PARAMS = {
    part: ["snippet", "contentDetails"],
    maxResults: 30,
    key: SECRET_YT_DATA_API_KEY
  }

  if (channelIdQuery) {
    fetchContents = await yt.channels.list({
      id: channelIdQuery,
      ...COMMON_PARAMS
    })
  }

  if (channelHandleQuery) {
    fetchContents = await yt.channels.list({
      forHandle: channelHandleQuery,
      ...COMMON_PARAMS
    })
  }

  // @ts-ignore
  const _items = fetchContents.data.items![0]
  const idUploads = _items.contentDetails?.relatedPlaylists?.uploads!

  const channelUploads = await yt.playlistItems.list({
    playlistId: idUploads,
    part: ["contentDetails"],
    key: SECRET_YT_DATA_API_KEY,
    maxResults: 40
  })

  const videoIterable = channelUploads.data.items?.map(
    (i) => i.contentDetails!.videoId!
  )
  const videoContents = await yt.videos.list({
    id: videoIterable,
    ...COMMON_PARAMS
  })

  const queryData = {
    channelHandleQuery,
    channelIdQuery,
    details: {
      title: _items.snippet?.title!,
      avatar: _items.snippet?.thumbnails?.high?.url!
    },
    videos: videoContents.data.items!.map(({ snippet, contentDetails, id }) => {
      const publishDate = new Date(snippet?.publishedAt!).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      )

      return {
        id,
        title: snippet?.title,
        thumbnail: snippet?.thumbnails?.medium?.url,
        publishDate,
        duration: contentDetails?.duration
      }
    })
  }

  // console.log("`/channel` response =>", queryData)

  return queryData
}) satisfies PageServerLoad
