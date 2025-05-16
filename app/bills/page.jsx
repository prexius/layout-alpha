"use client"

import { BillChart } from "@/components/bills/bill-chart"
import { BillDialog } from "@/components/bills/bill-dialog"
import { PaidBillsTab } from "@/components/bills/paid-bills-tab"
import { RecurringBillsTab } from "@/components/bills/recurring-bills-tab"
import { UpcomingBillsTab } from "@/components/bills/upcoming-bills-tab"
import { Layout } from "@/components/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
	AlertCircle,
	ArrowDownRight,
	ArrowUpRight,
	Clock,
	CreditCard,
	Download,
	Filter,
	Menu,
	Plus,
	Search,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function BillsPage() {
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

	// Mock data for upcoming bills
	const upcomingBills = [
		{
			id: "b1",
			name: "Electric Bill",
			amount: 124.75,
			dueDate: "2023-04-25",
			payee: "Electric Company",
			status: "upcoming",
			category: "Utilities",
		},
		{
			id: "b2",
			name: "Water Bill",
			amount: 45.5,
			dueDate: "2023-04-28",
			payee: "Water Services",
			status: "upcoming",
			category: "Utilities",
		},
		{
			id: "b3",
			name: "Internet",
			amount: 79.99,
			dueDate: "2023-05-01",
			payee: "Internet Provider",
			status: "upcoming",
			category: "Utilities",
		},
		{
			id: "b4",
			name: "Rent",
			amount: 1200.0,
			dueDate: "2023-05-01",
			payee: "Property Management",
			status: "upcoming",
			category: "Housing",
		},
		{
			id: "b5",
			name: "Phone",
			amount: 65.0,
			dueDate: "2023-05-05",
			payee: "Mobile Carrier",
			status: "upcoming",
			category: "Communication",
		},
	]

	// Mock data for paid bills
	const paidBills = [
		{
			id: "p1",
			name: "Electric Bill",
			amount: 118.42,
			paidDate: "2023-03-25",
			payee: "Electric Company",
			category: "Utilities",
		},
		{
			id: "p2",
			name: "Water Bill",
			amount: 42.75,
			paidDate: "2023-03-28",
			payee: "Water Services",
			category: "Utilities",
		},
		{
			id: "p3",
			name: "Internet",
			amount: 79.99,
			paidDate: "2023-04-01",
			payee: "Internet Provider",
			category: "Utilities",
		},
		{
			id: "p4",
			name: "Rent",
			amount: 1200.0,
			paidDate: "2023-04-01",
			payee: "Property Management",
			category: "Housing",
		},
		{
			id: "p5",
			name: "Phone",
			amount: 65.0,
			paidDate: "2023-04-05",
			payee: "Mobile Carrier",
			category: "Communication",
		},
		{
			id: "p6",
			name: "Gym Membership",
			amount: 49.99,
			paidDate: "2023-04-10",
			payee: "Fitness Center",
			category: "Health & Fitness",
		},
	]

	// Mock data for recurring bills
	const recurringBills = [
		{
			id: "r1",
			name: "Netflix",
			amount: 15.99,
			frequency: "Monthly",
			nextDate: "2023-05-15",
			payee: "Netflix",
			category: "Entertainment",
		},
		{
			id: "r2",
			name: "Spotify",
			amount: 9.99,
			frequency: "Monthly",
			nextDate: "2023-05-10",
			payee: "Spotify",
			category: "Entertainment",
		},
		{
			id: "r3",
			name: "Gym Membership",
			amount: 49.99,
			frequency: "Monthly",
			nextDate: "2023-05-10",
			payee: "Fitness Center",
			category: "Health & Fitness",
		},
		{
			id: "r4",
			name: "Cloud Storage",
			amount: 9.99,
			frequency: "Monthly",
			nextDate: "2023-05-05",
			payee: "Cloud Provider",
			category: "Digital Services",
		},
		{
			id: "r5",
			name: "Car Insurance",
			amount: 89.0,
			frequency: "Monthly",
			nextDate: "2023-05-20",
			payee: "Insurance Company",
			category: "Insurance",
		},
	]

	// Mock data for chart
	const chartData = [
		{ month: "Jan", Utilities: 250, Housing: 1200, Communication: 75 },
		{ month: "Feb", Utilities: 230, Housing: 1200, Communication: 75 },
		{ month: "Mar", Utilities: 245, Housing: 1200, Communication: 75 },
		{ month: "Apr", Utilities: 260, Housing: 1200, Communication: 75 },
		{ month: "May", Utilities: 275, Housing: 1250, Communication: 80 },
		{ month: "Jun", Utilities: 290, Housing: 1250, Communication: 80 },
		{ month: "Jul", Utilities: 310, Housing: 1250, Communication: 80 },
		{ month: "Aug", Utilities: 325, Housing: 1250, Communication: 80 },
		{ month: "Sep", Utilities: 300, Housing: 1300, Communication: 85 },
		{ month: "Oct", Utilities: 280, Housing: 1300, Communication: 85 },
		{ month: "Nov", Utilities: 265, Housing: 1300, Communication: 85 },
		{ month: "Dec", Utilities: 285, Housing: 1300, Communication: 85 },
	]

	// Format date for display
	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: isMobile ? "2-digit" : "numeric",
		})
	}

	// Calculate days until due
	const getDaysUntilDue = (dueDate) => {
		const today = new Date()
		const due = new Date(dueDate)
		const diffTime = due - today
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		return diffDays
	}

	// Get status badge color
	const getStatusColor = (days) => {
		if (days < 0) return "destructive"
		if (days <= 3) return "warning"
		return "secondary"
	}

	// Calculate total amounts
	const totalUpcoming = upcomingBills.reduce((sum, bill) => sum + bill.amount, 0)
	const totalPaid = paidBills.reduce((sum, bill) => sum + bill.amount, 0)
	const totalRecurring = recurringBills.reduce((sum, bill) => sum + bill.amount, 0)

	// Add state management for the dialog
	const [addBillOpen, setAddBillOpen] = useState(false)
	const [addBillSuccess, setAddBillSuccess] = useState(false)
	const [activeTab, setActiveTab] = useState("upcoming")

	// Add a function to handle form submission
	const handleAddBill = (e) => {
		e.preventDefault()
		// Here you would normally save the bill data
		setAddBillSuccess(true)
		setTimeout(() => {
			setAddBillSuccess(false)
			setAddBillOpen(false)
		}, 2000)
	}

	return (
		<Layout>
			<div className="px-2 sm:px-0">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
				>
					<div>
						<h1 className="text-xl sm:text-3xl font-semibold">Bills Management</h1>
						<p className="text-sm text-muted-foreground mt-1">Track, manage, and pay your bills in one place</p>
					</div>

					{isMobile ? (
						<div className="flex items-center gap-2">
							<Button asChild className="flex-1">
								<Link href="/bills/pay">
									<CreditCard className="mr-2 h-4 w-4" />
									Pay Bill
								</Link>
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="icon">
										<Menu className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => setAddBillOpen(true)}>
										<Plus className="mr-2 h-4 w-4" />
										Add Bill
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<Button asChild>
								<Link href="/bills/pay">
									<CreditCard className="mr-2 h-4 w-4" />
									Pay a Bill
								</Link>
							</Button>
							<Button variant="outline" onClick={() => setAddBillOpen(true)}>
								<Plus className="mr-2 h-4 w-4" />
								Add Bill
							</Button>
						</div>
					)}

					<BillDialog
						open={addBillOpen}
						onOpenChange={setAddBillOpen}
						onSubmit={handleAddBill}
						success={addBillSuccess}
					/>
				</motion.div>

				{/* Summary Cards */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
					className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 mb-4 sm:mb-6"
				>
					<Card className="border-border/40">
						<CardContent className="p-3 sm:p-5">
							<div className="flex items-center justify-between mb-2 sm:mb-3">
								<div className="flex items-center gap-2 sm:gap-3">
									<div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-destructive/10">
										<AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
									</div>
									<h3 className="text-xs sm:text-sm font-medium">Upcoming Bills</h3>
								</div>
								<div className="flex items-center text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-destructive/10 text-destructive">
									<ArrowUpRight className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
									{upcomingBills.length} bills
								</div>
							</div>
							<div className="space-y-0.5 sm:space-y-1">
								<div className="text-xl sm:text-3xl font-semibold">${totalUpcoming.toFixed(2)}</div>
								<p className="text-[10px] sm:text-xs text-muted-foreground">Due in the next 30 days</p>
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="w-full mt-2 sm:mt-3 justify-between text-xs h-8"
								onClick={() => setActiveTab("upcoming")}
							>
								View Upcoming Bills
								<ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
							</Button>
						</CardContent>
					</Card>

					<Card className="border-border/40">
						<CardContent className="p-3 sm:p-5">
							<div className="flex items-center justify-between mb-2 sm:mb-3">
								<div className="flex items-center gap-2 sm:gap-3">
									<div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10">
										<Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
									</div>
									<h3 className="text-xs sm:text-sm font-medium">Recurring Bills</h3>
								</div>
								<div className="flex items-center text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary">
									<ArrowUpRight className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
									{recurringBills.length} bills
								</div>
							</div>
							<div className="space-y-0.5 sm:space-y-1">
								<div className="text-xl sm:text-3xl font-semibold">${totalRecurring.toFixed(2)}</div>
								<p className="text-[10px] sm:text-xs text-muted-foreground">Monthly recurring expenses</p>
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="w-full mt-2 sm:mt-3 justify-between text-xs h-8"
								onClick={() => setActiveTab("recurring")}
							>
								View Recurring Bills
								<ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
							</Button>
						</CardContent>
					</Card>

					<Card className="border-border/40">
						<CardContent className="p-3 sm:p-5">
							<div className="flex items-center justify-between mb-2 sm:mb-3">
								<div className="flex items-center gap-2 sm:gap-3">
									<div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40">
										<ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
									</div>
									<h3 className="text-xs sm:text-sm font-medium">Paid Bills</h3>
								</div>
								<div className="flex items-center text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
									<ArrowDownRight className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
									{paidBills.length} bills
								</div>
							</div>
							<div className="space-y-0.5 sm:space-y-1">
								<div className="text-xl sm:text-3xl font-semibold">${totalPaid.toFixed(2)}</div>
								<p className="text-[10px] sm:text-xs text-muted-foreground">Paid in the last 30 days</p>
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="w-full mt-2 sm:mt-3 justify-between text-xs h-8"
								onClick={() => setActiveTab("paid")}
							>
								View Paid Bills
								<ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
							</Button>
						</CardContent>
					</Card>
				</motion.div>

				{/* Chart and Search Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3 mb-4 sm:mb-6"
				>
					<Card className="border-border/40 lg:col-span-2">
						<CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-base sm:text-lg">Monthly Spending</CardTitle>
									<CardDescription className="text-xs">Bill payments by category</CardDescription>
								</div>
								<Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
									<Download className="h-3 w-3 sm:h-4 sm:w-4" />
									<span className="hidden sm:inline">Export</span>
								</Button>
							</div>
						</CardHeader>
						<CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
							<div className="h-[200px] sm:h-[300px] w-full">
								<BillChart data={chartData} />
							</div>
							<div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-2 text-[10px] sm:text-xs text-muted-foreground">
								<div className="flex items-center gap-1 sm:gap-2">
									<div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#6366f1] rounded-full"></div>
									<span>Utilities</span>
								</div>
								<div className="flex items-center gap-1 sm:gap-2">
									<div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#8b5cf6] rounded-full"></div>
									<span>Housing</span>
								</div>
								<div className="flex items-center gap-1 sm:gap-2">
									<div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#ec4899] rounded-full"></div>
									<span>Communication</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-border/40">
						<CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
							<CardTitle className="text-base sm:text-lg">Quick Filters</CardTitle>
							<CardDescription className="text-xs">Search and filter your bills</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
								<Input placeholder="Search bills..." className="pl-8 h-8 sm:h-10 text-xs sm:text-sm" />
							</div>

							<div className="space-y-1 sm:space-y-2">
								<label className="text-xs sm:text-sm font-medium">Category</label>
								<Select>
									<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
										<SelectValue placeholder="All Categories" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Categories</SelectItem>
										<SelectItem value="utilities">Utilities</SelectItem>
										<SelectItem value="housing">Housing</SelectItem>
										<SelectItem value="communication">Communication</SelectItem>
										<SelectItem value="entertainment">Entertainment</SelectItem>
										<SelectItem value="insurance">Insurance</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-1 sm:space-y-2">
								<label className="text-xs sm:text-sm font-medium">Date Range</label>
								<Select>
									<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
										<SelectValue placeholder="Last 30 days" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="30">Last 30 days</SelectItem>
										<SelectItem value="60">Last 60 days</SelectItem>
										<SelectItem value="90">Last 90 days</SelectItem>
										<SelectItem value="custom">Custom range</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-1 sm:space-y-2">
								<label className="text-xs sm:text-sm font-medium">Status</label>
								<Select>
									<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
										<SelectValue placeholder="All Statuses" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Statuses</SelectItem>
										<SelectItem value="paid">Paid</SelectItem>
										<SelectItem value="upcoming">Upcoming</SelectItem>
										<SelectItem value="overdue">Overdue</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Button className="w-full mt-2 h-8 sm:h-10 text-xs sm:text-sm">
								<Filter className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
								Apply Filters
							</Button>
						</CardContent>
					</Card>
				</motion.div>

				{/* Tabs Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.3 }}
				>
					<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
						<ScrollArea className="w-full pb-2" orientation="horizontal">
							<TabsList className="inline-flex w-full min-w-max mb-4 sm:mb-6">
								<TabsTrigger value="upcoming" className="text-xs sm:text-sm">
									Upcoming
									<Badge variant="secondary" className="ml-1 sm:ml-2 text-[10px] sm:text-xs">
										{upcomingBills.length}
									</Badge>
								</TabsTrigger>
								<TabsTrigger value="paid" className="text-xs sm:text-sm">
									Paid
									<Badge variant="secondary" className="ml-1 sm:ml-2 text-[10px] sm:text-xs">
										{paidBills.length}
									</Badge>
								</TabsTrigger>
								<TabsTrigger value="recurring" className="text-xs sm:text-sm">
									Recurring
									<Badge variant="secondary" className="ml-1 sm:ml-2 text-[10px] sm:text-xs">
										{recurringBills.length}
									</Badge>
								</TabsTrigger>
							</TabsList>
						</ScrollArea>

						<TabsContent value="upcoming">
							<UpcomingBillsTab
								bills={upcomingBills}
								formatDate={formatDate}
								getDaysUntilDue={getDaysUntilDue}
								getStatusColor={getStatusColor}
								isMobile={isMobile}
							/>
						</TabsContent>

						<TabsContent value="paid">
							<PaidBillsTab bills={paidBills} formatDate={formatDate} isMobile={isMobile} />
						</TabsContent>

						<TabsContent value="recurring">
							<RecurringBillsTab bills={recurringBills} formatDate={formatDate} isMobile={isMobile} />
						</TabsContent>
					</Tabs>
				</motion.div>
			</div>
		</Layout>
	)
}
