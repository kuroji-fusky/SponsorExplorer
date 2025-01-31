"use client"

import type { InlineSegments } from "@/types"
import { cn } from "@/utils"
import { sbCategoryMap } from "@/utils/constants"

interface SegmentBarProps {
  segments: InlineSegments["relativeSegments"]
}

export function SegmentBar(props: SegmentBarProps) {
  return (
    <div data-segment-bar="" className="h-3 translate-y-2 flex">
      {props.segments!.map((fregies, index) => (
        <div
          key={index}
          className={cn(sbCategoryMap[fregies.segment].bg, "h-full")}
          style={{ width: `${fregies.width}%` }}
        />
      ))}
    </div>
  )
}
