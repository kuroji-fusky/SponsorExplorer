"use client"

import { useEffect } from "react"
import {
  type ViewItemContext,
  useViewItemStateContext,
  useChannelStoreProvider,
} from "@/context"
import { KuroObjectLS } from "@/lib/KuroLS"
import type { RecentVisitedChannels } from "@/types"
import { cn } from "@/utils"
import dynamic from "next/dynamic"

const VideoItemGrid = dynamic(
  () => import("@/components/VideoItems/VideoItemGrid"),
)
// const VideoItemList = dynamic(() => import("./VideoItemList"))
// const VideoItemCompact = dynamic(() => import("./VideoItemCompact"))

interface VideoItemContainerProps {
  queryView?: ViewItemContext["view"]
}

export default function Container(props: VideoItemContainerProps) {
  const { view, setView } = useViewItemStateContext()
  const { videos, channel } = useChannelStoreProvider()

  useEffect(() => {
    const objLS = new KuroObjectLS<Partial<RecentVisitedChannels>>(
      "RecentVisitedChannels",
      [],
    )

    objLS.appendItem({
      name: channel?.channelName,
      id: channel?.id,
      visitedFrom: location.pathname,
      dateVisit: new Date(),
    })
  }, [])

  return (
    <>
      <div
        className={cn(
          "grid gap-x-5 gap-y-6",
          view === "grid"
            ? "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
            : "",
        )}
      >
        {videos.map((item) => (
          <VideoItemGrid
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.uploadDate}
            thumbnail={item.thumbnail}
            duration={item.duration}
            isPremiere={item.isPremiere}
          />
        ))}
      </div>
      <div>That's broke, I need to SPEND MORE</div>
    </>
  )
}
