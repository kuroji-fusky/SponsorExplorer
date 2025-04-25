"use client"

import { useVideoInfoContext } from "@/context"
import dynamic from "next/dynamic"
import { _Link as Link } from "../Link"

import { LuExternalLink, LuEllipsisVertical } from "react-icons/lu"
import { VideoInfoTitle } from "./VideoInfoTitle"
import { VideoInfoStats } from "./VideoInfoStats"

const YouTube = dynamic(() => import("../YouTube").then((c) => c.YouTube), {
  ssr: false,
})

export function VideoInfo() {
  const { segmentData, videoDetails } = useVideoInfoContext()

  const _submissionCount = segmentData.submissionCount ?? 0

  return (
    <>
      <div
        data-player-root-anchor=""
        className="overflow-hidden rounded-lg flex lg:flex-row flex-col lg:bg-neutral-100 lg:dark:bg-neutral-800/30"
      >
        <div className="aspect-video 2xl:w-[48rem] xl:w-[38rem] lg:w-[32rem] w-full h-full overflow-hidden relative">
          <YouTube id={videoDetails.id} />
        </div>
        {/* Video details */}
        <div className="flex-1 lg:px-5 lg:py-4 pt-3.5 pb-1 flex flex-col gap-y-2.5 prose-h1:text-2xl prose-h1:font-bold w-full">
          {/* Video title */}
          <VideoInfoTitle />
          <div className="mt-0.5 border-t border-t-neutral-700" />
          <section className="mt-1">
            <VideoInfoStats
              submissionCount={_submissionCount}
              segments={segmentData.segments}
            />
          </section>
          <div>
            <div className="flex justify-end">
              <div className="flex items-center">
                <Link
                  href={`https://sb.ltn.fi/video/${videoDetails.id}/?source=se-staging.fusky.pet`}
                  className="inline-flex gap-x-1.5 items-center no-underline transition-opacity hover:bg-neutral-300 dark:hover:bg-neutral-800 px-1.5 py-0.5 rounded-md"
                >
                  <span translate="no">SBbrowser</span>
                  <LuExternalLink size={17} />
                </Link>
                <button className="transition-opacity hover:bg-neutral-300 dark:hover:bg-neutral-800 px-1 rounded-md">
                  <LuEllipsisVertical size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
