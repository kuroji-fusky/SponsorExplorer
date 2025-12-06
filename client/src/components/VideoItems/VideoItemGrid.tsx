"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { LuLock, LuEllipsisVertical, LuSparkles } from "react-icons/lu"
import type { InlineSegments } from "@/types"
import { usePrefetchRoute } from "@/hooks/usePrefetchRoute"
import type { SharedVideoItemProps } from "./VideoItem.types"
import { fetchSkipSegmentsClient } from "./fetchSkipSegmentsClient"
import { segmentLabelFormatter } from "./VideoItem.utils"
import { VideoItemFullLabel } from "./FullLabel"
import { useChannelStoreProvider } from "@/context"
import { TimeDateWrapper } from "../TimeDateWrapper"
import { cn } from "@/utils"
import { SegmentBar } from "../SegmentBar"

const SegmentPeek = dynamic(() =>
  import("./SegmentPeek").then((m) => m.SegmentPeek),
)

export default function VideoItemGrid(
  props: Omit<SharedVideoItemProps, "uploadDate" | "duration">,
) {
  const { setSbSegments } = useChannelStoreProvider()

  const [hasLoaded, setHasLoaded] = useState(false)
  const [skippableSegments, setSkippableSegments] = useState<InlineSegments>({
    relativeSegments: null,
    hasHighlight: false,
    fullLabel: null,
    hasLockedSegments: false,
  })

  const [isSegmentPeeking, setSegmentPeekState] = useState(false)

  const videoIdLink = `/video/${props.id}`
  const videoIdPrefetchEvent = usePrefetchRoute(videoIdLink)

  // For fetching data
  useEffect(() => {
    const controller = new AbortController()

    if (!hasLoaded) {
      fetchSkipSegmentsClient(props.id, controller.signal).then((d) => {
        setSkippableSegments(d)
        setHasLoaded(true)

        setSbSegments((v) => [
          ...v,
          { id: props.id, title: props.title, data: d.relativeSegments },
        ])
      })
    }

    return () => {
      controller.abort(
        `Aborting fetch call from potential route change: Aborted fetching skip segments from "${props.title}"`,
      )
    }
  }, [])

  // Handling segment
  const { hasHighlight, relativeSegments, fullLabel, hasLockedSegments } =
    skippableSegments

  const isVideoPremiere = props.isPremiere === "none"
  const hasSegments = relativeSegments !== null

  return (
    <div
      data-testid="video-item"
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
        <span className="absolute inline-flex top-2 left-2 rounded-md overflow-hidden *:py-0.5 group-hover:opacity-60 transition-opacity">
          {hasLockedSegments ? (
            <div className="bg-yellow-300 dark:bg-yellow-400 dark:text-black inline-flex gap-x-1 place-items-center !py-1 px-1.5">
              <LuLock size={16} />
            </div>
          ) : null}
          {fullLabel !== null ? <VideoItemFullLabel label={fullLabel} /> : null}
        </span>
        {/* Video duration */}
        <div
          className={cn(
            "absolute flex items-center bottom-2 right-2 px-1.5 *:px-0.5 *:py-1 overflow-hidden text-white backdrop-blur-sm rounded-md",
            isVideoPremiere ? "bg-black/50" : "bg-red-600/50",
          )}
        >
          {hasHighlight ? <LuSparkles size={25} /> : null}
          <div id="og-duration">
            {isVideoPremiere ? props.durationReadable : "PREMIERE"}
          </div>
          {/* <div id="sb-deduct">(12:34)</div> */}
        </div>
        {/* Bar wrapper */}
        <div className="absolute bottom-0 inset-x-0">
          {hasSegments ? <SegmentBar segments={relativeSegments} /> : null}
        </div>
      </Link>

      <div className="relative empty:hidden">
        {/* Segment peek container */}
        {hasSegments ? (
          <div className="absolute top-0 inset-x-0 z-40">
            {isSegmentPeeking ? (
              <SegmentPeek>{JSON.stringify(relativeSegments)}</SegmentPeek>
            ) : null}
          </div>
        ) : null}
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
        <div className="pt-2 inline-flex gap-y-0.5 gap-x-2 flex-wrap items-center">
          <TimeDateWrapper
            className="opacity-60 group-hover:opacity-80 transition-opacity"
            date={props.date!}
            dateOpts={{
              month: "short",
              day: "numeric",
              year: "numeric",
            }}
          />
          <div className="dark:bg-white/65 bg-black/60 size-1 rounded-full" />
          {hasLoaded ? (
            <button
              onClick={() => setSegmentPeekState(!isSegmentPeeking)}
              className={
                hasSegments
                  ? "opacity-100"
                  : "opacity-30 group-hover:opacity-80 transition-opacity cursor-not-allowed"
              }
            >
              {segmentLabelFormatter(relativeSegments!, hasHighlight)}
            </button>
          ) : (
            <span className="text-neutral-700 dark:text-neutral-200 animate-pulse">
              Loading...
            </span>
          )}
        </div>
      </div>
      {/* Cool hover effect */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-200 dark:bg-neutral-700 -z-10 rounded-md transition duration-200 ease-in-out opacity-0 scale-[1.03] group-hover:opacity-60 group-hover:scale-105" />
    </div>
  )
}
