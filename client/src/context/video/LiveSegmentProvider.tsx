"use client"

import { noop } from "lodash-es"
import { createContext, useContext, useState } from "react"
import type { MapUseStateSetters } from "../context.types"

type LiveSegmentContextType = MapUseStateSetters<{
  hasLiveUpdates: boolean
  hasShiftHold: boolean
}>

const LiveSegmentContext = createContext<LiveSegmentContextType>({
  hasLiveUpdates: false,
  setHasLiveUpdates: noop,
  hasShiftHold: false,
  setHasShiftHold: noop,
})

export function LiveSegmentProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [hasLiveUpdates, setHasLiveUpdates] = useState(false)
  const [hasShiftHold, setHasShiftHold] = useState(false)

  return (
    <LiveSegmentContext.Provider
      value={{
        hasLiveUpdates,
        setHasLiveUpdates,
        hasShiftHold,
        setHasShiftHold,
      }}
    >
      {children}
    </LiveSegmentContext.Provider>
  )
}

export const useLiveSegmentContext = () => {
  const context = useContext(LiveSegmentContext)

  if (!context) {
    throw new Error(
      "useLiveSegmentContext must be used within a LiveSegmentProvider",
    )
  }

  return context
}
