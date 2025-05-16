"use client"

import { BudgetCalendar } from "@/components/budget/budget-calendar"
import { BudgetCategoriesTab } from "@/components/budget/budget-categories-tab"
import { BudgetGoals } from "@/components/budget/budget-goals"
import { BudgetOverviewCards } from "@/components/budget/budget-overview-cards"
import { BudgetTransactionsTab } from "@/components/budget/budget-transactions-tab"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Calendar, Download, Menu, PlusCircle, Share2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function BudgetPage() {
	const [activeMonth, setActiveMonth] = useState("april")
	const [activeTab, setActiveTab] = useState("categories")
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

	// Mock data for demonstration
	const budgetSummary = {
		totalBudget: 3500,
		spent: 2150.75,
		remaining: 1349.25,
		percentUsed: 61.45,
		daysLeft: 12,
	}

	const categories = [
		{
			id: "c1",
			name: "Housing",
			budgeted: 1200,
			spent: 1200,
			remaining: 0,
			percentUsed: 100,
			status: "on-track",
		},
		{
			id: "c2",
			name: "Groceries",
			budgeted: 500,
			spent: 385.25,
			remaining: 114.75,
			percentUsed: 77.05,
			status: "on-track",
		},
		{
			id: "c3",
			name: "Dining Out",
			budgeted: 300,
			spent: 275.5,
			remaining: 24.5,
			percentUsed: 91.83,
			status: "warning",
		},
		{
			id: "c4",
			name: "Transportation",
			budgeted: 200,
			spent: 110.0,
			remaining: 90.0,
			percentUsed: 55.0,
			status: "on-track",
		},
		{
			id: "c5",
			name: "Entertainment",
			budgeted: 150,
			spent: 180.0,
			remaining: -30.0,
			percentUsed: 120.0,
			status: "exceeded",
		},
		{
			id: "c6",
			name: "Utilities",
			budgeted: 250,
			spent: 0,
			remaining: 250,
			percentUsed: 0,
			status: "on-track",
		},
		{
			id: "c7",
			name: "Shopping",
			budgeted: 400,
			spent: 0,
			remaining: 400,
			percentUsed: 0,
			status: "on-track",
		},
		{
			id: "c8",
			name: "Health",
			budgeted: 500,
			spent: 0,
			remaining: 500,
			percentUsed: 0,
			status: "on-track",
		},
	]

	const recentTransactions = [
		{
			id: "t1",
			description: "Grocery Store",
			amount: 84.32,
			date: "Today, 2:34 PM",
			category: "Groceries",
		},
		{
			id: "t2",
			description: "Restaurant",
			amount: 65.5,
			date: "Yesterday, 7:15 PM",
			category: "Dining Out",
		},
		{
			id: "t3",
			description: "Gas Station",
			amount: 45.0,
			date: "Apr 15, 2023",
			category: "Transportation",
		},
		{
			id: "t4",
			description: "Movie Tickets",
			amount: 32.0,
			date: "Apr 14, 2023",
			category: "Entertainment",
		},
		{
			id: "t5",
			description: "Coffee Shop",
			amount: 5.75,
			date: "Apr 14, 2023",
			category: "Dining Out",
		},
	]

	return (
		<Layout>
			<div className="px-2 sm:px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-4 md:mb-6 lg:mb-8 flex flex-col gap-2 md:gap-3 lg:gap-4"
				>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
						<div>
							<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Budget Management</h1>
							<p className="text-xs md:text-sm text-muted-foreground mt-1">Track and manage your monthly spending.</p>
						</div>

						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
							{/* Month selector - consistent across all screen sizes */}
							<div className="flex items-center gap-2 w-full sm:w-auto">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<Select defaultValue={activeMonth} onValueChange={setActiveMonth}>
									<SelectTrigger className="w-full sm:w-[180px] h-9 text-xs sm:text-sm">
										<SelectValue placeholder="Select month" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="january">January 2023</SelectItem>
										<SelectItem value="february">February 2023</SelectItem>
										<SelectItem value="march">March 2023</SelectItem>
										<SelectItem value="april">April 2023</SelectItem>
										<SelectItem value="may">May 2023</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Action buttons - responsive approach */}
							{isMobile ? (
								<div className="flex justify-between w-full">
									<Button asChild size="sm" className="flex-1 mr-2 h-9 text-xs">
										<Link href="/budget/create">
											<PlusCircle className="mr-1 h-3 w-3" />
											New
										</Link>
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline" size="sm" className="h-9">
												<Menu className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<Download className="h-4 w-4 mr-2" />
												Export Budget
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Share2 className="h-4 w-4 mr-2" />
												Share Budget
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							) : (
								<div className="flex gap-2 w-full sm:w-auto">
									<Button variant="outline" size="sm" className="h-9">
										<Download className="h-4 w-4 mr-1.5 sm:mr-2" />
										<span className="text-xs sm:text-sm">Export</span>
									</Button>
									<Button variant="outline" size="sm" className="h-9">
										<Share2 className="h-4 w-4 mr-1.5 sm:mr-2" />
										<span className="text-xs sm:text-sm">Share</span>
									</Button>
									<Button asChild size="sm" className="h-9">
										<Link href="/budget/create">
											<PlusCircle className="mr-1.5 sm:mr-2 h-4 w-4" />
											<span className="text-xs sm:text-sm">New Budget</span>
										</Link>
									</Button>
								</div>
							)}
						</div>
					</div>
				</motion.div>

				{/* Budget Overview */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
				>
					<BudgetOverviewCards budgetSummary={budgetSummary} />
				</motion.div>

				{/* Main Content */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className="mt-4 sm:mt-8"
				>
					<Tabs defaultValue="categories" value={activeTab} onValueChange={setActiveTab}>
						<div className="overflow-x-auto pb-2">
							<TabsList className="w-full sm:w-auto">
								<TabsTrigger value="categories" className="text-xs sm:text-sm">
									Budget Categories
								</TabsTrigger>
								<TabsTrigger value="transactions" className="text-xs sm:text-sm">
									Transactions
								</TabsTrigger>
								<TabsTrigger value="goals" className="text-xs sm:text-sm">
									Goals
								</TabsTrigger>
							</TabsList>
						</div>

						<TabsContent value="categories" className="mt-4 sm:mt-6">
							<div className="space-y-4 sm:space-y-5">
								<div className="md:col-span-1">
									<BudgetCategoriesTab categories={categories} />
								</div>
								<div>
									<BudgetCalendar />
								</div>
							</div>
						</TabsContent>

						<TabsContent value="transactions" className="mt-4 sm:mt-6">
							<BudgetTransactionsTab transactions={recentTransactions} />
						</TabsContent>

						<TabsContent value="goals" className="mt-4 sm:mt-6">
							<BudgetGoals />
						</TabsContent>
					</Tabs>
				</motion.div>
			</div>
		</Layout>
	)
}
