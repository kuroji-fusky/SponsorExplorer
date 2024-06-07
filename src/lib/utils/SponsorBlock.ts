import type { Segments } from "../types"

const SB_BASE_URL = "https://sponsor.ajay.app/api"

interface AnyObjectString {
  [key: string]: string
}

export namespace SponsorBlock {
  export type Categories =
    | "sponsor"
    | "selfpromo"
    | "intro"
    | "interaction"
    | "preview"
    | "poi_highlight"
    | "outro"
    | "filler"
    | "exclusive_access"
    | "music_offtopic"
    | "chapter"

  export type ActionType = "skip" | "mute" | "poi_highlight" | "chapter"

  export interface SearchSegmentsResponse {
    segmentCount: number
    page: number
    segments: {
      UUID: string
      timeSubmitted: number
      startTime: number
      endTime: number
      category: Categories
      actionType: ActionType
      votes: number
      views: number
      locked: number
      hidden: number
      shadowHidden: number
      userID: string
      description: string
    }[]
  }
  export interface SkipSegmentsResponse {
    segment: [number, number]
    UUID: string
    category: Categories
    videoDuration: number
    actionType: ActionType
    locked: number
    votes: number
    description: string | null
  }
  export interface LockedSegmentsResponse {
    categories: Exclude<Categories, "chapter" | "poi_highlight">
    reason: string | null
    actionTypes: ActionType[]
  }
}

const concatLiteralArrayToString = (items: string[]) => {
  const concatItems = items.map((i) => `"${i}"`).join(",")
  return `[${concatItems}]`
}

const fetchWithQueryParams = <T>(baseUrl: string, params: AnyObjectString) => {
  const url = new URL(baseUrl)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return fetch(url.toString()) as Promise<T | string>
}

export const sb = {
  getSearchSegments: ({
    videoId,
    actionTypes = ["skip", "mute"]
  }: {
    videoId: string
    actionTypes: SponsorBlock.ActionType[]
  }) => {
    return fetchWithQueryParams<SponsorBlock.SearchSegmentsResponse>(
      `${SB_BASE_URL}/searchSegments`,
      {
        videoID: videoId,
        actionTypes: concatLiteralArrayToString(actionTypes)
      }
    )
  },

  getSkipSegments: ({ videoId }: { videoId: string }) => {
    return fetchWithQueryParams<SponsorBlock.SkipSegmentsResponse[]>(
      `${SB_BASE_URL}/skipSegments`,
      {
        videoID: videoId
      }
    )
  },

  getLockedSegments: ({ videoId }: { videoId: string }) => {
    return fetchWithQueryParams<SponsorBlock.LockedSegmentsResponse>(
      `${SB_BASE_URL}/lockCategories`,
      {
        videoID: videoId
      }
    )
  }
}
