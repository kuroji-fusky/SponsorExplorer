"use client"

import {
  useViewItemStateContext,
  type ViewItemContext,
  useChannelStoreProvider,
} from "@/context"
import { cn } from "@/utils"
import dynamic from "next/dynamic"
import { LuVideoOff } from "react-icons/lu"

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
    <>
      {videos.length !== 0 ? (
        <div
          className={cn(
            "grid gap-1.5",
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
            />
          ))}
        </div>
      ) : (
        <div className="!mt-10 flex flex-col items-center space-y-9">
          <LuVideoOff size={52} className="rotate-12" />
          <span className="max-w-screen-md text-center">
            This channel has no videos. If you believe this is a mistake, double
            check if you entered the channel ID, handle, or username correctly.
          </span>
        </div>
      )}
    </>
  )
}
