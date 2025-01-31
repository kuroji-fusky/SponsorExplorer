"use client"

import {
  useViewItemStateContext,
  type ViewItemContext,
  useChannelStoreProvider,
} from "@/context"
import { cn } from "@/utils"
import VideoItemGrid from "./VideoItemGrid"

interface VideoItemContainerProps {
  queryView?: ViewItemContext["view"]
}

export function VideoItemContainer(props: VideoItemContainerProps) {
  const { view, setView } = useViewItemStateContext()
  const { videos } = useChannelStoreProvider()

  return (
    <div className={cn("grid gap-1.5", view === "grid" ? "grid-cols-4" : "")}>
      {videos.map((item, i) => (
        <VideoItemGrid
          key={i}
          id={item.id}
          title={item.title}
          data={item.date}
          thumbnail={item.thumbnail}
        />
      ))}
    </div>
  )
}
