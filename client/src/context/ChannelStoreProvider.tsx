"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"
import type { InlineSegments } from "@/types"

type ChannelStoreContextType = MapUseStateSetters<
  {
    videos: unknown[] | never[]
    channel: unknown
    sbSegments:
      | { id: string; data: InlineSegments["relativeSegments"] }[]
      | never[]
  },
  "channel"
>

const ChannelStoreContext = createContext<ChannelStoreContextType>({
  videos: [],
  channel: [],
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
  const [internal_Videos, setVideos] = useState<typeof initialVideoStore>([])
  const [internal_sbSegments, setSbSegments] = useState<NonNullable<ChannelStoreContextType>["sbSegments"]>([])

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
