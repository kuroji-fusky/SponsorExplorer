"use client"

import { _Link as Link } from "@/components/Link"
import { LuBookmark, LuExternalLink } from "react-icons/lu"
import { SegmentStatsInline } from "../SegmentStatsInline"

import { useChannelStoreProvider } from "@/context"

interface ChannelInfoProps {
  channelId: string
}

export function ChannelInfo(props: ChannelInfoProps) {
  const { channel } = useChannelStoreProvider()
  return (
    <div className="mt-1 flex bg-neutral-100 dark:bg-neutral-900/40 rounded-md px-6 py-5 gap-x-5">
      <div className="flex-shrink-0">
        <div className="size-28 rounded-full relative overflow-hidden rounded-full">
          <img src={`${channel.thumbs}`} alt="" className="size-full" />
        </div>
      </div>
      {/* Details */}
      <div className="flex-1 flex flex-col gap-y-2">
        {/* Channel title */}
        <div className="space-y-0.5">
          <span className="opacity-75">Segments for channel</span>
          <div className="flex flex-wrap items-center">
            <span className="text-2xl font-bold inline" translate="no">
              {channel.channelName}
            </span>
            <button className="ml-1 p-2 inline">
              <LuBookmark size={18} />
            </button>
            <Link
              href={`https://www.youtube.com/channel/${props.channelId}`}
              className="p-2 inline"
            >
              <LuExternalLink size={17} />
            </Link>
          </div>
        </div>
        {/* Segments submitted */}
        <SegmentStatsInline />
      </div>
    </div>
  )
}
