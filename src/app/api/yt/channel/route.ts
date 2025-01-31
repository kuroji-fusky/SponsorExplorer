import { youtube } from "@/utils/YT"
import type { yt } from "@/utils/YT.types"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams
  const channelId = urlParams.get("id")!

  let fetchedData: [yt.Responses.ChannelList, number] | null = null;

  // YT API can be annoying wtf
  // WHY DO I HAVE TO DO THREE API CALLS JUST TO GET CHANNEL VIDEOS WITH VIDEO LENGTH LOL

  // 1. Do a /channels call
  const isValidChannelId = channelId.startsWith("UC")

  const channelFetchParams = {
    part: ["snippet", "contentDetails", "statistics"],
    maxResults: 1
  } satisfies Parameters<typeof youtube.channels>[0]

  // Check if the channel ID starts with "UC"
  if (!fetchedData && isValidChannelId) {
    fetchedData = await youtube.channels({
      id: channelId,
      ...channelFetchParams
    })
  } else if (!fetchedData && channelId.startsWith("@")) {
    fetchedData = await youtube.channels({
      forHandle: `${channelId}` as `@${typeof channelId}`,
      ...channelFetchParams
    })
  } else {
    fetchedData = await youtube.channels({
      forUsername: channelId,
      ...channelFetchParams
    })
  }

  // 2. Get videos from the channel
  let videoCollection = []

  // Huge thanks to this guy: https://stackoverflow.com/a/76602819/18905871
  const [playlistData] = await youtube.playlistItems({
    playlistId: (fetchedData[0].items[0].id).replace(/^UC/, "UULF"),
    maxResults: 35
  })

  videoCollection = playlistData.items.map((item) => item.contentDetails.videoId)

  // 3. Concat all the videos from the /videos call
  const [videosData] = await youtube.videos({
    part: ["snippet", "contentDetails"],
    id: videoCollection.join(","),
  })

  // Parse dat data
  const parsedChannelData = fetchedData[0].items.map(({ snippet }) => ({
    channelName: snippet.title,
    thumbs: snippet.thumbnails.high.url,
    joinDate: snippet.publishedAt
  }))

  const parsedVideoData = videosData.items.map(({ snippet, id, contentDetails }) => ({
    id,
    title: snippet.title,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    date: snippet.publishedAt,
    duration: contentDetails.duration
  }))

  return NextResponse.json({ channel: parsedChannelData, videos: parsedVideoData })
}
