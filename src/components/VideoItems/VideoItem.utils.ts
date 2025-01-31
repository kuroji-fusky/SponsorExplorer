import { fetchWrapper } from "@/utils/fetchWrapper"
import type { SkippableSeggies } from "@/types"
import { InlineSegments } from "./VideoItem.types"

export const fetchSkipSeggies = async (id: string) => {
  const [res] = await fetchWrapper<SkippableSeggies>(`${location.origin}/api/sb/skippableSegments?id=${id}`)

  let relativeSegments = null
  let hasHighlight = false

  const { skip, full } = res

  if (skip) {
    const skipFiltered = skip.map((item) => ({
      start: item.segment[0],
      end: item.segment[1],
      segment: item.category
    }))

    const allSegmentSum = skipFiltered.reduce((acc, cur) => (acc += cur.end - cur.start), 0)

    relativeSegments = skipFiltered
      .filter((item) => item.segment !== "poi_highlight")
      .map((dp) => {
        const segmentDuration = dp.end - dp.start

        return {
          segment: dp.segment,
          width: (segmentDuration / allSegmentSum) * 100
        }
      })

    hasHighlight = skipFiltered.some((item) => item.segment === "poi_highlight")
  }

  const fullLabel = full ? full[0].category : null

  return ({ relativeSegments, hasHighlight, fullLabel }) as InlineSegments
}
