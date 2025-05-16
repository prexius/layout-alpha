"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft } from 'lucide-react'
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"

// Fix the dynamic import to correctly handle the default export
const BillChart = dynamic(() =>
	import("@/components/bills/bill-chart").then(mod => mod.BillChart),
	{ ssr: false }
)

export default function PayBillsPage() {
	const [isMobile, setIsMobile] = useState(false)

	// Check if screen is mobile size (iPhone SE is 375px)
	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= 640)
		}

		// Initial check
		checkIsMobile()

		// Add event listener
		window.addEventListener("resize", checkIsMobile)

		// Cleanup
		return () => window.removeEventListener("resize", checkIsMobile)
	}, [])

	// Format date for display
	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: isMobile ? "2-digit" : "numeric",
		})
	}

	// Mock data for bills
	const bills = [
		{ id: "b1", name: "Electric Bill", amount: 124.75, dueDate: "2023-04-25", payee: "Electric Company" },
		{ id: "b2", name: "Water Bill", amount: 45.5, dueDate: "2023-04-28", payee: "Water Services" },
		{ id: "b3", name: "Internet", amount: 79.99, dueDate: "2023-05-01", payee: "Internet Provider" },
		{ id: "b4", name: "Rent", amount: 1200.0, dueDate: "2023-05-01", payee: "Property Management" },
		{ id: "b5", name: "Phone", amount: 65.0, dueDate: "2023-05-05", payee: "Mobile Carrier" },
	]

	// Mock data for bill payment history
	const billHistory = [
		{ month: "Jan", Utilities: 220, Housing: 1200, Communication: 145 },
		{ month: "Feb", Utilities: 240, Housing: 1200, Communication: 145 },
		{ month: "Mar", Utilities: 280, Housing: 1200, Communication: 150 },
		{ month: "Apr", Utilities: 250, Housing: 1200, Communication: 145 },
		{ month: "May", Utilities: 170, Housing: 1200, Communication: 145 },
		{ month: "Jun", Utilities: 190, Housing: 1200, Communication: 145 },
	]

	// Calculate average monthly bill payments
	const averageMonthlyPayment = (
		billHistory.reduce((sum, item) => sum + item.Utilities + item.Housing + item.Communication, 0) /
		billHistory.length
	).toFixed(2)

	return (
		<Layout>
			<div className="px-2 sm:px-0">
				<div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-4">
					<Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" asChild>
						<Link href="/bills">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Link>
					</Button>
					<h1 className="text-lg sm:text-2xl font-semibold">Pay Bills</h1>
				</div>

				<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
					<Card className="border-border/40">
						<CardHeader className="pb-3 sm:pb-6 p-4 sm:p-6">
							<CardTitle className="text-base sm:text-lg">Pay a Bill</CardTitle>
							<CardDescription className="text-xs sm:text-sm">
								Select a bill to pay or add a new payee.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
							<div className="space-y-1.5 sm:space-y-2">
								<Label htmlFor="bill" className="text-xs sm:text-sm">
									Select Bill
								</Label>
								<Select>
									<SelectTrigger id="bill" className="h-8 sm:h-10 text-xs sm:text-sm">
										<SelectValue placeholder="Select a bill to pay" />
									</SelectTrigger>
									<SelectContent>
										{bills.map((bill) => (
											<SelectItem key={bill.id} value={bill.id} className="text-xs sm:text-sm">
												{isMobile ? (
													<>
														{bill.name} - ${bill.amount}
													</>
												) : (
													<>
														{bill.name} - ${bill.amount} (Due: {formatDate(bill.dueDate)})
													</>
												)}
											</SelectItem>
										))}
										<SelectItem value="new" className="text-xs sm:text-sm">
											+ Add New Payee
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-1.5 sm:space-y-2">
								<Label htmlFor="from-wallet" className="text-xs sm:text-sm">
									From Wallet
								</Label>
								<Select>
									<SelectTrigger id="from-wallet" className="h-8 sm:h-10 text-xs sm:text-sm">
										<SelectValue placeholder="Select wallet" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="w1" className="text-xs sm:text-sm">
											Main Savings
										</SelectItem>
										<SelectItem value="w2" className="text-xs sm:text-sm">
											Emergency Fund
										</SelectItem>
										<SelectItem value="w3" className="text-xs sm:text-sm">
											Travel Budget
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-1.5 sm:space-y-2">
								<Label htmlFor="amount" className="text-xs sm:text-sm">
									Amount
								</Label>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
									<Input
										id="amount"
										type="number"
										min="0"
										step="0.01"
										placeholder="0.00"
										className="pl-8 h-8 sm:h-10 text-xs sm:text-sm"
									/>
								</div>
							</div>

							<div className="space-y-1.5 sm:space-y-2">
								<Label htmlFor="payment-date" className="text-xs sm:text-sm">
									Payment Date
								</Label>
								<Input
									id="payment-date"
									type="date"
									className="h-8 sm:h-10 text-xs sm:text-sm"
								/>
							</div>

							<div className="space-y-1.5 sm:space-y-2">
								<Label htmlFor="notes" className="text-xs sm:text-sm">
									Memo (Optional)
								</Label>
								<Input
									id="notes"
									placeholder="Add a memo for this payment"
									className="h-8 sm:h-10 text-xs sm:text-sm"
								/>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between p-4 sm:p-6 pt-2 sm:pt-4">
							<Button
								variant="outline"
								asChild
								className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm"
							>
								<Link href="/bills">Cancel</Link>
							</Button>
							<Button className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm">
								Pay Bill
							</Button>
						</CardFooter>
					</Card>

					<Card className="border-border/40">
						<CardHeader className="pb-3 sm:pb-6 p-4 sm:p-6">
							<CardTitle className="text-base sm:text-lg">Bill Payment History</CardTitle>
							<CardDescription className="text-xs sm:text-sm">
								Your bill payments over the last {isMobile ? "6 mo" : "6 months"}
							</CardDescription>
						</CardHeader>
						<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
							<div className="h-[200px] sm:h-[300px] w-full">
								<BillChart data={billHistory} />
							</div>
							<div className="mt-3 sm:mt-4 text-center text-[10px] sm:text-sm text-muted-foreground">
								<p>
									Average monthly bill payments: ${averageMonthlyPayment}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</Layout>
	)
}