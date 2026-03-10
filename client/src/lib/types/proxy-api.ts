// TODO keep the types in sync with Go structs from the proxy server
export type VideoType = "uploads" | "shorts" | "live"

export interface ChannelResponse {
  name: string
  handle: string
  id: string
  avatar: string
  videos: Omit<VideoResponse, "channel">
}

export interface VideoResponse {
  id: string
  details: {
    title: string
    thumbnail: string
    duration: number
    uploadDate: string
    _type: VideoType
    channel: Omit<ChannelResponse, "videos">
  }
  segments: unknown[] /* needs implementation */
}
