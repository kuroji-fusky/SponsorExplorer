import { pluralFormatter } from "@/utils"

export const segmentLabelFormatter = <S>(segments: S[] | null, hasHighlight: boolean) => {
  const segLength = segments?.length || 0

  const hasNoSegment = segLength <= 0
  const segmentPlural = !hasNoSegment
    ? pluralFormatter(segLength, "segment", "segments")
    : "No segments"

  if (hasNoSegment && hasHighlight) return "Contains highlight"

  return hasHighlight ? `${segmentPlural} + Highlight` : segmentPlural
}
