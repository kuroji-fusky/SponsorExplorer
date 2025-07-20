"use client"

import { useVideoInfoContext } from "@/context"
import { LockedSegmentsNotice } from "./LockedSegments"
import { SegmentTable } from "./Tables"
import { Notice } from "./Notice"
import { SegmentFilterBar } from "./Shelf"

export function SegmentClientWrapper() {
  const { segmentData } = useVideoInfoContext()
  const { segments, lockReason, hasLockedSegments } = segmentData!

  const isEmptySubmission = segments?.length === 0

  return (
    <>
      {/* Lock notices */}
      <div className="my-3 empty:my-1">
        {hasLockedSegments ? (
          <LockedSegmentsNotice reason={lockReason!} />
        ) : null}
      </div>
      <div className="relative flex flex-col gap-y-2.5 *:bg-white dark:*:bg-neutral-950">
        <div className="sticky z-10 w-full h-16 -mb-16 top-14" aria-hidden />
        {/* Filter stuff */}
        <SegmentFilterBar />
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
              <button className="mt-1.5 px-3.5 py-1.5 rounded-md bg-blue-400 hover:bg-blue-300 dark:bg-blue-900 dark:hover:bg-blue-800">
                Fetch new data
              </button>
            </Notice>
          </div>
        )}
      </div>
    </>
  )
}
