import { Dexie, type EntityTable } from "dexie"

export interface WatchlistClient {
  id: number
  kind: "video" | "channel" | "sb-username" | "sb-userid"
  added: string | Date
  updated: string | Date
}

export interface RecentsClient {
  id: number
  channelId: string
  channelName: string
  channelHandle: string
  added: string | Date
  updated: string | Date
}

const watchlistDB = new Dexie("watchlist") as Dexie & {
  watchlist: EntityTable<WatchlistClient, "id">
  recentsList: EntityTable<RecentsClient, "id">
}

watchlistDB.version(1).stores({
  watchlist: "++id, kind, item, added, updated",
  recentsList: "++id, channelId, channelName, channelHandle, added, updated",
})

export { watchlistDB }
