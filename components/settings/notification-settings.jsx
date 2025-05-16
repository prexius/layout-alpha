import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">Configure how and when you receive notifications.</p>
      </div>
      <Separator />
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Email Notifications</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-transactions" className="flex flex-col space-y-1">
              <span>Transaction Alerts</span>
              <span className="font-normal text-xs text-muted-foreground">
                Receive emails for deposits, withdrawals, and transfers.
              </span>
            </Label>
            <Switch id="email-transactions" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-bills" className="flex flex-col space-y-1">
              <span>Bill Reminders</span>
              <span className="font-normal text-xs text-muted-foreground">
                Get notified when bills are due or have been paid.
              </span>
            </Label>
            <Switch id="email-bills" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-budgets" className="flex flex-col space-y-1">
              <span>Budget Alerts</span>
              <span className="font-normal text-xs text-muted-foreground">
                Receive alerts when you're approaching budget limits.
              </span>
            </Label>
            <Switch id="email-budgets" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-marketing" className="flex flex-col space-y-1">
              <span>Marketing & Promotions</span>
              <span className="font-normal text-xs text-muted-foreground">
                Receive updates about new features and special offers.
              </span>
            </Label>
            <Switch id="email-marketing" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Push Notifications</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="push-transactions" className="flex flex-col space-y-1">
              <span>Transaction Alerts</span>
              <span className="font-normal text-xs text-muted-foreground">
                Receive push notifications for account activity.
              </span>
            </Label>
            <Switch id="push-transactions" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-bills" className="flex flex-col space-y-1">
              <span>Bill Reminders</span>
              <span className="font-normal text-xs text-muted-foreground">Get notified when bills are due.</span>
            </Label>
            <Switch id="push-bills" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-budgets" className="flex flex-col space-y-1">
              <span>Budget Alerts</span>
              <span className="font-normal text-xs text-muted-foreground">Receive alerts for budget thresholds.</span>
            </Label>
            <Switch id="push-budgets" defaultChecked />
          </div>
        </div>
      </div>
      <Separator />
      <Button>Save Preferences</Button>
    </div>
  )
}
