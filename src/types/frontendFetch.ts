import type { Responses } from "@/utils/SponsorBlock.types"

export interface VideoSegments {
  submissionCount: number
  segments: Responses.SearchSegments["segments"]
  lock: {
    skip: Responses.LockCategories & unknown[]
    mute: Responses.LockCategories & unknown[]
    full: Responses.LockCategories & unknown[]
  }
}
