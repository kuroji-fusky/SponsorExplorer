"use client"

import {
  LuEllipsisVertical,
  LuFilter,
  LuLayoutGrid,
  LuLayoutList,
  LuList,
  LuSearch,
} from "react-icons/lu"
import { Tabs } from "../Tabs"

export function ChannelFilterShelf() {
  return (
    <div className="sticky top-14 z-20 py-4 bg-white  dark:bg-neutral-950 flex gap-x-1.5">
      <Tabs
        tabs={
          [
            { label: "All" },
            { label: "Videos" },
            { label: "Shorts" },
            { label: "Live" },
          ] as const
        }
        activeTab="Videos"
      />
      <div className="flex-1 relative">
        <span className="absolute inset-y-0 left-0 inline-flex items-center ml-2.5 pointer-events-none">
          <LuSearch size={18} />
        </span>
        <input
          className="w-full h-full dark:bg-neutral-950 rounded-md pr-2 pl-8 border dark:border-neutral-700"
          type="search"
          name="search-video"
          id="sv"
          placeholder="Search"
        />
      </div>
      <button className="inline-flex items-center gap-x-2 py-2 px-3 border se-border-1 rounded-md">
        <LuFilter size={19} />
        <span>Filters</span>
      </button>
      <Tabs
        tabs={
          [
            { label: "grid", icon: LuLayoutGrid },
            { label: "list", icon: LuLayoutList },
            { label: "compact", icon: LuList },
          ] as const
        }
        iconOnly
        activeTab="grid"
      />
      <button className="inline-flex items-center gap-x-2 py-2 px-2 border se-border-1 rounded-md">
        <LuEllipsisVertical size={19} />
      </button>
    </div>
  )
}
