import { Dexie, type EntityTable } from "dexie"

export interface PinnedItems {
  id: number
  kind: "video" | "channel" | "sb-username" | "sb-userid"
  added: string | Date
  updated: string | Date
}

export interface RecentChannels {
  id?: string
  channelId: string
  channelName: string
  channelAvatar: string
  channelHandle: string
  added: string | Date
  updated?: string | Date
}

class WatchlistDB extends Dexie {
  pinnedItems!: Dexie.Table<PinnedItems, string>
  recentChannelsList!: Dexie.Table<RecentChannels, string>

  constructor() {
    super("watchlist")

    this.version(1).stores({
      pinnedItems: "++id, kind, item, added, updated",
      recentChannelsList:
        "++id, channelId, channelName, channelAvatar, channelHandle, added, updated",
    })
  }
}
const watchlistDB = new WatchlistDB()

export { watchlistDB }
