"use client"

import { _Link as Link } from "../Link"
import { useVideoInfoContext } from "@/context"
import { Notice } from "../Notice"
import { TimeDateWrapper } from "../TimeDateWrapper"
import { IconWrapper } from "../IconWrapper"
import { LuBookmark, LuExternalLink } from "react-icons/lu"

export function VideoInfoTitle() {
  const {
    videoDetails: { video },
  } = useVideoInfoContext()

  return video ? (
    <>
      <span className="sr-only" id="video-title-a11y">
        Segments for
        <span translate="no">{video.title}</span>
      </span>
      <section aria-labelledby="video-title-a11y" className="space-y-1">
        <span className="opacity-75">Segments for</span>
        <h1 translate="no">{video.title}</h1>
      </section>
      <section className="inline-flex flex-wrap items-center gap-x-1.5">
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
            <img
              src={video.channelAvatar}
              alt={`Channel avatar for ${video.channelTitle}`}
            />
          </div>
          <span className="my-auto">{video.channelTitle}</span>
        </Link>
        <button>
          <IconWrapper icon={LuBookmark} size="smol" />
        </button>
        <div className="dark:bg-white/65 bg-black/60 size-0.5 rounded-full" />
        <TimeDateWrapper date={video.publishedAt} />
      </section>
    </>
  ) : (
    <Notice intent="alert" heading="Couldn't fetch video details">
      This video might be private or has been removed from YouTube. Maybe double
      check the video ID?
    </Notice>
  )
}
