"use client"

import { createContext, useContext, useState } from "react"
import { isEmpty, noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"

type OptionsContextType = MapUseStateSetters<{
  options: Record<string, never>
}>

const OptionsContext = createContext<OptionsContextType>({
  options: {},
  setOptions: noop,
})

export function OptionsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [options, setOptions] = useState({})

  return (
    <OptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </OptionsContext.Provider>
  )
}

export const useOptionsContext = () => {
  const context = useContext(OptionsContext)

  if (isEmpty(context.options)) {
    throw new Error("useOptionsContext must be used within a OptionsContext")
  }

  return context
}
