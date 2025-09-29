"use server"

import { cache } from "react"
import { headers } from "next/headers"
import type { GetAPIResponseType, VideoInfoType } from "@/types"
import { fetchWrapper } from "./fetchWrapper"
import type { GET as _YTChannelRes } from "@/app/api/yt/channel/route"

type YTChannelResponse = GetAPIResponseType<typeof _YTChannelRes>

export const fetchVideoData = cache(async (id: string) => {
  const urlBase = (await headers()).get("x-url-origin")

  const [fetchVideoInfo] = await fetchWrapper<VideoInfoType>(
    `${urlBase}/api/yt/video?id=${id}&min=1`,
    { cache: "no-cache" },
  )

  const channelId = fetchVideoInfo.video.channelId
  const [channelRes] = await fetchWrapper<YTChannelResponse>(`${urlBase}/api/yt/channel?id=${channelId}&no_vid=1`)

  return {
    video: {
      ...fetchVideoInfo.video,
      channelAvatar: channelRes.channel.thumbs
    },
  }
})

export const fetchChannelData = cache(async (id: string) => {
  const urlBase = (await headers()).get("x-url-origin")

  const [fetchChannelInfo] = await fetchWrapper<YTChannelResponse>(`${urlBase}/api/yt/channel?id=${id}`, {
    next: {
      revalidate: 3600 * 1.5
    }
  })

  return fetchChannelInfo
})
