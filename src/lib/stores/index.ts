import { writable } from "svelte/store"

const togglerStore = (state: boolean) => {
  const { subscribe, update } = writable(state)

  const toggleState = () => update((prevState) => (prevState = !prevState))

  return { subscribe, toggleState }
}

export const optionToggle = togglerStore(false)
export const watchlistToggle = togglerStore(false)

export const ytPlayerState = writable("Not started")
export const ytCurrentTime = writable("0")

export const segmentCollection = writable<unknown[]>([])
