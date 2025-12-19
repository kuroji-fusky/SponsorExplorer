import { Dexie, type EntityTable } from "dexie"

export interface SegmentStore {
  id: number
  videoId: string
  added: string | Date
}

const segmentStoreDB = new Dexie("segmentStore") as Dexie & {
  segments: EntityTable<SegmentStore, "id">
}

segmentStoreDB.version(1).stores({
  watchlist: "++id, kind, item, added, updated",
  recentsList: "++id, channelId, channelName, channelHandle, added, updated",
})

export { segmentStoreDB }
