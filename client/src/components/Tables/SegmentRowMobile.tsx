"use client"

import { formatNumber, parseDateStr } from "@/utils"
import {
  LuFastForward as SkipIcon,
  LuVolumeX as MuteIcon,
  LuSparkles as HighlightIcon,
  LuBookmark as ChapterIcon,
  LuVideo as FullIcon,
  LuLock,
} from "react-icons/lu"
import { SegmentBadge } from "../Badges"
import type { Category } from "@/lib/SponsorBlock.types"
import type { Segment } from "./SegmentRow.types"

interface SegmentRowMobileProps extends Segment {}

export function SegmentRowMobile(props: SegmentRowMobileProps) {
  const { isoDate, readableDate } = parseDateStr(props.timeSubmitted)

  return (
    <button className="relative flex items-center w-full gap-x-2 py-2.5 border-b se-border-1">
      <time
        className="hidden sm:block min-w-20 text-left whitespace-nowrap"
        dateTime={isoDate}
      >
        {readableDate}
      </time>
      <div className="flex-1 flex items-center space-x-2">
        <div>
          {props.actionType === "skip" ? <SkipIcon size={18} /> : null}
          {props.actionType === "mute" ? <MuteIcon size={18} /> : null}
          {props.actionType === "full" ? <FullIcon size={18} /> : null}
          {props.actionType === "poi" ? <HighlightIcon size={18} /> : null}
          {props.actionType === "chapter" ? <ChapterIcon size={18} /> : null}
        </div>
        <SegmentBadge
          segments={props.category as Category}
          chapterLabel={props.description}
          layout="mobile"
        />
      </div>
      <div className="min-w-12 flex items-center justify-end gap-x-1 mr-2">
        <span>{formatNumber(props.votes)}</span>
        {props.locked ? <LuLock size={14} className="text-yellow-400" /> : null}
      </div>
      <span className="min-w-11 text-right [font-kerning:none]">
        {formatNumber(props.views)}
      </span>
    </button>
  )
}
