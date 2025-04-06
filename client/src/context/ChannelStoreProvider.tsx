"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"
import type { GetAPIResponseType, InlineSegments } from "@/types"
import type { GET as _YTChannelRes } from "@/app/api/yt/channel/route"

type YTChannelResponse = GetAPIResponseType<typeof _YTChannelRes>
type ChannelStoreContextType = MapUseStateSetters<
  {
    videos: YTChannelResponse["videos"]
    channel: YTChannelResponse["channel"] | null
    sbSegments:
      | { id: string; data: InlineSegments["relativeSegments"] }[]
      | never[]
  },
  "channel"
>

const ChannelStoreContext = createContext<ChannelStoreContextType>({
  videos: [],
  channel: null,
  sbSegments: [],
  setVideos: noop,
  setSbSegments: noop,
})

export function ChannelStoreProvider({
  children,
  channelData,
  initialVideoStore,
}: Readonly<{
  children: React.ReactNode
  channelData: NonNullable<ChannelStoreContextType>["channel"]
  initialVideoStore: NonNullable<ChannelStoreContextType>["videos"]
}>) {
  // eslint-disable-next-line no-unused-vars
  const [internal_Videos, setVideos] = useState<typeof initialVideoStore>([])
  const [internal_sbSegments, setSbSegments] = useState<
    NonNullable<ChannelStoreContextType>["sbSegments"]
  >([])

  useEffect(() => {
    if (initialVideoStore) setVideos(initialVideoStore)
  }, [initialVideoStore])

  return (
    <ChannelStoreContext.Provider
      value={{
        videos: initialVideoStore,
        setVideos,
        channel: channelData,
        sbSegments: internal_sbSegments,
        setSbSegments,
      }}
    >
      {children}
    </ChannelStoreContext.Provider>
  )
}

export const useChannelStoreProvider = () => {
  const context = useContext(ChannelStoreContext)

  if (!context) {
    throw new Error(
      "useChannelStoreProvider must be used within a ChannelStoreProvider",
    )
  }

  return context
}
