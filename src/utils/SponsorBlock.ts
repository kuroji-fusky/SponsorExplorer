const SB_API_BASE_URL = "https://sponsor.ajay.app/api"

import type { Props } from "./SponsorBlock.types"

const searchSegments = (props: Props.SkipAndSearchSegments) => {
  return fetch(`${SB_API_BASE_URL}/searchSegments`)
}
const skipSegments = (props: Props.SkipAndSearchSegments) => {
  return fetch(`${SB_API_BASE_URL}/skipSegments`)
}
const lockedSegments = (props: Props.LockedSegments) => {
  return fetch(`${SB_API_BASE_URL}/lockedSegments`)
}

const userID = (props: Props.UserID) => {
  return fetch(`${SB_API_BASE_URL}/userID`)
}
const userInfo = (props: Props.UserInfo) => {
  return fetch(`${SB_API_BASE_URL}/userInfo`)
}

const SponsorBlock = Object.assign(
  {},
  { skipSegments, searchSegments, lockedSegments, userID, userInfo }
)

export { SponsorBlock }
