"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"

type ChannelStoreContextType = MapUseStateSetters<
  {
    videos: unknown[] | never[]
    channel: unknown
  },
  "channel"
>

const ChannelStoreContext = createContext<ChannelStoreContextType>({
  videos: [],
  channel: [],
  setVideos: noop,
})

export function ChannelStoreProvider({
  children,
  channelData,
  initialVideoStore,
}: Readonly<{
  children: React.ReactNode
  channelData: ChannelStoreContextType["channel"]
  initialVideoStore: ChannelStoreContextType["videos"]
}>) {
  const [internal_Videos, setVideos] = useState<typeof initialVideoStore>([])

  useEffect(() => {
    if (initialVideoStore) {
      setVideos(initialVideoStore)
    }
  }, [initialVideoStore])

  return (
    <ChannelStoreContext.Provider
      value={{ videos: initialVideoStore, setVideos, channel: channelData }}
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
