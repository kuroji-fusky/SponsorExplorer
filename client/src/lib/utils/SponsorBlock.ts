import type { Segments } from "../types"

const SB_BASE_URL = "https://sponsor.ajay.app/api"

interface AnyObjectString {
  [key: string]: string
}

export namespace SponsorBlock {
  export interface SkipSegments {}
  export interface LockedSegments {}
}

const parseURL = (baseUrl: string, params: AnyObjectString): string => {
  const url = new URL(baseUrl)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return url.toString()
}

export const sb = {
  getSegments: (videoId: string): Promise<SponsorBlock.SkipSegments> => {
    return fetch(parseURL(`${SB_BASE_URL}/skipSegments`, { videoID: videoId }))
  },
  getLockedSegments: (videoId: string): Promise<SponsorBlock.LockedSegments> => {
    return fetch(parseURL(`${SB_BASE_URL}/lockCategories`, { videoID: videoId }))
  }
}
