"use client"

import type { SegmentBank } from "@/types"
import { formatTimecode, pluralFormatter } from "@/utils"
import { LuChartBarBig } from "react-icons/lu"

export function SegmentStatsInline(props: Partial<SegmentBank>) {
  const _submissionCount = props.submissionCount ?? 0
  const _segmentBank = props.segments ?? []

  const hasNoSubmissions = _submissionCount !== 0

  const accumulatedLength = _segmentBank
    .map((seg) => seg.endTime - seg.startTime)
    .reduce((acc, prev) => acc + prev, 0)

  const totalSegmentDuration = formatTimecode(accumulatedLength, {
    separator: "letters",
  }).replace(/^0m\s/g, "")

  return (
    <div
      data-segment-stats-inline=""
      className="flex flex-wrap items-center gap-x-1"
    >
      <LuChartBarBig size={19} />
      <span>
        <span className="font-bold">{_submissionCount ?? 0}</span>
        {pluralFormatter(_submissionCount!, " submission", " submissions", {
          noIncludeNum: true,
        })}
      </span>
      {hasNoSubmissions && accumulatedLength > 0 ? (
        <span>
          (accrued: <strong>{totalSegmentDuration}</strong>)
        </span>
      ) : null}
    </div>
  )
}
