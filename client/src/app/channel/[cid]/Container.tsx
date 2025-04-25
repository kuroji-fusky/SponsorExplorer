"use client"

import {
  useViewItemStateContext,
  type ViewItemContext,
  useChannelStoreProvider,
} from "@/context"
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
  const { videos } = useChannelStoreProvider()

  return (
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
  )
}
