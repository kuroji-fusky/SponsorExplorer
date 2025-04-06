"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { MapUseStateSetters } from "./context.types"

type SubmissionContextType = MapUseStateSetters<{
  UUIDInputs: string[]
  UUIDCache: unknown[]
}>

const SubmissionContext = createContext<SubmissionContextType>(null)

export const useSubmissionContext = () => {
  const context = useContext(SubmissionContext)

  if (!context) {
    throw new Error(
      "useSubmissionContext must be used within a SubmissionProvider",
    )
  }

  return context
}

export function SubmissionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [UUIDInputs, setUUIDInputs] = useState<
    NonNullable<SubmissionContextType>["UUIDInputs"]
  >([])
  const [UUIDCache, setUUIDCache] = useState<
    NonNullable<SubmissionContextType>["UUIDCache"]
  >([])

  useEffect(() => {
    // todo: pull UUIDCache from server first
    // return () => {}
  }, [])

  return (
    <SubmissionContext.Provider
      value={{
        UUIDInputs,
        UUIDCache,
        setUUIDInputs,
        setUUIDCache,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  )
}
