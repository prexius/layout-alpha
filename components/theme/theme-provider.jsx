"use client"

import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import defaultConfig from "./default-config"

// Create the context
const ThemeContext = createContext({
  layout: defaultConfig.defaultLayout,
  setLayout: () => {},
  direction: defaultConfig.defaultDirection,
  setDirection: () => {},
  config: defaultConfig,
})

// Hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext)

// Custom hook that combines theme context with next-themes
export const useTheme = () => {
  const nextTheme = useNextTheme()
  const themeContext = useThemeContext()

  return {
    ...nextTheme,
    ...themeContext,
  }
}

// Helper function to safely get item from localStorage
const safeGetItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key)
    return item !== null ? item : defaultValue
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return defaultValue
  }
}

// Helper function to safely set item in localStorage
const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
    return false
  }
}

export function ThemeProvider({ children }) {
  // Layout and direction state
  const [layout, setLayout] = useState(defaultConfig.defaultLayout)
  const [direction, setDirection] = useState(defaultConfig.defaultDirection)
  const [mounted, setMounted] = useState(false)

  // Initialize state from localStorage or defaultConfig
  useEffect(() => {
    setMounted(true)

    // Load saved preferences from localStorage if available
    const savedLayout = safeGetItem("layout", defaultConfig.defaultLayout)
    const savedDirection = safeGetItem("direction", defaultConfig.defaultDirection)

    // Validate saved values against available options
    const validLayout = defaultConfig.availableLayouts.includes(savedLayout) ? savedLayout : defaultConfig.defaultLayout

    const validDirection = defaultConfig.availableDirections.includes(savedDirection)
      ? savedDirection
      : defaultConfig.defaultDirection

    // Update state with validated values
    setLayout(validLayout)
    setDirection(validDirection)

    // Apply direction to html element
    document.documentElement.dir = validDirection
  }, [])

  // Handle layout change
  const handleLayoutChange = (newLayout) => {
    if (newLayout !== layout && defaultConfig.availableLayouts.includes(newLayout)) {
      setLayout(newLayout)
      safeSetItem("layout", newLayout)
    }
  }

  // Handle direction change
  const handleDirectionChange = (newDirection) => {
    if (newDirection !== direction && defaultConfig.availableDirections.includes(newDirection)) {
      setDirection(newDirection)
      safeSetItem("direction", newDirection)

      // Apply direction to html element
      document.documentElement.dir = newDirection
    }
  }

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      layout,
      setLayout: handleLayoutChange,
      direction,
      setDirection: handleDirectionChange,
      config: defaultConfig,
    }),
    [layout, direction],
  )

  // If not mounted yet, return null to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <NextThemesProvider
        attribute="class"
        defaultTheme={defaultConfig.themeOptions.defaultTheme}
        enableSystem={defaultConfig.themeOptions.enableSystem}
        disableTransitionOnChange={defaultConfig.themeOptions.disableTransitionOnChange}
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}
