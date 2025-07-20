"use client"

import type { SegmentBank } from "@/types"
import { calcSegmentTime, formatTimecode } from "@/utils"
import { IconWrapper } from "../IconWrapper"
import { LuExternalLink } from "react-icons/lu"
import dynamic from "next/dynamic"
import { useState } from "react"

const SegmentDetailsModal = dynamic(
  () => import("../Modals").then((m) => m.SegmentDetailsModal),
  { ssr: false },
)

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

  const segmentLengthSubmitted = _segmentBank.reduce(
    (acc, prev) => acc + prev.accrued,
    0,
  )
  const segmentViewLengthAccrued = _segmentBank.reduce(
    (acc, prev) => acc + prev.views * prev.accrued,
    0,
  )

  const isSegmentLengthNone = segmentLengthSubmitted > 0
  const isViewLengthAlottedNone =
    isSegmentLengthNone && segmentViewLengthAccrued > 0

  return (
    <div
      data-testid="video-info-stats"
      className="grid grid-cols-2 divide-x-2 divide-neutral-300 dark:divide-neutral-700"
    >
      <div className="pr-3 space-y-1">
        <div className="text-sm opacity-75">Total segments submitted</div>
        <div className="text-base font-semibold">
          {isSegmentLengthNone
            ? `${seggies.length} (${formatTime(segmentLengthSubmitted)})`
            : "—"}
        </div>
      </div>
      <div className="pl-3 space-y-1">
        <div className="text-sm opacity-75">Total of views accrued</div>
        <div className="text-base font-semibold flex items-center gap-x-1">
          <span className="my-auto">
            {isViewLengthAlottedNone
              ? formatTime(segmentViewLengthAccrued)
              : "—"}
          </span>
          {isViewLengthAlottedNone ? (
            <button
              onClick={toggleModalState}
              className="p-1 opacity-75 hover:opacity-100"
            >
              <IconWrapper icon={LuExternalLink} size="smol" />
            </button>
          ) : null}
        </div>
      </div>
      {isViewLengthAlottedNone ? (
        <SegmentDetailsModal
          open={isModalOpen}
          onClose={toggleModalState}
          segments={calcSegmentTime(seggies)}
        />
      ) : null}
    </div>
  )
}
