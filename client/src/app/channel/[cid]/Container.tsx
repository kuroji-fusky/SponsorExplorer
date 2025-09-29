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
import { Button } from "@/components/Buttons"

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
    // TODO replace this with indexedDB instead of localstorage
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

  // Hard-coded the value at the moment, will change this if the user has a query param for `?videoLoad=100` or something
  const videoLoadLimit = 50

  const hasLoadMorePrompt = channel!.videoCount >= videoLoadLimit

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
            durationReadable={item.durationReadable}
            isPremiere={item.isPremiere}
          />
        ))}
      </div>
      {hasLoadMorePrompt ? (
        <div className="mt-4 text-center">
          <Button className="w-40">Load more</Button>
        </div>
      ) : null}
    </>
  )
}
