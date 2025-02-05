"use client"

import { useState, useRef, useCallback } from "react"
import type { Category } from "@/utils/SponsorBlock.types"
import { SegmentBadge } from "../Badges"
import {
  LuCopy,
  LuEyeOff,
  LuFilter,
  LuLock,
  LuTimerOff,
  LuXCircle,
} from "react-icons/lu"
import { cn, formatNumber, mapCategory, parseDateStr } from "@/utils"
import { LengthBadge } from "../Badges/LengthBadge"
import type { Segment } from "./SegmentRow.types"
import { SegmentRowDropdown } from "./SegmentRowDropdown"

interface SegmentTableRowProps extends Segment {
  __next_iterableFragment: number
}

export function SegmentTableRow(props: SegmentTableRowProps) {
  const { isoDate, readableDate } = parseDateStr(props.timeSubmitted)

  const [isHovering, setHoverState] = useState(false)
  const tableRowRef = useRef<React.ComponentRef<"tr">>(null)

  const handleRowEnter = useCallback(() => setHoverState(true), [])
  const handleRowLeave = useCallback(() => setHoverState(false), [])

  const hoverOptionsCn = cn("flex ml-1", isHovering ? undefined : "opacity-0")

  const { label: segmentLabel } = mapCategory(props.category)

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
        <time dateTime={isoDate} className="whitespace-nowrap">
          {readableDate}
        </time>
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
            <LuXCircle size={17} className="text-red-500" />
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
