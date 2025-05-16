"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Minus, Search } from "lucide-react"
import { useState } from "react"

export function TransactionHistoryCard({ walletId, className }) {
	const [filter, setFilter] = useState("all")
	const [searchTerm, setSearchTerm] = useState("")

	// Mock data for demonstration
	const transactions = [
		{
			id: "t1",
			description: "Grocery Store",
			amount: -84.32,
			date: "Today, 2:34 PM",
			status: "completed",
			category: "Shopping",
		},
		{
			id: "t2",
			description: "Salary Deposit",
			amount: 2750.0,
			date: "Yesterday, 9:15 AM",
			status: "completed",
			category: "Income",
		},
		{
			id: "t3",
			description: "Electric Bill",
			amount: -124.75,
			date: "Apr 15, 2023",
			status: "completed",
			category: "Utilities",
		},
		{
			id: "t4",
			description: "Freelance Payment",
			amount: 350.0,
			date: "Apr 14, 2023",
			status: "completed",
			category: "Income",
		},
		{
			id: "t5",
			description: "Restaurant",
			amount: -65.5,
			date: "Apr 13, 2023",
			status: "completed",
			category: "Food",
		},
		{
			id: "t6",
			description: "Gas Station",
			amount: -45.0,
			date: "Apr 12, 2023",
			status: "completed",
			category: "Transportation",
		},
		{
			id: "t7",
			description: "Online Shopping",
			amount: -129.99,
			date: "Apr 10, 2023",
			status: "completed",
			category: "Shopping",
		},
		{
			id: "t8",
			description: "Dividend Payment",
			amount: 75.25,
			date: "Apr 8, 2023",
			status: "completed",
			category: "Income",
		},
	]

	// Filter transactions based on selected filter and search term
	const filteredTransactions = transactions.filter((transaction) => {
		const matchesFilter =
			filter === "all" ||
			(filter === "income" && transaction.amount > 0) ||
			(filter === "expense" && transaction.amount < 0)

		const matchesSearch =
			transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			transaction.category.toLowerCase().includes(searchTerm.toLowerCase())

		return matchesFilter && matchesSearch
	})

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Transaction History</CardTitle>
				<CardDescription>View all transactions for this wallet.</CardDescription>
				<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mt-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search transactions..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-9"
						/>
					</div>
					<Select value={filter} onValueChange={setFilter}>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="Filter" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Transactions</SelectItem>
							<SelectItem value="income">Income Only</SelectItem>
							<SelectItem value="expense">Expenses Only</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{filteredTransactions.length > 0 ? (
						filteredTransactions.map((transaction) => (
							<div
								key={transaction.id}
								className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 last:border-0 last:pb-0"
							>
								<div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-0">
									<div className={`rounded-full p-2 ${transaction.amount > 0 ? "bg-green-100" : "bg-red-100"}`}>
										{transaction.amount > 0 ? (
											<Check className="h-4 w-4 text-green-600" />
										) : (
											<Minus className="h-4 w-4 text-red-600" />
										)}
									</div>
									<div>
										<div className="font-medium">{transaction.description}</div>
										<div className="text-xs sm:text-sm text-muted-foreground">{transaction.date}</div>
									</div>
								</div>
								<div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-0 ml-auto sm:ml-0">
									<Badge variant="outline" className="text-xs">
										{transaction.category}
									</Badge>
									<div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
										{transaction.amount > 0 ? "+" : ""}
										{transaction.amount.toFixed(2)}
									</div>
								</div>
							</div>
						))
					) : (
						<div className="flex flex-col items-center justify-center py-8 text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-12 w-12 text-muted-foreground"
							>
								<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
								<line x1="12" x2="12" y1="9" y2="13" />
								<line x1="12" x2="12.01" y1="17" y2="17" />
							</svg>
							<h3 className="mt-4 text-lg font-medium">No transactions found</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Try adjusting your search or filter to find what you're looking for.
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
