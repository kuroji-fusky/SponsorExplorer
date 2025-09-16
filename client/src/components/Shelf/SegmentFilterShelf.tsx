"use client"

import { LuChevronDown, LuFilter } from "react-icons/lu"
import { Tabs } from "../Tabs"
import { LiveSegmentButtons, MoreButton } from "../Buttons"

export function SegmentFilterBar() {
  return (
    <div className="sticky top-16 z-20 flex items-center gap-x-1.5">
      <div className="w-full flex items-center border se-border-1 py-2 px-2.5 rounded-md">
        <button className="inline-flex items-center gap-x-2">
          <LuFilter size={19} />
          <span className="opacity-60">Filters</span>
        </button>

        <button className="ml-auto">
          <LuChevronDown size={19} />
        </button>
      </div>
      <LiveSegmentButtons />
      <MoreButton />
    </div>
  )
}
