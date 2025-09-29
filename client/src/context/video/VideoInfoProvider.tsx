"use client"

import type { VideoInfoType, VideoSegments } from "@/types"
import { noop } from "lodash-es"
import { createContext, useContext, useState } from "react"
import { usePathname } from "next/navigation"
import { VideoSidebarProvider } from "./VideoSidebarProvider"
import type { MapUseStateSetters } from "../context.types"

type VideoInfoContextType = MapUseStateSetters<
  {
    videoDetails: VideoInfoType & {
      id: string
      video: { channelAvatar: string }
    }
    segmentData: Partial<VideoSegments>
  },
  "videoDetails"
>

type MaybeSegmentData = NonNullable<VideoInfoContextType>["segmentData"]
type MaybeVideoDetails = NonNullable<VideoInfoContextType>["videoDetails"]

const INITIAL_SEGMENT_DATA = {
  submissionCount: 0,
  segments: [],
  lockReason: null,
  lockedSegments: {},
  hasLockedSegments: false,
} satisfies MaybeSegmentData

const INITIAL_VIDEO_DATA = {
  id: "",
  video: {
    channelId: "",
    channelTitle: "",
    publishedAt: "",
    title: "",
    channelAvatar: "",
    length: 0,
  },
} satisfies MaybeVideoDetails

const VideoInfoContext = createContext<VideoInfoContextType>({
  segmentData: INITIAL_SEGMENT_DATA,
  videoDetails: INITIAL_VIDEO_DATA,
  setSegmentData: noop,
})

const validVideoPathOnly = () => {
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const pathname = usePathname()

  if (!pathname.startsWith("/video/")) {
    throw new Error(
      "useVideoInfoContext should only be used in `/video/*` routes only",
    )
  }
}

export const useVideoInfoContext = () => {
  const context = useContext(VideoInfoContext)

  validVideoPathOnly()

  return context as NonNullable<VideoInfoContextType>
}

export function VideoInfoProvider({
  children,
  videoData,
  initialSegmentData: initialData = INITIAL_SEGMENT_DATA,
}: Readonly<{
  children: React.ReactNode
  videoData: MaybeVideoDetails
  initialSegmentData?: MaybeSegmentData
}>) {
  const [segmentData, setSegmentData] = useState(initialData)

  validVideoPathOnly()

  return (
    <VideoInfoContext.Provider
      value={{ videoDetails: videoData, segmentData, setSegmentData }}
    >
      <VideoSidebarProvider>{children}</VideoSidebarProvider>
    </VideoInfoContext.Provider>
  )
}
