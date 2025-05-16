import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CreateGoalPage() {
	// Mock data for wallets
	const wallets = [
		{ id: "w1", name: "Main Savings" },
		{ id: "w2", name: "Emergency Fund" },
		{ id: "w3", name: "Travel Budget" },
	]

	return (
		<Layout>
			<div>

				<div className="mx-auto max-w-2xl">
					<div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
						<Button variant="outline" size="icon" asChild>
							<Link href="/goals">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Link>
						</Button>
						<h1 className="text-xl sm:text-2xl font-semibold">Create New Goal</h1>
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Goal Information</CardTitle>
							<CardDescription>Set up your new financial goal.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="goal-name">Goal Name</Label>
								<Input id="goal-name" placeholder="e.g. New Car, Vacation Fund" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="category">Category</Label>
								<Select>
									<SelectTrigger id="category">
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="savings">Savings</SelectItem>
										<SelectItem value="emergency">Emergency Fund</SelectItem>
										<SelectItem value="retirement">Retirement</SelectItem>
										<SelectItem value="major-purchase">Major Purchase</SelectItem>
										<SelectItem value="travel">Travel</SelectItem>
										<SelectItem value="education">Education</SelectItem>
										<SelectItem value="event">Event</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="target-amount">Target Amount</Label>
									<div className="relative">
										<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
										<Input id="target-amount" type="number" min="0" step="0.01" placeholder="0.00" className="pl-8" />
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="current-amount">Current Amount (Optional)</Label>
									<div className="relative">
										<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
										<Input id="current-amount" type="number" min="0" step="0.01" placeholder="0.00" className="pl-8" />
									</div>
									<p className="text-xs text-muted-foreground">
										If you've already saved some amount towards this goal.
									</p>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="target-date">Target Date</Label>
								<Input id="target-date" type="date" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="wallet">Associated Wallet</Label>
								<Select>
									<SelectTrigger id="wallet">
										<SelectValue placeholder="Select wallet" />
									</SelectTrigger>
									<SelectContent>
										{wallets.map((wallet) => (
											<SelectItem key={wallet.id} value={wallet.id}>
												{wallet.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<p className="text-xs text-muted-foreground">The wallet where funds for this goal will be stored.</p>
							</div>

							<div className="space-y-2">
								<Label>Priority</Label>
								<RadioGroup defaultValue="medium" className="flex space-x-4">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="high" id="priority-high" />
										<Label htmlFor="priority-high" className="text-red-500">
											High
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="medium" id="priority-medium" />
										<Label htmlFor="priority-medium" className="text-yellow-500">
											Medium
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="low" id="priority-low" />
										<Label htmlFor="priority-low" className="text-green-500">
											Low
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label htmlFor="notes">Notes (Optional)</Label>
								<Textarea id="notes" placeholder="Add any additional details about this goal" />
							</div>
						</CardContent>
						<CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
							<Button variant="outline" asChild className="w-full sm:w-auto">
								<Link href="/goals">Cancel</Link>
							</Button>
							<Button className="w-full sm:w-auto mt-2 sm:mt-0">Create Goal</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</Layout>
	)
}
