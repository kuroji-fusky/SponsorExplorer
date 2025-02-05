import type { sb } from "./SponsorBlock.types"

export const segmentsFallback = <TS extends sb.Responses.LockCategories | sb.Responses.SkipSegments>(s: TS) => {
  return typeof s === "string" ? null : s
}
