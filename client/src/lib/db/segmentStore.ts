import { Dexie } from "dexie"

export interface SegmentStore {
  id: number
  videoId: string
  added: string | Date
  segments: Record<string, unknown>[]
}

class SegmentStoreDB extends Dexie {
  segments!: Dexie.Table<SegmentStore, "id">

  constructor() {
    super("segment_store")
    this.version(1).stores({
      segments: "++id, videoId, added",
    })
  }
}

const segmentStoreDB = new SegmentStoreDB()

export { segmentStoreDB }
