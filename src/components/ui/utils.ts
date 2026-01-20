import React from "react"
import type { UseColorModeReturn } from "./color-mode"
export const ColorModeContext = React.createContext<UseColorModeReturn | undefined>(undefined)
export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

export function useColorMode(): UseColorModeReturn {
  const context = React.useContext(ColorModeContext)
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider")
  }
  return context
}