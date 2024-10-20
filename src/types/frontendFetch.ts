import type { Responses } from "@/utils/SponsorBlock.types"

export interface VideoSegments {
  segments: Responses.SearchSegments["segments"]
  lock: {
    skip: Responses.LockCategories | never[]
    mute: Responses.LockCategories | never[]
    full: Responses.LockCategories | never[]
  }
}
