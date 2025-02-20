"use server"

import { cache } from "react"
import { headers } from "next/headers"
import type { VideoInfoType } from "@/types"
import { fetchWrapper } from "./fetchWrapper"
import type { yt } from "@/lib/YT.types"

export const fetchVideoData = cache(async (id: string) => {
  const urlBase = (await headers()).get("x-url-origin")

  const [fetchVideoInfo] = await fetchWrapper<VideoInfoType>(
    `${urlBase}/api/yt/video?id=${id}&min=1`,
    { cache: "no-cache" },
  )

  const channelId = fetchVideoInfo.video.channelId
  const [channelRes] = await fetchWrapper<yt.Responses.ChannelList>(`${urlBase}/api/yt/channel?id=${channelId}&no_vid=1`)

  return {
    video: {
      ...fetchVideoInfo.video,
      channelAvatar: channelRes.thumbs
    },
    state: fetchVideoInfo.state,
  }
})

export const fetchChannelData = cache(async (id: string) => {
  const urlBase = (await headers()).get("x-url-origin")

  const [fetchChannelInfo] = await fetchWrapper<VideoInfoType>(`${urlBase}/api/yt/channel?id=${id}`, {
    cache: "no-cache",
    next: {
      revalidate: 3600 * 1.5
    }
  })

  return fetchChannelInfo
})
