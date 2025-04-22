"use client"

import { _Link as Link } from "../Link"
import { useVideoInfoContext } from "@/context"
import { cn } from "@/utils"
import { Notice } from "../Notice"
import { TimeDateWrapper } from "../TimeDateWrapper"

export function VideoInfoTitle() {
  const {
    videoDetails: { video },
  } = useVideoInfoContext()

  return video ? (
    <>
      <div className="space-y-1">
        <span className="opacity-75">Segments for</span>
        <h1 translate="no">{video.title}</h1>
      </div>
      <div className="inline-flex flex-wrap items-center gap-x-1.5">
        <div className="sr-only" id="view-channel-segments-a11y">
          {"View channel segments for "}
          <span translate="no">{video.channelTitle}</span>
        </div>
        <Link
          translate="no"
          aria-labelledby="view-channel-segments-a11y"
          href={`/channel/${video.channelId}`}
          className="inline-flex items-center gap-x-2.5"
        >
          <div className="size-7 aspect-square rounded-full overflow-hidden bg-red-200">
            <img src={video.channelAvatar} alt="" />
          </div>
          <span className="my-auto">{video.channelTitle}</span>
        </Link>
        <div className="bg-white/65 size-1 rounded-full " />
        <TimeDateWrapper date={video.publishedAt} />
      </div>
    </>
  ) : (
    <Notice intent="alert" heading="Couldn't fetch video details">
      This video might be private or has been removed from YouTube. Maybe double
      check the video ID?
    </Notice>
  )
}
