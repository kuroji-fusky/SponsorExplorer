import { createContext } from "svelte"
import type { ChannelResponse, VideoResponse } from "$lib/types/proxy-api"

export const [getVideoMeta, setVideoMeta] = createContext<
  { id: string } & VideoResponse["details"]
>()

export const [getChannelMeta, setChannelMeta] = createContext<
  Omit<ChannelResponse, "videos"> & { videoCount: number }
>()
