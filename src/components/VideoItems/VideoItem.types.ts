import type { VideoSegments } from "@/types"
import type { Category } from "@/utils/SponsorBlock.types"

export interface SharedVideoItemProps {
  title?: string
  date?: string
  segmentDisplay?: VideoSegments["segments"]
}
