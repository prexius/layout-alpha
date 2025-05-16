import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield } from "lucide-react"

export function SocialSecurityTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Social Security Card Verification</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Verify your identity by providing your Social Security information.
        </p>
      </div>

      <Separator />

      <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-400">Security Notice</h3>
            <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
              Your Social Security information is encrypted and securely stored. We use this information only for
              identity verification purposes and comply with all relevant privacy regulations.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="ssn">Social Security Number</Label>
          <Input id="ssn" type="password" placeholder="XXX-XX-XXXX" />
          <p className="text-xs text-muted-foreground">Enter your 9-digit Social Security Number (SSN).</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="full-name">Full Legal Name</Label>
          <Input id="full-name" placeholder="As it appears on your Social Security Card" />
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">Verification Status</h3>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
          >
            Pending
          </Badge>
          <span className="text-sm text-muted-foreground">
            Your Social Security Card verification is not yet complete.
          </span>
        </div>
      </div>

      <Button>Verify Identity</Button>
    </div>
  )
}
