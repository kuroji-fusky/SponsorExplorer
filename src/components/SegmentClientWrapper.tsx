"use client"

import { LockedSegmentsNotice, SegmentTable } from "@/components"
import { VideoSegments } from "@/types"
import { LuHelpCircle, LuMoreVertical, LuSearch } from "react-icons/lu"

interface SegmentClientWrapperProps {
  hasLocks: boolean
  segments: VideoSegments["segments"]
}

export function SegmentClientWrapper(props: SegmentClientWrapperProps) {
  return (
    <>
      <div className="my-4">
        {props.hasLocks ? <LockedSegmentsNotice /> : null}
      </div>
      <div className="flex flex-col gap-y-2.5">
        <div className="bg-white sticky top-20 z-20 flex gap-x-2.5">
          <div className="p-1 rounded-md border flex">
            <button className="rounded-md px-2.5 py-0.5 bg-red-200 font-medium">
              All
            </button>
            <button className="rounded-md px-2.5 py-0.5">Segments</button>
            <button className="rounded-md px-2.5 py-0.5">Chapters</button>
          </div>
          <div className="flex-1 relative flex rounded-md border">
            <LuSearch size={18} className="absolute left-2 top-2.5" />
            <input
              className="flex-1 h-full ml-8"
              type="text"
              placeholder="Filter segments"
            />
          </div>
          <button>
            <LuMoreVertical size={19} />
          </button>
          <button>
            <LuHelpCircle size={19} />
          </button>
        </div>
        <SegmentTable segments={props.segments} />
        {/* <div>
          <button>Load more...</button>
        </div> */}
      </div>
    </>
  )
}
