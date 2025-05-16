"use client"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export default function SendMoneyPage() {
	// Mock data for send money distribution
	const sendDistribution = [
		{ name: "Jane Smith", value: 450 },
		{ name: "Michael Johnson", value: 300 },
		{ name: "Sarah Williams", value: 200 },
		{ name: "Others", value: 350 },
	]

	const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"]

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
					<h1 className="text-xl sm:text-2xl font-semibold">Send Money</h1>
				</div>

				<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Send Money</CardTitle>
							<CardDescription>Transfer funds to another person or account.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Tabs defaultValue="contact" className="w-full">
								<TabsList className="grid w-full grid-cols-2">
									<TabsTrigger value="contact">To Contact</TabsTrigger>
									<TabsTrigger value="account">To Account</TabsTrigger>
								</TabsList>
								<TabsContent value="contact" className="space-y-4 mt-4">
									<div className="space-y-2">
										<Label htmlFor="contact">Select Contact</Label>
										<Select>
											<SelectTrigger id="contact">
												<SelectValue placeholder="Select a contact" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="contact1">Jane Smith</SelectItem>
												<SelectItem value="contact2">Michael Johnson</SelectItem>
												<SelectItem value="contact3">Sarah Williams</SelectItem>
												<SelectItem value="new">+ Add New Contact</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</TabsContent>
								<TabsContent value="account" className="space-y-4 mt-4">
									<div className="space-y-2">
										<Label htmlFor="account-number">Account Number</Label>
										<Input id="account-number" placeholder="Enter account number" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="routing-number">Routing Number</Label>
										<Input id="routing-number" placeholder="Enter routing number" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="account-name">Account Holder Name</Label>
										<Input id="account-name" placeholder="Enter account holder name" />
									</div>
								</TabsContent>
							</Tabs>

							<div className="space-y-2">
								<Label htmlFor="from-wallet">From Wallet</Label>
								<Select>
									<SelectTrigger id="from-wallet">
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
								<Label htmlFor="notes">Message (Optional)</Label>
								<Input id="notes" placeholder="Add a message for the recipient" />
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" asChild>
								<Link href="/">Cancel</Link>
							</Button>
							<Button>Send Money</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Recent Recipients</CardTitle>
							<CardDescription>Your money transfer distribution</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[250px] sm:h-[300px] w-full">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={sendDistribution}
											cx="50%"
											cy="50%"
											labelLine={false}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value"
											label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
										>
											{sendDistribution.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Tooltip formatter={(value) => [`$${value}`, "Amount Sent"]} />
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							</div>
							<div className="mt-4 text-center text-xs sm:text-sm text-muted-foreground">
								<p>Total sent: ${sendDistribution.reduce((sum, item) => sum + item.value, 0)}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</Layout>
	)
}
