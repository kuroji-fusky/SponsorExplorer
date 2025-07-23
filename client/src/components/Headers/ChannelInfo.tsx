"use client"

import { useState, useEffect } from "react"
import { _Link as Link } from "../Link"
import { LuBookmark, LuExternalLink, LuSquarePlay } from "react-icons/lu"
import { SegmentStatsInline } from "../SegmentStatsInline"
import { useChannelStoreProvider } from "@/context"
import { IconWrapper } from "../IconWrapper"
import { formatNumber, cn } from "@/utils"

export function ChannelInfo() {
  const { channel, sbSegments } = useChannelStoreProvider()

  const [totalSegmentCount, setTotalSegmentCount] = useState(0)
  const [isSegmentFetchComplete, setSegmentFetchState] = useState(false)

  useEffect(() => {
    const flattenSegments = sbSegments
      .filter((x) => x.data !== null)
      .flatMap((x) => x.data)

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
    <div className="mt-1 flex py-2 gap-x-5 md:flex-row flex-col items-center">
      <div className="flex-shrink-0">
        <div className="md:size-32 size-40 relative overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${channel!.thumbs}`} alt="" className="size-full" />
        </div>
      </div>
      {/* Details */}
      <div className="flex-1 flex flex-col gap-y-2">
        {/* Channel title */}
        <div className="space-y-1.5 md:text-left text-center md:pt-0 pt-4">
          <span className="opacity-75">Segments for channel</span>
          <div className="flex flex-wrap md:flex-row flex-col items-center">
            <span className="font-bold text-2xl inline" translate="no">
              {channel!.channelName}
            </span>
            <div className="inline-flex">
              <button className="ml-1 p-2">
                <LuBookmark size={18} />
              </button>
              <Link
                href={`https://www.youtube.com/channel/${channel!.id}`}
                className="p-2"
              >
                <LuExternalLink size={17} />
              </Link>
            </div>
          </div>
        </div>
        {/* Segments submitted */}
        <div className="my-0.5 border-t border-t-neutral-700" />
        <div className="flex flex-wrap items-center gap-x-1.5">
          <span className="inline-flex gap-x-1">
            <IconWrapper icon={LuSquarePlay} />
            <span>
              <strong>{formatNumber(channel!.videoCount)}</strong> upload(s)
            </span>
            <span className="opacity-75">(50 loaded)</span>
          </span>
          <span>&bull;</span>
          <span
            className={cn(
              "transition-opacity",
              !isSegmentFetchComplete ? "opacity-45" : "",
            )}
          >
            <SegmentStatsInline submissionCount={totalSegmentCount} />
          </span>
          {!isSegmentFetchComplete ? (
            <div
              id="spinner"
              className="animate-[spin_850ms_linear_infinite] size-[1rem] rounded-full border-[3px] !border-l-transparent border-neutral-900 dark:border-neutral-50"
            ></div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
