import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account security and authentication methods.</p>
      </div>
      <Separator />
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Change Password</h4>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="w-full sm:w-auto">Update Password</Button>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
            <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
          </div>
          <Switch id="2fa" />
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Login Sessions</h4>
        <div className="rounded-md border">
          <div className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">Current Session</div>
              <div className="text-sm text-muted-foreground">Windows • Chrome • New York, USA</div>
              <div className="text-xs text-muted-foreground mt-1">Started: Today, 10:30 AM</div>
            </div>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</div>
          </div>
          <Separator />
          <div className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">Mobile App</div>
              <div className="text-sm text-muted-foreground">iOS • iPhone • New York, USA</div>
              <div className="text-xs text-muted-foreground mt-1">Last active: Yesterday, 8:15 PM</div>
            </div>
            <Button variant="outline" size="sm">
              Revoke
            </Button>
          </div>
        </div>
        <Button variant="outline">Sign Out All Devices</Button>
      </div>
    </div>
  )
}
