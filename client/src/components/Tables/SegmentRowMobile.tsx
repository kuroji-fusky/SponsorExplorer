"use client"

import {
  calcDateDiff,
  cn,
  DEFAULT_DATE_FORMAT,
  formatNumber,
  formatTimecode,
  parseDateStr,
} from "@/utils"
import {
  LuFastForward as SkipIcon,
  LuVolumeX as MuteIcon,
  LuSparkles as HighlightIcon,
  LuBookmark as ChapterIcon,
  LuVideo as FullIcon,
  LuLock,
  LuCircleX,
} from "react-icons/lu"
import { LengthBadge, SegmentBadge } from "../Badges"
import type { Category } from "@/lib/SponsorBlock.types"
import type { Segment } from "./SegmentRow.types"
import { useState } from "react"
import { ExpandableContainer } from "../ExpandableContainer"
import { useVideoInfoContext } from "@/context"
import { Button } from "../Buttons"
import { TimeDateWrapper } from "../TimeDateWrapper"

interface SegmentRowMobileProps extends Segment {}

const timecodeOptions = {
  includeMilliseconds: true,
  msRoundFactor: 3,
} satisfies Parameters<typeof formatTimecode>[1]

export function SegmentRowMobile(props: SegmentRowMobileProps) {
  const { isoDate } = parseDateStr(props.timeSubmitted)

  const [isExpanded, setExpanded] = useState(false)

  const { videoDetails } = useVideoInfoContext()
  const { isoDate: ytIsoDate } = parseDateStr(videoDetails.video.publishedAt)

  const relativeSubmissionDate = formatTimecode(
    calcDateDiff(ytIsoDate, isoDate),
    {
      separator: "letters",
    },
  )

  const segmentLength = (props.endTime - props.startTime).toFixed(2)

  return (
    <div
      className={cn(
        "relative before:absolute before:-inset-x-3 before:inset-y-0 before:rounded-md before:bg-neutral-200 dark:before:bg-neutral-900 transition-opacity duration-300",
        isExpanded ? "" : "before:opacity-0",
      )}
    >
      <button
        aria-expanded={isExpanded ? true : undefined}
        onClick={() => setExpanded(!isExpanded)}
        className={cn(
          "relative flex items-center w-full gap-x-2 py-2.5",
          props.shadowHidden || props.hidden || props.votes <= -2
            ? "opacity-50 aria-expanded:opacity-75 transition-opacity"
            : undefined,
        )}
      >
        <TimeDateWrapper
          className="hidden sm:block min-w-20 text-left whitespace-nowrap"
          date={props.timeSubmitted}
          dateOpts={DEFAULT_DATE_FORMAT}
        />
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
          {props.locked ? (
            <LuLock size={15} className="text-yellow-400" />
          ) : null}
          {props.votes <= -2 ? (
            <LuCircleX size={17} className="text-red-500" />
          ) : null}
        </div>
        <span className="min-w-16 text-right [font-kerning:none]">
          {formatNumber(props.views)}
        </span>
      </button>
      <ExpandableContainer
        isOpen={isExpanded}
        className="mx-0 border-b se-border-1 relative z-10"
      >
        <div className="mt-1 mb-3 space-y-3">
          <dl className="flex flex-wrap gap-5">
            <div className="space-y-1 sm:hidden block">
              <dt className="text-sm leading-snug opacity-60">
                Date submitted
              </dt>
              <dd className="font-semibold">
                <TimeDateWrapper
                  date={props.timeSubmitted}
                  className="whitespace-nowrap"
                />
              </dd>
            </div>

            <div className="space-y-1">
              <dt className="text-sm leading-snug opacity-60">
                Time submitted prior
              </dt>
              <dd className="font-semibold">{relativeSubmissionDate}</dd>
            </div>

            <div className="space-y-1">
              <dt className="text-sm leading-snug opacity-60">
                {props.actionType !== "poi" ? "Segment length" : "Marker"}
              </dt>
              <dd>
                <span className="font-semibold">
                  {formatTimecode(props.startTime, timecodeOptions)}
                </span>
                {props.actionType !== "poi" ? (
                  <>
                    <span>{` – `}</span>
                    <span className="font-semibold">
                      {formatTimecode(props.endTime, timecodeOptions)}
                    </span>
                    <span className="ml-1.5">({`${segmentLength}s`})</span>
                  </>
                ) : null}
              </dd>
            </div>
          </dl>
          <div className="space-x-2">
            <Button size="smol">Copy UUID</Button>
            <Button size="smol">Copy UserID</Button>
          </div>
        </div>
      </ExpandableContainer>
    </div>
  )
}
