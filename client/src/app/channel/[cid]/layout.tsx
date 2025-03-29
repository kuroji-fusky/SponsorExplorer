import type { Metadata } from "next"
import type { ChannelIdRouteParams } from "@/types"
import {
  type ViewItemContext,
  ViewItemProvider,
  ChannelStoreProvider,
} from "@/context"
import { ChannelInfo } from "@/components/Headers"
import { headers } from "next/headers"
import { fetchChannelData } from "@/utils/fetchYTData"
import {
  LuEllipsisVertical,
  LuFilter,
  LuLayoutGrid,
  LuLayoutList,
  LuList,
  LuSearch,
  LuVideoOff,
} from "react-icons/lu"
import { Tabs } from "@/components"

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
          <div className="sticky top-14 z-20 py-4  bg-neutral-950 flex gap-x-1.5">
            <Tabs
              tabs={
                [
                  { label: "All" },
                  { label: "Videos" },
                  { label: "Shorts" },
                  { label: "Live" },
                ] as const
              }
              activeTab="Videos"
            />
            <div className="flex-1 relative">
              <span className="absolute inset-y-0 left-0 inline-flex items-center ml-2.5 pointer-events-none">
                <LuSearch size={18} />
              </span>
              <input
                className="w-full h-full dark:bg-neutral-950 rounded-md pr-2 pl-8 border dark:border-neutral-700"
                type="search"
                name="search-video"
                id="sv"
                placeholder="Search"
              />
            </div>
            <button className="inline-flex items-center gap-x-2 py-2 px-3 border se-border-1 rounded-md">
              <LuFilter size={19} />
              <span>Filters</span>
            </button>
            <Tabs
              tabs={
                [
                  { label: "grid", icon: LuLayoutGrid },
                  { label: "list", icon: LuLayoutList },
                  { label: "compact", icon: LuList },
                ] as const
              }
              iconOnly
              activeTab="grid"
            />
            <button className="inline-flex items-center gap-x-2 py-2 px-2 border se-border-1 rounded-md">
              <LuEllipsisVertical size={19} />
            </button>
          </div>
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
