"use client"

import type { SegmentBank } from "@/types"
import { calcSegmentTime, formatTimecode } from "@/utils"
import { IconWrapper } from "../IconWrapper"
import { LuExternalLink, LuInfo } from "react-icons/lu"
import dynamic from "next/dynamic"
import { useState } from "react"
import DetailPeek from "../DetailPeek"

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
      className="mt-1 rounded-md border border-neutral-300 dark:border-neutral-700 py-2.5 grid grid-cols-2 divide-x-2 divide-neutral-300 dark:divide-neutral-700"
    >
      {isViewLengthAlottedNone ? (
        <>
          <DetailPeek
            header="Total segments submitted"
            className="px-3.5 my-0.5"
          >
            <div className="text-base font-semibold">
              {`${seggies.length} (${formatTime(segmentLengthSubmitted)})`}
            </div>
          </DetailPeek>
          <DetailPeek header="Total of views accrued" className="px-3.5 my-0.5">
            <div className="text-base font-semibold flex items-center gap-x-1">
              <span className="my-auto">
                {formatTime(segmentViewLengthAccrued)}
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
          </DetailPeek>

          <SegmentDetailsModal
            open={isModalOpen}
            onClose={toggleModalState}
            segments={calcSegmentTime(seggies)}
          />
        </>
      ) : (
        <div className="px-3 font-semibold inline-flex items-center gap-x-1.5">
          <IconWrapper icon={LuInfo} size="smol" />
          <span>No segment data present</span>
        </div>
      )}
    </div>
  )
}
