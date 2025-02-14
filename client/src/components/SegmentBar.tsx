"use client"

import type { InlineSegments } from "@/types"
import { cn, mapCategory } from "@/utils"

interface SegmentBarProps {
  segments: InlineSegments["relativeSegments"]
}

export function SegmentBar(props: SegmentBarProps) {
  return (
    <div data-segment-bar="" className="h-3 translate-y-2 flex">
      {props.segments!.map((fragment, index) => (
        <div
          key={index}
          className={cn(mapCategory(fragment.segment).bg, "h-full")}
          style={{ width: `${fragment.width}%` }}
        />
      ))}
    </div>
  )
}
