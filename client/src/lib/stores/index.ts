import { writable } from "svelte/store"

export const SIDEBAR_OPEN = writable(true)
export const SIDEBAR_OPEN_MOBILE = writable(false)
export const IS_MOBILE = writable(false)

export const IS_KANBAN_MODE = writable(false)
