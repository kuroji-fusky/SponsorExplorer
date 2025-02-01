"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { LuLock, LuMoreVertical, LuSparkles } from "react-icons/lu"
import Link from "next/link"
import type { InlineSegments } from "@/types"
import { parseDateStr } from "@/utils"
import type { SharedVideoItemProps } from "./VideoItem.types"
import { fetchSkipSegmentsClient } from "./fetchSkipSegmentsClient"
import Image from "next/image"
import { segmentLabelFormatter } from "./VideoItem.utils"

const SegmentBar = dynamic(() =>
  import("../SegmentBar").then((m) => m.SegmentBar),
)

interface VideoItemGridProps extends SharedVideoItemProps {
  id: string
  thumbnail?: string
}

export default function VideoItemGrid(props: VideoItemGridProps) {
  const router = useRouter()

  const { isoDate, readableDate } = parseDateStr(props.date!, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const videoIdLink = `/video/${props.id}`
  const videoIdPrefetchEvent = () => router.prefetch(videoIdLink)

  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLoadingSegments, setLoadingSegments] = useState(true)
  const [skippableSegments, setSegments] = useState<InlineSegments>({
    relativeSegments: null,
    hasHighlight: false,
    fullLabel: null,
  })

  useEffect(() => {
    const { signal } = new AbortController()

    if (!hasLoaded) {
      fetchSkipSegmentsClient(props.id, signal).then((d) => {
        setSegments(d)
        setLoadingSegments(false)
        setHasLoaded(true)
      })
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  const { hasHighlight, relativeSegments } = skippableSegments

  return (
    <div className="relative py-2.5 px-3 flex flex-col gap-y-2 lg:gap-y-2.5 group">
      {/* Thumbnail wrapper */}
      <Link
        className="relative aspect-video w-full rounded-md overflow-hidden border-2 border-transparent dark:border-neutral-800  dark:group-hover:border-neutral-700 transition-colors"
        href={videoIdLink}
        onMouseEnter={videoIdPrefetchEvent}
      >
        {/* Thumbnail */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          className="object-cover size-full"
          src={props.thumbnail!}
          fill
          alt=""
        />

        {/* Lock and full segments */}
        <span className="absolute inline-flex top-2 left-2 rounded-md overflow-hidden *:py-0.5">
          {/* <div className="bg-yellow-300 dark:bg-yellow-400 dark:text-black inline-flex gap-x-1 place-items-center pl-2 pr-1.5">
            <LuLock size={16} />
          </div> */}
          {/* <div className="font-semibold relative px-2">
            <span className="relative z-20">Sponsor</span>
            <span className="dark:bg-black/30 absolute z-10 inset-0" />
            <span className="bg-sb-sponsor absolute inset-0" />
          </div> */}
        </span>
        {/* Video duration */}
        <div className="absolute flex items-center bottom-2 right-2 px-1.5 *:px-0.5 *:py-1 overflow-hidden text-white bg-black/50 backdrop-blur-sm rounded-md">
          {hasHighlight ? <LuSparkles size={25} /> : null}
          <div id="og-duration">{props.duration}</div>
          {/* <div id="sb-deduct">(12:34)</div> */}
        </div>
        {/* Bar wrapper */}
        <div className="absolute bottom-0 inset-x-0">
          {relativeSegments ? <SegmentBar segments={relativeSegments} /> : null}
        </div>
      </Link>
      <div className="space-y-2">
        <div className="flex items-start">
          <Link
            className="flex-1 font-bold text-lg leading-normal"
            href={videoIdLink}
            onMouseEnter={videoIdPrefetchEvent}
          >
            {props.title}
          </Link>
          <button className="flex-shrink-0 p-1">
            <LuMoreVertical size={18} />
          </button>
        </div>
        <div className="inline-flex gap-y-2 gap-x-2.5 ">
          <time
            dateTime={isoDate}
            className="opacity-60 group-hover:opacity-80 transition-opacity"
          >
            {readableDate}
          </time>
          {!isLoadingSegments ? (
            <span
              className={
                relativeSegments !== null
                  ? "opacity-100"
                  : "opacity-60 group-hover:opacity-80 transition-opacity"
              }
            >
              {segmentLabelFormatter(relativeSegments!, hasHighlight)}
            </span>
          ) : (
            <div className="h-5 rounded-md w-32 bg-neutral-300 dark:bg-neutral-100 animate-pulse" />
          )}
        </div>
      </div>
      {/* Cool hover effect */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-200 dark:bg-neutral-700 -z-10 rounded-md transition duration-200 ease-in-out opacity-0 scale-95 group-hover:opacity-60 group-hover:scale-100" />
    </div>
  )
}
