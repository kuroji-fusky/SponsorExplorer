const SB_API_BASE_URL = "https://sponsor.ajay.app/api"

import type { Category, Props } from "./SponsorBlock.types"

const serializeAsURLParams = (
  obj:
    | object
    | {
        [x: string]: { value: string; safeEncode: boolean }
      }
) => {
  const parsedParams = Object.entries(obj).map(([k, v], i) => {
    const urlSeparator = i !== 1 ? "?" : "&"

    if (typeof v !== "object") {
      return `${urlSeparator}${k}=${encodeURIComponent(v)}`
    }

    if (v.value && !v.safeEncode) {
      return `${urlSeparator}${k}=${v.value}`
    }
  })

  return parsedParams.join("")
}

const isValidJSON = (str: string) => {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

const unwrapArrayAsLiteral = (arr: string[]) =>
  `[${arr.map((x) => `"${x}"`).toString()}]`

const fetchWrapper = async (
  url: string,
  errFallback?: object,
  init?: RequestInit
) => {
  const _req = await fetch(url, init)
  const reqText = await _req.text()

  console.debug("req url", url)

  if (!isValidJSON(reqText)) {
    return JSON.stringify(errFallback || { message: "Data not found" })
  }
  return JSON.parse(reqText)
}

const searchSegments = async (props: Props.SkipAndSearchSegments) => {
  return fetchWrapper(
    `${SB_API_BASE_URL}/searchSegments${serializeAsURLParams(props)}`
  )
}
const skipSegments = async (props: Props.SkipAndSearchSegments) => {
  return fetchWrapper(
    `${SB_API_BASE_URL}/skipSegments${serializeAsURLParams(props)}`
  )
}
const lockedSegments = async (props: Props.LockedSegments) => {
  return fetch(
    `${SB_API_BASE_URL}/lockedSegments${serializeAsURLParams(props)}`
  )
}

const userID = async (props: Props.UserID) => {
  return fetch(`${SB_API_BASE_URL}/userID${serializeAsURLParams(props)}`)
}

const userInfo = async (props: Props.UserInfo) => {
  return fetch(`${SB_API_BASE_URL}/userInfo${serializeAsURLParams(props)}`)
}

const SponsorBlock = Object.assign(
  {},
  { skipSegments, searchSegments, lockedSegments, userID, userInfo }
)

const CategoryReadableLabels: Readonly<Record<Category, string>> = {
  interaction: "Interaction Reminder",
  intro: "Intro/Intermission",
  music_offtopic: "Non-Music",
  outro: "Endcards/Credits",
  sponsor: "Sponsor",
  selfpromo: "Unpaid/Self Promotion",
  exclusive_access: "Exclusive Access",
}

export { SponsorBlock, CategoryReadableLabels }
