import type { IconButtonProps } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import * as React from "react"
import { FiMoon, FiSun } from "react-icons/fi"
import { ColorModeContext, useColorMode } from "./utils"

export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}


export interface ColorModeProviderProps {
  children: React.ReactNode
  defaultValue?: ColorMode
}

export function ColorModeProvider({ children, defaultValue = "light" }: ColorModeProviderProps) {
  const [colorMode, setColorModeState] = React.useState<ColorMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chakra-ui-color-mode")
      if (stored && (stored === "light" || stored === "dark")) {
        return stored
      }
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
      }
    }
    return defaultValue
  })

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(colorMode)
    localStorage.setItem("chakra-ui-color-mode", colorMode)
  }, [colorMode])

  const setColorMode = React.useCallback((mode: ColorMode) => {
    setColorModeState(mode)
  }, [])

  const toggleColorMode = React.useCallback(() => {
    setColorModeState(prev => prev === "light" ? "dark" : "light")
  }, [])

  const value = React.useMemo(() => ({
    colorMode,
    setColorMode,
    toggleColorMode,
  }), [colorMode, setColorMode, toggleColorMode])

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  )
}


export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <FiMoon /> : <FiSun />
}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "aria-label">
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      {...props}
      css={{
        "& svg": {
          width: "1.25rem",
          height: "1.25rem",
        },
      }}
    >
      <ColorModeIcon />
    </IconButton>
  )
})
