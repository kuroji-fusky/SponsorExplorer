"use client"

import { useVideoInfoContext } from "@/context"
import { LockedSegmentsNotice } from "./LockedSegments"
import { SegmentTable } from "./Tables"
import { Notice } from "./Notice"
import { SegmentFilterBar } from "./FilterBar"
import { LuEllipsisVertical, LuPlay, LuRefreshCw } from "react-icons/lu"
import { Tabs } from "./Tabs"

export function SegmentClientWrapper() {
  const { segmentData } = useVideoInfoContext()
  const { segments, lockReason, hasLockedSegments } = segmentData!

  const isEmptySubmission = segments?.length === 0

  return (
    <>
      {/* Lock notices */}
      <div className="empty:my-1 my-3">
        {hasLockedSegments ? (
          <LockedSegmentsNotice reason={lockReason!} />
        ) : null}
      </div>
      <div className="relative flex flex-col gap-y-2.5 *:bg-white dark:*:bg-neutral-950">
        <div className="sticky top-14 w-full h-16 -mb-16 z-10" aria-hidden />
        {/* Filter stuff */}
        <div className="sticky top-16 z-20 flex items-center gap-x-1.5">
          <Tabs
            tabs={
              [
                { label: "All" },
                { label: "Segments" },
                { label: "Chapters" },
              ] as const
            }
            activeTab="Segments"
          />
          <SegmentFilterBar />
          <button className="inline-flex items-center gap-x-2 rounded-md border se-border-1 px-3 py-2">
            <LuPlay size={19} />
            <span>Live</span>
          </button>
          <button className="inline-flex items-center gap-x-2 rounded-md border se-border-1 p-2">
            <LuRefreshCw size={19} />
          </button>
          <button className="border se-border-1 p-2 rounded-md">
            <LuEllipsisVertical size={19} />
          </button>
        </div>
        {/* Tables */}
        {!isEmptySubmission ? (
          <SegmentTable segments={segments!} />
        ) : (
          <div className="mt-4">
            <Notice heading="No segments submitted" intent="info">
              <p>
                Couldn't fetch segments, either the video ID may be invalid, or
                there are no submitted segments available for this video at this
                time. Maybe a refresh will help?
              </p>
              <button className="mt-1.5 px-3.5 py-1.5 rounded-md bg-blue-400 hover:bg-blue-300  dark:bg-blue-900 dark:hover:bg-blue-800">
                Fetch new data
              </button>
            </Notice>
          </div>
        )}
      </div>
    </>
  )
}
