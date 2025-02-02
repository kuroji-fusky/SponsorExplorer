"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { LuLock, LuMoreVertical, LuSparkles } from "react-icons/lu"
import Link from "next/link"
import type { InlineSegments } from "@/types"
import { parseDateStr } from "@/utils"
import type { SharedVideoItemProps } from "./VideoItem.types"
import { fetchSkipSegmentsClient } from "./fetchSkipSegmentsClient"
import Image from "next/image"
import { segmentLabelFormatter } from "./VideoItem.utils"
import { usePrefetchRoute } from "@/hooks/usePrefetchRoute"

const VideoItemFullLabel = dynamic(
  () => import("./FullLabel").then((m) => m.VideoItemFullLabel),
  { ssr: false },
)

const SegmentBar = dynamic(
  () => import("../SegmentBar").then((m) => m.SegmentBar),
  { ssr: false },
)

export default function VideoItemGrid(props: SharedVideoItemProps) {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLoadingSegments, setLoadingSegments] = useState(true)
  const [skippableSegments, setSkippableSegments] = useState<InlineSegments>({
    relativeSegments: null,
    hasHighlight: false,
    fullLabel: null,
  })

  const videoIdLink = `/video/${props.id}`
  const videoIdPrefetchEvent = usePrefetchRoute(videoIdLink)

  const { isoDate, readableDate } = parseDateStr(props.date!, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!hasLoaded) {
      fetchSkipSegmentsClient(props.id, signal).then((d) => {
        setSkippableSegments(d)
        setLoadingSegments(false)
        setHasLoaded(true)
      })
    }

    return () => {
      abortController.abort(
        `Aborting fetch call from potential route change: Aborted fetching skip segments from "${props.title}"`,
      )
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  const { hasHighlight, relativeSegments, fullLabel } = skippableSegments

  return (
    <div className="relative py-2.5 px-3 flex flex-col gap-y-2 lg:gap-y-2.5 group">
      {/* Thumbnail wrapper */}
      <Link
        className="relative aspect-video w-full rounded-md overflow-hidden border-2 border-transparent dark:border-neutral-800  dark:group-hover:border-neutral-700 transition-colors"
        href={videoIdLink}
        onMouseEnter={videoIdPrefetchEvent}
      >
        {/* Thumbnail */}
        <Image
          className="object-cover size-full"
          src={props.thumbnail!}
          fill
          priority
          alt=""
        />

        {/* Lock and full segments */}
        <span className="absolute inline-flex top-2 left-2 rounded-md overflow-hidden *:py-0.5">
          {/* <div className="bg-yellow-300 dark:bg-yellow-400 dark:text-black inline-flex gap-x-1 place-items-center pl-2 pr-1.5">
            <LuLock size={16} />
          </div> */}

          <div className="group-hover:opacity-40 transition-opacity"></div>
          {fullLabel !== null ? <VideoItemFullLabel /> : null}
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
