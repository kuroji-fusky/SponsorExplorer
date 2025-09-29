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
  calcDateDiff,
  cn,
  DEFAULT_DATE_FORMAT,
  formatNumber,
  formatTimecode,
  mapCategory,
  parseDateStr,
} from "@/utils"
import type { Segment } from "./SegmentRow.types"
import { SegmentRowDropdown } from "./SegmentRowDropdown"
import { useVideoInfoContext } from "@/context"
import { TimeDateWrapper } from "../TimeDateWrapper"
import DetailPeek from "../DetailPeek"

interface SegmentTableRowProps extends Segment {
  __next_iterableFragment?: number
}

export function SegmentTableRow(props: SegmentTableRowProps) {
  const { isoDate } = parseDateStr(props.timeSubmitted)

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

  const segLength = formatTimecode(
    props.views * (props.endTime - props.startTime),
    {
      includeMilliseconds: true,
      msRoundFactor: 3
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
        <div id="fallback-tooltip-nojs" className="relative group">
          <TimeDateWrapper
            dateOpts={DEFAULT_DATE_FORMAT}
            date={props.timeSubmitted}
            className="whitespace-nowrap cursor-help"
          />
          <dl className="opacity-0 group-hover:opacity-100 pointer-events-none absolute top-8 py-3 px-3.5 rounded-md se-bg-w1 z-10 border se-border-1 space-y-4">
            <DetailPeek header="Time submitted prior to video upload">
              <span className="font-semibold">{relativeSubmissionDate}</span>
            </DetailPeek>
            <DetailPeek header="Time submitted prior from the previous segment submitted">
              <span className="font-semibold">N/A</span>
            </DetailPeek>
          </dl>
        </div>
      </td>

      {/* Votes */}
      <td>
        <div className="inline-flex items-center gap-x-1">
          <span>{formatNumber(props.votes)}</span>
          {props.locked ? (
            <LuLock size={17} className="text-yellow-400" />
          ) : null}
          {props.votes <= -2 ? (
            <LuCircleX size={17} className="text-red-500" />
          ) : null}
        </div>
      </td>

      {/* Views */}
      <td>
        <div id="fallback-tooltip-nojs" className="relative group">
          <div className="inline-flex items-center gap-x-1 cursor-help">
            <span>
              {props.actionType === "full" ? "—" : formatNumber(props.views)}
            </span>
            {props.shadowHidden ? (
              <LuEyeOff size={17} className="text-red-500" />
            ) : null}
            {props.hidden ? (
              <LuTimerOff size={17} className="text-red-500" />
            ) : null}
          </div>
          <dl className="opacity-0 group-hover:opacity-100 pointer-events-none absolute top-8 py-3 px-3.5 rounded-md se-bg-w1 z-10 border se-border-1 space-y-4">
            <DetailPeek header="Accum. length" className="whitespace-nowrap">
              <span className="font-semibold">{segLength}</span>
            </DetailPeek>
          </dl>
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
          <div className="flex-1 truncate">
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
