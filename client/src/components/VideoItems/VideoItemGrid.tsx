/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { LuLock, LuEllipsisVertical, LuSparkles } from "react-icons/lu"
import type { InlineSegments } from "@/types"
import { parseDateStr } from "@/utils"
import { usePrefetchRoute } from "@/hooks/usePrefetchRoute"
import type { SharedVideoItemProps } from "./VideoItem.types"
import { fetchSkipSegmentsClient } from "./fetchSkipSegmentsClient"
import { segmentLabelFormatter } from "./VideoItem.utils"
import { VideoItemFullLabel } from "./FullLabel"
import { useChannelStoreProvider } from "@/context"

const SegmentBar = dynamic(
  () => import("../SegmentBar").then((m) => m.SegmentBar),
  { ssr: false },
)

const SegmentPeek = dynamic(
  () => import("./SegmentPeek").then((m) => m.SegmentPeek),
  { ssr: false },
)

export default function VideoItemGrid(props: SharedVideoItemProps) {
  const { setSbSegments } = useChannelStoreProvider()

  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLoadingSegments, setLoadingSegments] = useState(true)
  const [skippableSegments, setSkippableSegments] = useState<InlineSegments>({
    relativeSegments: null,
    hasHighlight: false,
    fullLabel: null,
    hasLockedSegments: false,
  })

  const [isSegmentPeeking, setSegmentPeekState] = useState(false)

  const videoIdLink = `/video/${props.id}`
  const videoIdPrefetchEvent = usePrefetchRoute(videoIdLink)

  const { isoDate, readableDate } = parseDateStr(props.date!, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  // For fetching data
  useEffect(() => {
    const controller = new AbortController()

    // const hasExistingId = sbSegments.some((x) => x.id === props.id)

    if (!hasLoaded) {
      fetchSkipSegmentsClient(props.id, controller.signal).then((d) => {
        setSkippableSegments(d)
        setLoadingSegments(false)
        setHasLoaded(true)

        setSbSegments((v) => [...v, { id: props.id, data: d.relativeSegments }])
      })
    }

    return () => {
      controller.abort(
        `Aborting fetch call from potential route change: Aborted fetching skip segments from "${props.title}"`,
      )
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  // Handling segment
  const { hasHighlight, relativeSegments, fullLabel, hasLockedSegments } =
    skippableSegments

  return (
    <div
      onMouseLeave={() => {
        if (isSegmentPeeking) setSegmentPeekState(false)
      }}
      className="relative flex flex-col gap-y-2 lg:gap-y-2.5 group"
    >
      {/* Thumbnail wrapper */}
      <Link
        className="relative aspect-video w-full rounded-md overflow-hidden border-2 border-transparent dark:border-neutral-800 dark:group-hover:border-neutral-700 transition-colors"
        href={videoIdLink}
        onMouseEnter={videoIdPrefetchEvent}
      >
        {/* Thumbnail */}
        <img className="object-cover size-full" src={props.thumbnail!} alt="" />

        {/* Lock and full segments */}
        <span className="absolute inline-flex top-2 left-2 rounded-md overflow-hidden *:py-0.5 group-hover:opacity-40 transition-opacity">
          {hasLockedSegments ? (
            <div className="bg-yellow-300 dark:bg-yellow-400 dark:text-black inline-flex gap-x-1 place-items-center !py-1 px-1.5">
              <LuLock size={16} />
            </div>
          ) : null}
          {fullLabel !== null ? <VideoItemFullLabel label={fullLabel} /> : null}
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

      <div className="relative">
        {/* Segment peek container */}
        <div className="absolute top-0 inset-x-0">
          {isSegmentPeeking ? <SegmentPeek /> : null}
        </div>
        {/* Video details */}
        <div className="flex items-start">
          <Link
            className="flex-1 font-bold text-lg leading-normal"
            href={videoIdLink}
            onMouseEnter={videoIdPrefetchEvent}
          >
            {props.title}
          </Link>
          <button className="flex-shrink-0 p-1">
            <LuEllipsisVertical size={18} />
          </button>
        </div>
        <div className="pt-2 inline-flex gap-y-2 gap-x-2.5 ">
          <time
            dateTime={isoDate}
            className="opacity-60 group-hover:opacity-80 transition-opacity"
          >
            {readableDate}
          </time>
          {!isLoadingSegments ? (
            <button
              onClick={() => setSegmentPeekState(!isSegmentPeeking)}
              className={
                relativeSegments !== null
                  ? "opacity-100"
                  : "opacity-60 group-hover:opacity-80 transition-opacity"
              }
            >
              {segmentLabelFormatter(relativeSegments!, hasHighlight)}
            </button>
          ) : (
            <div className="h-5 rounded-md w-32 bg-neutral-300 dark:bg-neutral-500 animate-pulse" />
          )}
        </div>
      </div>
      {/* Cool hover effect */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-200 dark:bg-neutral-700 -z-10 rounded-md transition duration-200 ease-in-out opacity-0 scale-100 group-hover:opacity-60 group-hover:scale-105" />
    </div>
  )
}
