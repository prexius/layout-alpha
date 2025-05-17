"use client"

import { useTheme, useThemeContext } from "@/components/theme/theme-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Monitor, Moon, PanelLeft, PanelTop, RotateCcw, Settings, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import defaultConfig from "./default-config"

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

export function ThemeConfig() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { layout, setLayout, direction, setDirection } = useThemeContext()
  const [open, setOpen] = useState(false)
  const [primaryColor, setPrimaryColor] = useState(defaultConfig.colors.defaultPrimaryColor)
  const [mounted, setMounted] = useState(false)

  // Handle theme change
  const handleThemeChange = (value) => {
    setTheme(value)
  }

  // Handle layout change
  const handleLayoutChange = (value) => {
    setLayout(value)
  }

  // Handle direction change
  const handleDirectionChange = (value) => {
    setDirection(value)
  }

  // Handle primary color change
  const handleColorChange = (color) => {
    // Validate color against available options
    const isValidColor = defaultConfig.colors.availableColors.some((c) => c.name === color)
    const validColor = isValidColor ? color : defaultConfig.colors.defaultPrimaryColor

    setPrimaryColor(validColor)
    safeSetItem("primaryColor", validColor)

    // Find the color object from the config
    const colorObj = defaultConfig.colors.availableColors.find((c) => c.name === validColor)

    if (colorObj) {
      // Update CSS variables based on the selected color
      document.documentElement.style.setProperty("--primary", colorObj.value)
      document.documentElement.style.setProperty("--primary-foreground", colorObj.foreground)
    }
  }

  // Reset all settings to defaults
  const resetToDefaults = () => {
    setTheme(defaultConfig.themeOptions.defaultTheme)
    setLayout(defaultConfig.defaultLayout)
    setDirection(defaultConfig.defaultDirection)
    handleColorChange(defaultConfig.colors.defaultPrimaryColor)

    // Clear localStorage
    try {
      localStorage.removeItem("primaryColor")
      localStorage.removeItem("layout")
      localStorage.removeItem("direction")
      // Note: theme is handled by next-themes
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  }

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load saved primary color on component mount
  useEffect(() => {
    if (mounted) {
      const savedColor = safeGetItem("primaryColor", defaultConfig.colors.defaultPrimaryColor)

      // Validate color against available options
      const isValidColor = defaultConfig.colors.availableColors.some((c) => c.name === savedColor)
      const validColor = isValidColor ? savedColor : defaultConfig.colors.defaultPrimaryColor

      setPrimaryColor(validColor)

      // Find the color object from the config
      const colorObj = defaultConfig.colors.availableColors.find((c) => c.name === validColor)

      if (colorObj) {
        // Update CSS variables based on the selected color
        document.documentElement.style.setProperty("--primary", colorObj.value)
        document.documentElement.style.setProperty("--primary-foreground", colorObj.foreground)
      }
    }
  }, [mounted])

  // If not mounted yet, return null to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground">
        <Settings className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </Button>
    )
  }

  // Get the current color object
  const currentColorObj =
    defaultConfig.colors.availableColors.find((c) => c.name === primaryColor) ||
    defaultConfig.colors.availableColors.find((c) => c.name === defaultConfig.colors.defaultPrimaryColor)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground relative">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
          <span
            className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: currentColorObj?.value || "#11B989" }}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-4">
        <DialogHeader>
          <DialogTitle className="text-base">Appearance</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Theme Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Theme</Label>
            <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex gap-2">
              <Label
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer border text-sm",
                  theme === "light" && "border-primary bg-background",
                )}
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Sun className="h-4 w-4" />
                Light
              </Label>

              <Label
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer border text-sm",
                  theme === "dark" && "border-primary bg-background",
                )}
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Moon className="h-4 w-4" />
                Dark
              </Label>

              {defaultConfig.themeOptions.enableSystem && (
                <Label
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer border text-sm",
                    theme === "system" && "border-primary bg-background",
                  )}
                >
                  <RadioGroupItem value="system" id="system" className="sr-only" />
                  <Monitor className="h-4 w-4" />
                  System
                </Label>
              )}
            </RadioGroup>
          </div>

          {/* Primary Color Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Primary Color</Label>
            <div className="flex flex-wrap items-center gap-2">
              {defaultConfig.colors.availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color.name)}
                  style={{ backgroundColor: color.value }}
                  className={cn(
                    "w-8 h-8 rounded-full border-2",
                    primaryColor === color.name ? "border-black dark:border-white" : "border-transparent",
                  )}
                  aria-label={`${color.name} theme color`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Layout Selection */}
          {defaultConfig.availableLayouts.length > 1 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Layout</Label>
              <RadioGroup value={layout} onValueChange={handleLayoutChange} className="flex gap-2">
                {defaultConfig.availableLayouts.includes("vertical") && (
                  <Label
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer border text-sm",
                      layout === "vertical" && "border-primary bg-background",
                    )}
                  >
                    <RadioGroupItem value="vertical" id="vertical" className="sr-only" />
                    <PanelLeft className="h-4 w-4" />
                    Sidebar
                  </Label>
                )}

                {defaultConfig.availableLayouts.includes("horizontal") && (
                  <Label
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer border text-sm",
                      layout === "horizontal" && "border-primary bg-background",
                    )}
                  >
                    <RadioGroupItem value="horizontal" id="horizontal" className="sr-only" />
                    <PanelTop className="h-4 w-4" />
                    Horizontal
                  </Label>
                )}
              </RadioGroup>
            </div>
          )}

          {/* Direction Selection */}
          {defaultConfig.availableDirections.length > 1 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Direction</Label>
              <RadioGroup value={direction} onValueChange={handleDirectionChange} className="flex gap-2">
                {defaultConfig.availableDirections.includes("ltr") && (
                  <Label
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer border text-sm",
                      direction === "ltr" && "border-primary bg-background",
                    )}
                  >
                    <RadioGroupItem value="ltr" id="ltr" className="sr-only" />
                    <ArrowRight className="h-4 w-4" />
                    LTR
                  </Label>
                )}

                {defaultConfig.availableDirections.includes("rtl") && (
                  <Label
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer border text-sm",
                      direction === "rtl" && "border-primary bg-background",
                    )}
                  >
                    <RadioGroupItem value="rtl" id="rtl" className="sr-only" />
                    <ArrowLeft className="h-4 w-4" />
                    RTL
                  </Label>
                )}
              </RadioGroup>
            </div>
          )}

          {/* Reset to Defaults Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
            className="w-full flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to Defaults
          </Button>
        </div>

        <DialogFooter>
          <Button size="sm" onClick={() => setOpen(false)} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
