const SB_API_BASE_URL = "https://sponsor.ajay.app/api"

import type { Category, Props, Responses } from "./SponsorBlock.types"

export const isValidJSON = (str: string) => {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

const unwrapArrayAsLiteral = (arr: string[]) => `[${arr.map((x) => `"${x}"`).toString()}]`

const parseURLSearchParams = <P extends object>(url: string, params?: P) => {
  if (!params) return url

  const urlParams = Object.entries(params).map(([k, v]) => {
    // SponsorBlock-specific params
    if (k === "actionTypes" || k === "categories") return [k, unwrapArrayAsLiteral(v)]

    return [k, v]
  })

  return `${url}?${new URLSearchParams(urlParams)}`
}

const fetchWrapper = async <ReturnPromise = string>(
  url: string,
  init?: RequestInit
): Promise<[ReturnPromise, number]> => {
  const _req = await fetch(url, init)

  const reqStatus = _req.status
  const reqText = await _req.text() as ReturnPromise

  console.debug("req url", url)

  if (isValidJSON(reqText as string)) {
    return [JSON.parse(reqText as string), reqStatus]
  }

  return [reqText, reqStatus]
}

/**
 * Get segments for a video.
 * 
 * @link https://wiki.sponsor.ajay.app/w/API_Docs#GET_/api/skipSegments
 */
const skipSegments = async (props: Props.SkipAndSearchSegments) => {
  return fetchWrapper<Responses.SkipSegments>(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/skipSegments`, props)
  )
}

/**
 * Get all segments of a video based on specified filters.
 * 
 * Note: It is suggested that you don't use this for knowing which segments
 * to skip on your client, as thresholds and values that determine which
 * segments are the best change over time. Using `skipSegments` ensures that
 * you will always get the best segments. 
 * 
 * @link https://wiki.sponsor.ajay.app/w/API_Docs#GET_/api/searchSegments
 */
const searchSegments = async (props: Props.SkipAndSearchSegments) => {
  return fetchWrapper<Responses.SearchSegments>(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/searchSegments`, props)
  )
}

/**
 * Get locked categories for a video.
 * 
 * @link https://wiki.sponsor.ajay.app/w/API_Docs#GET_/api/lockCategories
 */
const lockCategories = async (props: Props.LockedSegments) => {
  return fetchWrapper<Responses.LockCategories>(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/lockCategories`, props)
  )
}

const userID = async (props: Props.UserID) => {
  return fetchWrapper(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/userID`, props)
  )
}

const userInfo = async (props: Props.UserInfo) => {
  return fetchWrapper(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/userInfo`, props)
  )
}

const SponsorBlock = {
  skipSegments,
  searchSegments,
  lockCategories,
  userID,
  userInfo
}

const CategoryReadableLabels: Readonly<Record<Category, string>> = {
  interaction: "Interaction Reminder",
  intro: "Intro/Intermission",
  music_offtopic: "Non-Music",
  outro: "Endcards/Credits",
  sponsor: "Sponsor",
  selfpromo: "Unpaid/Self Promotion",
  exclusive_access: "Exclusive Access",
  filler: "Filler Tangent",
  poi_highlight: "Highlight"
}

const allSegments: Category[] = [
  "interaction",
  "intro",
  "outro",
  "filler",
  "interaction",
  "music_offtopic",
  "selfpromo",
  "sponsor",
  "poi_highlight"
]

export { SponsorBlock, CategoryReadableLabels, allSegments }
