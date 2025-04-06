"use client"

import { LuChevronRight, LuCircleMinus, LuExternalLink } from "react-icons/lu"
import { Button } from "./Buttons/Button"
import { IconWrapper } from "./IconWrapper"
import { SegmentBadge } from "./Badges"
import { _Link as Link } from "./Link"
import { cn, formatNumber } from "@/utils"
import { useState } from "react"

import { ExpandableContainer } from "./ExpandableContainer"

interface SubmissionItemProps {
  uuid?: string
  isExpanded?: boolean
}

export function SubmissionItem(props: SubmissionItemProps) {
  const [_tmpIsExpand, _tmpsetExpand] = useState(false)

  const toggleExpand = () => _tmpsetExpand(!_tmpIsExpand)

  return (
    <div
      data-submission-item=""
      className="px-1 py-1 border rounded-md se-border-1 bg-neutral-100 dark:bg-neutral-900"
    >
      {/* Top label */}
      <div className="flex items-center gap-x-2 *:flex *:items-center">
        <div className="flex-1">
          <Button
            size="smol"
            iconOnly
            borderless
            aria-label="Expand contents"
            onClick={toggleExpand}
            className={cn(
              "transition-transform duration-200",
              _tmpIsExpand ? "rotate-90" : undefined,
            )}
          >
            <IconWrapper icon={LuChevronRight} />
          </Button>
          <button onClick={toggleExpand} className="w-full text-left">
            {props.uuid}
          </button>
        </div>
        <div className="gap-x-2">
          <div className="min-w-52">
            <SegmentBadge segments="selfpromo" />
          </div>
          <div className="flex gap-x-1.5">
            <span className="opacity-70">Votes</span>
            <div className="min-w-12">{formatNumber(5456)}</div>
          </div>
          <div className="flex gap-x-1.5">
            <span className="opacity-70">Views</span>
            <div className="min-w-16">{formatNumber(142654)}</div>
          </div>
        </div>
        <div>
          <Link
            href="https://youtu.be/vBynw9Isr28"
            className="inline-flex items-center gap-x-1.5 min-w-48"
          >
            <span className="truncate">YouTube Link</span>
            <IconWrapper icon={LuExternalLink} size="smol" />
          </Link>
          <Button
            size="smol"
            iconOnly
            borderless
            aria-label="Remove submission"
            className="text-red-400 dark:text-red-500"
          >
            <IconWrapper icon={LuCircleMinus} />
          </Button>
        </div>
      </div>
      <ExpandableContainer isOpen={_tmpIsExpand} hasSeparator>
        <div className="flex gap-x-3">
          <div className="flex-shrink-0 w-1/4">
            <div className="w-full border rounded-md aspect-video">
              temporary placeholder
            </div>
            <div className="inline-flex gap-x-1">

            </div>
          </div>
          <div className="flex-1">details</div>
        </div>
      </ExpandableContainer>
    </div>
  )
}
