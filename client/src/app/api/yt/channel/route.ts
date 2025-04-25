import { formatYTTimecode } from "@/utils"
import { youtube, type yt } from "@/lib"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams
  const channelId = urlParams.get("id")!

  const noVideoFetch = Number(urlParams.get("no_vid"))!

  let fetchedData: [yt.Responses.ChannelList, number] | null = null

  // YT API can be annoying wtf
  // WHY DO I HAVE TO DO THREE API CALLS JUST TO GET CHANNEL VIDEOS WITH VIDEO LENGTH LOL

  // 1. Do a /channels call
  const isValidChannelId = channelId.startsWith("UC")

  const channelFetchParams = {
    part: ["snippet", "contentDetails", "statistics"],
    maxResults: 1,
  } satisfies Parameters<typeof youtube.channels>[0]

  // Check if the channel ID starts with "UC"
  if (!fetchedData && isValidChannelId) {
    fetchedData = await youtube.channels({
      id: channelId,
      ...channelFetchParams,
    })
  } else if (!fetchedData && channelId.startsWith("@")) {
    fetchedData = await youtube.channels({
      forHandle: `${channelId}` as `@${typeof channelId}`,
      ...channelFetchParams,
    })
  } else {
    fetchedData = await youtube.channels({
      forUsername: channelId,
      ...channelFetchParams,
    })
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Items fetched =>", fetchedData)
  }

  // if (!fetchedData.pageInfo) {
  //   throw new Error(`Channel query for ${channelId} doesn't exist. Maybe you made a typo?`)
  // }

  const [firstChannelItem] = fetchedData[0].items

  // 2. Get videos from the channel
  let videoCollection = []

  // Huge thanks to this guy: https://stackoverflow.com/a/76602819/18905871
  const [playlistData] = await youtube.playlistItems({
    playlistId: firstChannelItem.id.replace(/^UC/, "UULF"),
    maxResults: 48,
  })

  const channelDetails = {
    id: firstChannelItem.id,
    channelName: firstChannelItem.snippet.title,
    thumbs: firstChannelItem.snippet.thumbnails.medium.url,
    joinDate: firstChannelItem.snippet.publishedAt,
    videoCount: playlistData.pageInfo.totalResults,
  }

  // `no_vid=1` parameter so we don't get exhastive calls from other APIs, used for displaying channel avatar and other minimal info
  if (noVideoFetch === 1)
    return NextResponse.json({ channel: channelDetails, videos: [] })

  // This is a hacky way to check if there are no uploads on the channel, might refactor this soon
  if (parseInt(firstChannelItem.statistics.videoCount) === 0) {
    return NextResponse.json({ channel: channelDetails, videos: [] })
  }

  videoCollection = playlistData.items.map(
    (item) => item.contentDetails.videoId,
  )

  // 3. Concat all the videos from the /videos call
  const [videosData] = await youtube.videos({
    part: ["snippet", "contentDetails"],
    id: videoCollection.join(","),
  })

  // Parse dat data
  const parsedVideoData = videosData.items.map(
    ({ snippet, id, contentDetails }) => ({
      id,
      title: snippet.title,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      uploadDate: snippet.publishedAt,
      isPremiere: snippet.liveBroadcastContent,
      duration: contentDetails.duration
        ? formatYTTimecode(contentDetails.duration)
        : "",
    }),
  )

  return NextResponse.json({ channel: channelDetails, videos: parsedVideoData })
}
