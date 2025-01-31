import type { VideoSegments } from "@/types"
import type { Category } from "@/utils/SponsorBlock.types"

export interface SharedVideoItemProps {
  title?: string
  date?: string
  segmentDisplay?: VideoSegments["segments"]
}

export interface InlineSegments {
  relativeSegments: Array<{
    start: number,
    end: number,
    segment: Category
  }> | null
  hasHighlight: boolean
  fullLabel: "sponsor" | "selfpromo" | "exclusive_acesss" | null
}
