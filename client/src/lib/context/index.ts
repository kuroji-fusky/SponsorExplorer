import { createContext } from "svelte"
import type { VideoResponse } from "$lib/types/proxy-api"

export const [getVideoMeta, setVideoMeta] = createContext<
  { id: string } & VideoResponse["details"]
>()
