"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function AddMoneyPage() {
	// Mock data for recent deposits
	const depositHistory = [
		{ date: "Jan", amount: 500 },
		{ date: "Feb", amount: 750 },
		{ date: "Mar", amount: 600 },
		{ date: "Apr", amount: 800 },
		{ date: "May", amount: 950 },
		{ date: "Jun", amount: 700 },
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
					<h1 className="text-xl sm:text-2xl font-semibold">Add Money</h1>
				</div>

				<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Add Funds</CardTitle>
							<CardDescription>Add money to your selected wallet.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="wallet">Select Wallet</Label>
								<Select>
									<SelectTrigger id="wallet">
										<SelectValue placeholder="Select wallet" />
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
								<Label htmlFor="method">Payment Method</Label>
								<Select>
									<SelectTrigger id="method">
										<SelectValue placeholder="Select payment method" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="bank">Bank Transfer</SelectItem>
										<SelectItem value="card">Credit/Debit Card</SelectItem>
										<SelectItem value="paypal">PayPal</SelectItem>
										<SelectItem value="crypto">Cryptocurrency</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="notes">Notes (Optional)</Label>
								<Input id="notes" placeholder="Add a note for this transaction" />
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" asChild>
								<Link href="/">Cancel</Link>
							</Button>
							<Button>Add Funds</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Deposit History</CardTitle>
							<CardDescription>Your recent deposits over time</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[250px] sm:h-[300px] w-full">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={depositHistory}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 5,
										}}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="date" />
										<YAxis tickFormatter={(value) => `${value}`} />
										<Tooltip
											formatter={(value) => [`${value}`, "Amount"]}
											labelFormatter={(label) => `Month: ${label}`}
										/>
										<Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
							<div className="mt-4 text-center text-xs sm:text-sm text-muted-foreground">
								<p>
									Average deposit: $
									{(depositHistory.reduce((sum, item) => sum + item.amount, 0) / depositHistory.length).toFixed(2)}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</Layout>
	)
}
