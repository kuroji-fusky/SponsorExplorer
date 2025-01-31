"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"

type ChannelStoreContextType = MapUseStateSetters<{
  videos: unknown[] | never[]
}>

const ChannelStoreContext = createContext<ChannelStoreContextType>({
  videos: [],
  setVideos: noop,
})

export function ChannelStoreProvider({
  children,
  initialVideoStore,
}: Readonly<{
  children: React.ReactNode
  initialVideoStore: ChannelStoreContextType["videos"]
}>) {
  const [videos, setVideos] = useState<typeof initialVideoStore>([])

  return (
    <ChannelStoreContext.Provider value={{ videos, setVideos }}>
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
