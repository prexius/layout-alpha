"use client"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function TransferPage() {
	// Mock data for transfer history
	const transferHistory = [
		{ date: "1/15", "Main Savings": 500, "Emergency Fund": -500, "Travel Budget": 0 },
		{ date: "2/1", "Main Savings": 300, "Emergency Fund": 0, "Travel Budget": -300 },
		{ date: "2/15", "Main Savings": 400, "Emergency Fund": -400, "Travel Budget": 0 },
		{ date: "3/1", "Main Savings": 0, "Emergency Fund": 200, "Travel Budget": -200 },
		{ date: "3/15", "Main Savings": -600, "Emergency Fund": 600, "Travel Budget": 0 },
		{ date: "4/1", "Main Savings": -300, "Emergency Fund": 0, "Travel Budget": 300 },
	]

	return (
		<Layout>
			<div>
				<div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
					<Button variant="outline" size="icon" asChild>
						<Link href="/">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Link>
					</Button>
					<h1 className="text-xl sm:text-2xl font-semibold">Transfer Funds</h1>
				</div>

				<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Transfer Between Wallets</CardTitle>
							<CardDescription>Move money between your wallets.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="from-wallet">From Wallet</Label>
								<Select>
									<SelectTrigger id="from-wallet">
										<SelectValue placeholder="Select source wallet" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="w1">Main Savings</SelectItem>
										<SelectItem value="w2">Emergency Fund</SelectItem>
										<SelectItem value="w3">Travel Budget</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex justify-center my-4">
								<div className="rounded-full bg-muted p-2">
									<ArrowRight className="h-6 w-6" />
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="to-wallet">To Wallet</Label>
								<Select>
									<SelectTrigger id="to-wallet">
										<SelectValue placeholder="Select destination wallet" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="w1">Main Savings</SelectItem>
										<SelectItem value="w2">Emergency Fund</SelectItem>
										<SelectItem value="w3">Travel Budget</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="amount">Amount</Label>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
									<Input id="amount" type="number" min="0" step="0.01" placeholder="0.00" className="pl-8" />
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="transfer-date">Transfer Date</Label>
								<Input id="transfer-date" type="date" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="notes">Notes (Optional)</Label>
								<Input id="notes" placeholder="Add a note for this transfer" />
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" asChild>
								<Link href="/">Cancel</Link>
							</Button>
							<Button>Transfer Funds</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Transfer History</CardTitle>
							<CardDescription>Recent transfers between your wallets</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[250px] sm:h-[300px] w-full">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
										data={transferHistory}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="date" />
										<YAxis />
										<Tooltip
											formatter={(value) => [`$${value}`, "Amount"]}
											labelFormatter={(label) => `Date: ${label}`}
										/>
										<Legend />
										<Line type="monotone" dataKey="Main Savings" stroke="#6366f1" activeDot={{ r: 8 }} />
										<Line type="monotone" dataKey="Emergency Fund" stroke="#8b5cf6" />
										<Line type="monotone" dataKey="Travel Budget" stroke="#ec4899" />
									</LineChart>
								</ResponsiveContainer>
							</div>
							<div className="mt-4 text-center text-xs sm:text-sm text-muted-foreground">
								<p>Positive values indicate money received, negative values indicate money sent</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</Layout>
	)
}
