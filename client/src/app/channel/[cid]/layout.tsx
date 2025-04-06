import type { Metadata } from "next"
import { headers } from "next/headers"
import type { ChannelIdRouteParams } from "@/types"
import {
  type ViewItemContext,
  ViewItemProvider,
  ChannelStoreProvider,
} from "@/context"
import { ChannelInfo } from "@/components/Headers"
import { fetchChannelData } from "@/utils/fetchYTData"
import { LuVideoOff } from "react-icons/lu"
import { ChannelFilterShelf } from "@/components/Shelf"

export async function generateMetadata(
  props: ChannelIdRouteParams,
): Promise<Metadata> {
  const params = await props.params

  const { channel } = await fetchChannelData(params.cid)

  if (!channel) {
    return {
      title: `Channel ID: ${params.cid}`,
    }
  }

  return {
    title: `Channel segments for ${channel.channelName}`,
  }
}

export default async function ChannelLayout({
  children,
  ...props
}: Readonly<{ children: React.ReactNode } & ChannelIdRouteParams>) {
  const _params = await props.params

  const searchParams = new URLSearchParams(
    (await headers()).get("x-url-params")!,
  )

  const { channel, videos } = await fetchChannelData(_params.cid)

  const viewParam = searchParams.get("view") as ViewItemContext["view"]
  const isValidViews =
    viewParam === "compact" || viewParam === "list" || viewParam === "grid"

  return (
    <div className="px-6 max-w-screen-2xl mx-auto">
      <ChannelStoreProvider initialVideoStore={videos} channelData={channel}>
        <ViewItemProvider initialView={!isValidViews ? "grid" : viewParam}>
          <ChannelInfo />
          {/* Filter */}
          <ChannelFilterShelf />
          {videos.length !== 0 ? (
            children
          ) : (
            <div className="!mt-10 flex flex-col items-center space-y-9">
              <LuVideoOff size={52} className="rotate-12" />
              <span className="max-w-screen-md text-center">
                This channel has no videos. If you believe this is a mistake,
                double check if you entered the channel ID, handle, or username
                correctly.
              </span>
            </div>
          )}
        </ViewItemProvider>
      </ChannelStoreProvider>
    </div>
  )
}
