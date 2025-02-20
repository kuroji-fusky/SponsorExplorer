"use client"

import { useState, useRef, useCallback } from "react"
import type { Category } from "@/lib/SponsorBlock.types"
import { SegmentBadge, LengthBadge } from "../Badges"
import {
  LuCopy,
  LuEyeOff,
  LuFilter,
  LuLock,
  LuTimerOff,
  LuCircleX,
} from "react-icons/lu"
import {
  cn,
  formatNumber,
  formatTimecode,
  mapCategory,
  parseDateStr,
} from "@/utils"
import type { Segment } from "./SegmentRow.types"
import { SegmentRowDropdown } from "./SegmentRowDropdown"
import { useVideoInfoContext } from "@/context"

interface SegmentTableRowProps extends Segment {
  __next_iterableFragment: number
}

const calcDateDiff = (d1, d2) => {
  const _d1 = new Date(d1)
  const _d2 = new Date(d2)

  const diff = Math.abs(_d1 - _d2) / 1000

  // const days = Math.floor(diff / 86400)
  // const hours = Math.floor(diff / 3600) % 24
  // const minutes = Math.floor(diff / 60) % 60
  const seconds = Math.floor(diff)

  return seconds
}

export function SegmentTableRow(props: SegmentTableRowProps) {
  const { isoDate, readableDate } = parseDateStr(props.timeSubmitted)

  const { videoDetails } = useVideoInfoContext()
  const { isoDate: ytIsoDate } = parseDateStr(videoDetails.video.publishedAt)

  const [isHovering, setHoverState] = useState(false)
  const tableRowRef = useRef<React.ComponentRef<"tr">>(null)

  const handleRowEnter = useCallback(() => setHoverState(true), [])
  const handleRowLeave = useCallback(() => setHoverState(false), [])

  const hoverOptionsCn = cn("flex ml-1", isHovering ? undefined : "opacity-0")

  const { label: segmentLabel } = mapCategory(props.category)

  const relativeSubmissionDate = formatTimecode(
    calcDateDiff(ytIsoDate, isoDate),
    {
      separator: "letters",
    },
  )

  return (
    <tr
      data-iterable-fragment={props.__next_iterableFragment}
      ref={tableRowRef}
      onMouseEnter={handleRowEnter}
      onMouseLeave={handleRowLeave}
      onBlur={handleRowLeave}
      className={cn(
        props.shadowHidden || props.hidden || props.votes <= -2
          ? "opacity-50 hover:opacity-100"
          : undefined,
        "hover:bg-neutral-300/40 dark:hover:bg-neutral-800/40",
      )}
    >
      {/* Date submitted */}
      <td>
        <div className="relative group">
          <time dateTime={isoDate} className="whitespace-nowrap">
            {readableDate}
          </time>
          <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute top-8 p-2 rounded-md bg-neutral-900 z-10 border border-neutral-600">
            <span className="text-sm leading-none">
            {`Segment submitted after video upload: ${relativeSubmissionDate}`}
            </span>
          </div>
        </div>
      </td>

      {/* Votes */}
      <td>
        <div className="inline-flex items-center gap-x-1">
          <span>{formatNumber(props.votes)}</span>
          {props.locked ? (
            <LuLock size={17} className="text-yellow-400" />
          ) : null}
        </div>
      </td>

      {/* Views */}
      <td>
        <div className="inline-flex items-center gap-x-1">
          <span>
            {props.actionType === "full" ? "—" : formatNumber(props.views)}
          </span>
          {props.shadowHidden ? (
            <LuEyeOff size={17} className="text-red-500" />
          ) : null}
          {props.hidden ? (
            <LuTimerOff size={17} className="text-red-500" />
          ) : null}
          {props.votes <= -2 ? (
            <LuCircleX size={17} className="text-red-500" />
          ) : null}
        </div>
      </td>

      {/* Segment/category */}
      <td>
        <div className="flex items-center gap-x-0.5">
          <SegmentBadge
            segments={props.category as Category}
            chapterLabel={props.description}
            layout="desktop"
          />
          <div className={hoverOptionsCn}>
            <button
              className="p-0.5"
              title={`Filter out the ${segmentLabel} category (Alt+Click to negate)`}
            >
              <LuFilter size={19} />
            </button>
            <button className="p-0.5">
              <LuCopy size={19} />
            </button>
          </div>
        </div>
      </td>

      {/* Length */}
      <td>
        <LengthBadge
          actionType={props.actionType}
          endTime={props.endTime}
          startTime={props.startTime}
        />
      </td>

      {/* Username/UserID */}
      <td>
        <div className="flex items-center gap-x-0.5 max-w-48">
          <div className="truncate flex-1">
            <span>{props.userID}</span>
          </div>
          <div className={hoverOptionsCn}>
            <button className="p-0.5">
              <LuFilter size={19} />
            </button>
            <button className="p-0.5">
              <LuCopy size={19} />
            </button>
          </div>
        </div>
      </td>

      {/* More actions */}
      <td>
        <div className={hoverOptionsCn}>
          <SegmentRowDropdown />
        </div>
      </td>
    </tr>
  )
}
