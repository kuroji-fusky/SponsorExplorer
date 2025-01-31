"use client"

import {
  useViewItemStateContext,
  type ViewItemContext,
  useChannelStoreProvider,
} from "@/context"
import { cn } from "@/utils"
import dynamic from "next/dynamic"

const VideoItemGrid = dynamic(() => import("./VideoItemGrid"))
// const VideoItemList = dynamic(() => import("./VideoItemList"))
// const VideoItemCompact = dynamic(() => import("./VideoItemCompact"))

interface VideoItemContainerProps {
  queryView?: ViewItemContext["view"]
}

export function VideoItemContainer(props: VideoItemContainerProps) {
  const { view, setView } = useViewItemStateContext()
  const { videos } = useChannelStoreProvider()

  return (
    <div className={cn("grid gap-1.5", view === "grid" ? "grid-cols-4" : "")}>
      {videos.map((item) => (
        <VideoItemGrid
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.uploadDate}
          thumbnail={item.thumbnail}
          duration={item.duration}
        />
      ))}
    </div>
  )
}
