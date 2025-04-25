import type { sb } from "@/lib"

interface SegTimeOptions {
  filterHidden: boolean
}

export const calcSegmentTime = (
  sbData: sb.Responses.SearchSegments["segments"],
  options?: Partial<SegTimeOptions>,
) => {
  const accumulated = sbData.map((seg) => ({
    ...seg,
    accrued: seg.endTime - seg.startTime,
  }))

  if (options && options.filterHidden) {
    return accumulated.filter(
      (p) => !(p.votes < -2 || !!p.shadowHidden || !!p.hidden),
    )
  }

  return accumulated
}
