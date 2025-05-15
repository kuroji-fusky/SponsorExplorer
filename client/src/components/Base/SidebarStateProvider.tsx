"use client"

import type { MapUseStateSetters } from "@/context/context.types"
import { createContext, useContext, useState } from "react"

type SidebarStateContextType = MapUseStateSetters<{
  isSidebarOpen: boolean
}>

const SidebarStateContext = createContext<SidebarStateContextType>(null)

export function SidebarStateProvider(props: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <SidebarStateContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {props.children}
    </SidebarStateContext.Provider>
  )
}

export const useSidebarContext = () => {
  const ctx = useContext(SidebarStateContext)

  if (!ctx) {
    throw new Error(
      "useSubmissionContext must be used within a SubmissionProvider",
    )
  }

  return ctx
}
