import type { sb } from "./SponsorBlock.types"

export const segmentsFallback = (s: sb.Responses.LockCategories | sb.Responses.SkipSegments) => {
  return typeof s === "string" ? null : s
}
