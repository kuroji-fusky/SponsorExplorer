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
    title: `Channel segments for ${channel[0].channelName}`,
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
    <ChannelStoreProvider initialVideoStore={videos} channelData={channel[0]}>
      <div className="px-6 space-y-3 max-w-screen-2xl mx-auto">
        <ViewItemProvider initialView={!isValidViews ? "grid" : viewParam}>
          <ChannelInfo channelId={_params.cid} />
          {children}
        </ViewItemProvider>
      </div>
    </ChannelStoreProvider>
  )
}
