import type { sb } from "@/utils/SponsorBlock.types"

export interface VideoSegments {
  totalIterations: number
  submissionCount: number
  hasLockedSegments: boolean
  lockReason: string | null
  lockedSegments: {
    skip: sb.Responses.LockCategories[] | null
    mute: sb.Responses.LockCategories[] | null
    full: sb.Responses.LockCategories[] | null
  } | Record<string, never>
  segments: sb.Responses.SearchSegments["segments"]
}

export interface SegmentBank {
  submissionCount: number
  segments: sb.Responses.SearchSegments["segments"]
}

/**
 * This is when the creator supplies chapters from their descriptions,
 * and can be appended with SponsorBlock chapters
 * */
export interface NativeVideoChapters {
  timestamp: number | [number, number]
  title: string
}

interface Internal_FoundState {
  state: "FOUND" | "NOT_FOUND"
}

export interface VideoInfoType extends Internal_FoundState {
  hasSponsorDisclosure?: boolean
  video: {
    title: string
    publishedAt: string
    channelId: string
    channelTitle: string
  }
  nativeChapters?: (NativeVideoChapters | never)[]
}

export interface ChannelInfoType extends Internal_FoundState {
  channel: {
    title: string
    id: string
    handle: string
    thumbnails: {
      default: {
        url: string
      }
      medium: {
        url: string
      }
      high: {
        url: string
      }
    }
    joinDate: string
    totalVideos: number
  }
  videos: Pick<VideoInfoType, "video">[]
}
