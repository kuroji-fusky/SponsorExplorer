import { writable } from "svelte/store"

interface VideoMeta {
  title: string
  channelAvatarUrl: string
  channelName: string
  channelId: string
  description: string
}

interface ChannelMeta {
  channelAvatarUrl: string
  channelName: string
  videoCount: number
}

export const preemptive_load_video_metadata = writable<VideoMeta | null>(null)
// biome-ignore format:
export const preemptive_load_channel_metadata = writable<ChannelMeta | null>(null)
