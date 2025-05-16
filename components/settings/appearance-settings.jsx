import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function AppearanceSettings() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium">Appearance</h3>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Theme</Label>
        <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-2">
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <RadioGroupItem value="light" id="theme-light" />
            <Label htmlFor="theme-light" className="text-sm">
              Light
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <RadioGroupItem value="dark" id="theme-dark" />
            <Label htmlFor="theme-dark" className="text-sm">
              Dark
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <RadioGroupItem value="system" id="theme-system" />
            <Label htmlFor="theme-system" className="text-sm">
              System
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className="my-2" />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="animations" className="text-sm">
            Animations
          </Label>
          <Switch id="animations" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="compact-mode" className="text-sm">
            Compact Mode
          </Label>
          <Switch id="compact-mode" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="large-text" className="text-sm">
            Large Text
          </Label>
          <Switch id="large-text" />
        </div>
      </div>

      <Separator className="my-2" />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Layout</Label>
        <RadioGroup defaultValue="default" className="grid grid-cols-3 gap-2">
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <RadioGroupItem value="default" id="layout-default" />
            <Label htmlFor="layout-default" className="text-sm">
              Default
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <RadioGroupItem value="compact" id="layout-compact" />
            <Label htmlFor="layout-compact" className="text-sm">
              Compact
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2">
            <RadioGroupItem value="expanded" id="layout-expanded" />
            <Label htmlFor="layout-expanded" className="text-sm">
              Expanded
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="pt-2">
        <Button size="sm" className="w-full">
          Save
        </Button>
      </div>
    </div>
  )
}
