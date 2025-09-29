import type { Category, sb } from "@/lib/SponsorBlock.types"

export interface VideoSegments {
  totalIterations: number
  submissionCount: number
  hasLockedSegments: boolean
  lockReason: string | null
  lockedSegments: Record<"skip" | "mute" | "full", sb.Responses.LockCategories[] | null> | Record<string, never>
  segments: sb.Responses.SearchSegments["segments"]
}

export interface SegmentBank {
  submissionCount: number
  segments: sb.Responses.SearchSegments["segments"]
}

export interface InlineSegments {
  relativeSegments: Array<{
    segment: Category,
    width: number
  }> | null
  hasHighlight: boolean
  fullLabel: sb.Literals.FullLabel | null
  hasLockedSegments: boolean
}

/**
 * This is when the creator supplies chapters from their descriptions,
 * and can be appended with SponsorBlock chapters
 * */
export interface NativeVideoChapters {
  timestamp: number | [number, number]
  title: string
}

export interface VideoInfoType {
  video: {
    title: string
    publishedAt: string
    channelId: string
    channelTitle: string
    length: number
    lengthReadable: string
  }
  nativeChapters?: (NativeVideoChapters | never)[]
}
