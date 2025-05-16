import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function AddWalletPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-2xl  py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
				<div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
					<Button variant="outline" size="icon" asChild>
						<Link href="/wallets">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Link>
					</Button>
					<h3 className="text-lg sm:text-xl font-semibold">Add New Wallet</h3>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Create Wallet</CardTitle>
						<CardDescription>Add a new wallet to your account.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Wallet Name</Label>
							<Input id="name" placeholder="e.g. Main Savings, Travel Fund" />
						</div>

						<div className="space-y-2">
							<Label htmlFor="type">Wallet Type</Label>
							<Select>
								<SelectTrigger id="type">
									<SelectValue placeholder="Select wallet type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="savings">Savings</SelectItem>
									<SelectItem value="checking">Checking</SelectItem>
									<SelectItem value="investment">Investment</SelectItem>
									<SelectItem value="budget">Budget</SelectItem>
									<SelectItem value="emergency">Emergency Fund</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="currency">Currency</Label>
							<Select defaultValue="usd">
								<SelectTrigger id="currency">
									<SelectValue placeholder="Select currency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="usd">USD - US Dollar</SelectItem>
									<SelectItem value="eur">EUR - Euro</SelectItem>
									<SelectItem value="gbp">GBP - British Pound</SelectItem>
									<SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
									<SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="initial-balance">Initial Balance</Label>
							<div className="relative">
								<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
								<Input id="initial-balance" type="number" min="0" step="0.01" placeholder="0.00" className="pl-8" />
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description (Optional)</Label>
							<Input id="description" placeholder="Add a description for this wallet" />
						</div>
					</CardContent>
					<CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
						<Button variant="outline" className="w-full sm:w-auto">
							Cancel
						</Button>
						<Button className="w-full sm:w-auto">Create Wallet</Button>
					</CardFooter>
				</Card>
			</div>
		</Layout>
	)
}
