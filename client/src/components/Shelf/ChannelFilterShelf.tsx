"use client"

import { useState, useEffect } from "react"
import { _Link as Link } from "../Link"
import { SegmentStatsInline } from "../SegmentStatsInline"
import { useChannelStoreProvider } from "@/context"
import { LuEllipsisVertical, LuFilter, LuLayoutGrid, LuList, LuSearch } from "react-icons/lu"
import { Tabs } from "../Tabs"
import { cn } from "@/utils"
import { Button } from "../Buttons"

export function ChannelFilterShelf() {
  const { channel, sbSegments } = useChannelStoreProvider()

  const [totalSegmentCount, setTotalSegmentCount] = useState(0)
  const [isSegmentFetchComplete, setSegmentFetchState] = useState(false)

  useEffect(() => {
    const flattenSegments = sbSegments.filter((x) => x.data !== null).flatMap((x) => x.data)

    setTotalSegmentCount(flattenSegments.length)

    // A temporary workaround when dealing with the actual video count from the YT API
    const channelVids = channel!.videoCount
    const LOAD_LIMIT = 48

    const tempChannelVids = channelVids >= LOAD_LIMIT ? LOAD_LIMIT : channelVids

    const totalSegmentsFetched = sbSegments.length

    if (tempChannelVids === totalSegmentsFetched) {
      setSegmentFetchState(true)
    }
  }, [sbSegments])

  return (
    <section className="sticky top-14 z-40 py-4 bg-white  dark:bg-neutral-950 flex gap-x-1.5">
      <Tabs tabs={[{ label: "All" }, { label: "Videos" }, { label: "Shorts" }] as const} activeTab="Videos" />
      <div className="flex-1 flex items-center gap-x-2">
        <button aria-label={`${totalSegmentCount} submission(s)`} className={cn("transition-opacity", !isSegmentFetchComplete ? "opacity-65" : "")}>
          <SegmentStatsInline submissionCount={totalSegmentCount} />
        </button>
        {isSegmentFetchComplete && totalSegmentCount != 0 ? (
          <Link href={`/inspect/channel/${channel!.id}`}>
            <Button iconOnly>
              <LuFilter size={17} />
            </Button>
          </Link>
        ) : null}
        {!isSegmentFetchComplete ? (
          <div id="spinner" className="animate-[spin_850ms_linear_infinite] size-4 rounded-full border-[3px] !border-l-transparent border-neutral-900 dark:border-neutral-50"></div>
        ) : null}
      </div>
      <div className="relative md:block hidden">
        <span className="absolute inset-y-0 left-0 inline-flex items-center ml-2.5 pointer-events-none">
          <LuSearch size={17} />
        </span>
        <input className="w-full h-full dark:bg-neutral-950 rounded-md pr-2 pl-8 border dark:border-neutral-700" type="search" name="search-video" id="sv" placeholder="Search videos" />
      </div>
      <div className="lg:contents hidden">
        <button className="inline-flex items-center gap-x-2 py-2 px-3 border se-border-1 rounded-md">
          <LuFilter size={17} />
          <span>Filters</span>
        </button>
        <Tabs
          tabs={
            [
              { label: "grid", icon: LuLayoutGrid },
              { label: "list", icon: LuList },
            ] as const
          }
          iconOnly
          activeTab="grid"
        />
      </div>
      <Button className="lg:hidden flex" iconOnly>
        <LuEllipsisVertical size={17} />
      </Button>
    </section>
  )
}
