"use client"

import type { SegmentBank } from "@/types"
import { calcSegmentTime, formatTimecode } from "@/utils"
import { IconWrapper } from "../IconWrapper"
import { LuExternalLink } from "react-icons/lu"
import { SegmentDetailsModal } from "../Modals"
import { useState } from "react"

type VideoInfoStatsProps = SegmentBank

export function VideoInfoStats(props: VideoInfoStatsProps) {
  const [isModalOpen, setModalState] = useState(false)

  const toggleModalState = () => setModalState(!isModalOpen)

  const seggies = props.segments ?? []

  const _segmentBank = calcSegmentTime(seggies, {
    filterHidden: true,
  })

  const formatTime = (tc: number) => {
    return formatTimecode(tc, {
      separator: "letters",
    }).replace(/^0m\s/, "")
  }

  const totalAccrued = _segmentBank.reduce((acc, prev) => acc + prev.accrued, 0)
  const segmentAlotted = _segmentBank.reduce(
    (acc, prev) => acc + prev.views * prev.accrued,
    0,
  )

  return (
    <div
      data-video-stats=""
      className="grid grid-cols-2 divide-x-2 divide-neutral-300 dark:divide-neutral-700"
    >
      <div className="pr-3 space-y-1">
        <div className="text-sm opacity-75">Time accrued</div>
        <div className="text-base font-semibold">
          {formatTime(totalAccrued)}
        </div>
      </div>
      <div className="pl-3 space-y-1">
        <div className="text-sm opacity-75">Alotted (Views x Length)</div>
        <div className="text-base font-semibold flex items-center gap-x-1">
          <span className="my-auto">{formatTime(segmentAlotted)}</span>
          <button
            onClick={toggleModalState}
            className="p-1 opacity-75 hover:opacity-100"
          >
            <IconWrapper icon={LuExternalLink} size="smol" />
          </button>
        </div>
      </div>
      <SegmentDetailsModal
        open={isModalOpen}
        onClose={toggleModalState}
        segments={calcSegmentTime(seggies)}
      />
    </div>
  )
}
