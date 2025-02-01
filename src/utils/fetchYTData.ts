"use server"

import { cache } from "react"
import { headers } from "next/headers"
import type { VideoInfoType } from "@/types"
import { fetchWrapper } from "./fetchWrapper"
import type { yt } from "./YT.types"

export const fetchVideoData = cache(async (id: string) => {
  const urlBase = (await headers()).get("x-url-origin")

  const [fetchVideoInfo] = await fetchWrapper<VideoInfoType>(
    `${urlBase}/api/yt/video?id=${id}&min=1`,
    { cache: "force-cache" },
  )

  const channelId = fetchVideoInfo.video.channelId

  const [channelRes] = await fetchWrapper<yt.Responses.ChannelList>(`${urlBase}/api/yt/channel?id=${channelId}&no_vid=1`)

  const yes = {
    video: {
      ...fetchVideoInfo.video,
      channelAvatar: channelRes.thumbs
    },
    state: fetchVideoInfo.state,
  }

  console.log(yes)

  return yes
})

export const fetchChannelData = cache(async (id: string) => {
  const urlBase = (await headers()).get("x-url-origin")

  const [fetchChannelInfo] = await fetchWrapper<VideoInfoType>(
    `${urlBase}/api/yt/channel?id=${id}`,
    { cache: "no-cache" },
  )

  return fetchChannelInfo
})
