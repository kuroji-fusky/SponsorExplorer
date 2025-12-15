import { writable } from "svelte/store"

export const SIDEBAR_OPEN = writable(true)
export const SIDEBAR_OPEN_MOBILE = writable(false)
export const IS_MOBILE = writable(false)

export const IS_KANBAN_MODE = writable(false)

export const YT_IFRAME_API_LOADED = writable(false)

export { preemptive_load_channel_metadata, preemptive_load_video_metadata } from "./preemptiveMeta"
