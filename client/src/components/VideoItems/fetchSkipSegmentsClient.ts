import { fetchWrapper } from "@/utils/fetchWrapper"
import type { InlineSegments, SkippableSeggies } from "@/types"
import type { sb } from "@/utils/SponsorBlock.types"
import { SB_FETCH_OPTIONS } from "@/utils/constants"

export const fetchSkipSegmentsClient = async (id: string, abortSignal: AbortSignal) => {
  let relativeSegments = null
  let hasHighlight = false

  const fetchOptions = {
    signal: abortSignal,
    priority: "high",
    ...SB_FETCH_OPTIONS
  } satisfies NextFetchRequestConfig | RequestInit


  const segmentFetcher = fetchWrapper<SkippableSeggies>(`${location.origin}/api/sb/skippableSegments?id=${id}`, fetchOptions)
  const lockSegFetcher = fetchWrapper<Record<string, sb.Responses.LockCategories>>(`${location.origin}/api/sb/lockCategories?id=${id}`, fetchOptions)

  const [[segmentRes], [lockRes]] = await Promise.all([segmentFetcher, lockSegFetcher])

  const { skip, full } = segmentRes

  if (skip) {
    const skipFiltered = skip.map(({ segment, category }) => ({
      start: segment[0],
      end: segment[1],
      segment: category
    }))

    const totalSegmentSum = skipFiltered.reduce((acc, { start, end }) => (acc += end - start), 0)

    relativeSegments = skipFiltered
      .filter((item) => item.segment !== "poi_highlight")
      .map((dp) => {
        const segmentDuration = dp.end - dp.start

        return {
          segment: dp.segment,
          width: (segmentDuration / totalSegmentSum) * 100
        }
      })

    hasHighlight = skipFiltered.some((item) => item.segment === "poi_highlight")
  }

  const fullLabel = full ? full[0].category : null
  const hasLockedSegments = Object.values(lockRes).some(o => o !== null)

  return ({ relativeSegments, hasHighlight, fullLabel, hasLockedSegments }) as InlineSegments
}
