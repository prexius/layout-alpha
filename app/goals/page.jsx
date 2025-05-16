"use client"

import { GoalsOverviewCards } from "@/components/goals/goals-overview-cards"
import { GoalsTabContent } from "@/components/goals/goals-tab-content"
import { Layout } from "@/components/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { BarChart3, Calendar, CheckCircle, Clock, Filter, PlusCircle, Search, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GoalsPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [categoryFilter, setCategoryFilter] = useState("all")

	// Mock data for demonstration
	const goals = [
		{
			id: "g1",
			name: "Emergency Fund",
			targetAmount: 10000,
			currentAmount: 10000,
			progress: 100,
			deadline: "2023-04-10",
			status: "completed",
			category: "Savings",
			priority: "High",
			walletId: "w1",
			walletName: "Main Savings",
			notes: "Three months of living expenses for emergencies.",
			contributions: [
				{ date: "2023-01-15", amount: 2500 },
				{ date: "2023-02-15", amount: 2500 },
				{ date: "2023-03-15", amount: 2500 },
				{ date: "2023-04-10", amount: 2500 },
			],
		},
		{
			id: "g2",
			name: "Vacation Fund",
			targetAmount: 3000,
			currentAmount: 1500,
			progress: 50,
			deadline: "2023-07-15",
			status: "on-track",
			category: "Travel",
			priority: "Medium",
			walletId: "w3",
			walletName: "Travel Budget",
			notes: "Summer vacation to the beach.",
			contributions: [
				{ date: "2023-02-01", amount: 500 },
				{ date: "2023-03-01", amount: 500 },
				{ date: "2023-04-01", amount: 500 },
			],
		},
		{
			id: "g3",
			name: "New Car",
			targetAmount: 20000,
			currentAmount: 2778.45,
			progress: 13.89,
			deadline: "2024-03-01",
			status: "on-track",
			category: "Major Purchase",
			priority: "Medium",
			walletId: "w2",
			walletName: "Emergency Fund",
			notes: "Saving for a new hybrid vehicle.",
			contributions: [
				{ date: "2023-01-15", amount: 1000 },
				{ date: "2023-02-15", amount: 1000 },
				{ date: "2023-03-15", amount: 778.45 },
			],
		},
		{
			id: "g4",
			name: "Home Down Payment",
			targetAmount: 50000,
			currentAmount: 5000,
			progress: 10,
			deadline: "2025-06-01",
			status: "on-track",
			category: "Major Purchase",
			priority: "High",
			walletId: "w1",
			walletName: "Main Savings",
			notes: "20% down payment for a house.",
			contributions: [
				{ date: "2023-01-01", amount: 2500 },
				{ date: "2023-03-01", amount: 2500 },
			],
		},
		{
			id: "g5",
			name: "Wedding Fund",
			targetAmount: 15000,
			currentAmount: 0,
			progress: 0,
			deadline: "2024-09-15",
			status: "not-started",
			category: "Event",
			priority: "Medium",
			walletId: "w1",
			walletName: "Main Savings",
			notes: "Saving for wedding expenses.",
			contributions: [],
		},
	]

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" }
		return new Date(dateString).toLocaleDateString(undefined, options)
	}

	const calculateTimeLeft = (deadline) => {
		const today = new Date()
		const targetDate = new Date(deadline)
		const timeLeft = targetDate - today

		// If deadline has passed
		if (timeLeft < 0) return "Deadline passed"

		const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

		if (daysLeft > 365) {
			const years = Math.floor(daysLeft / 365)
			return `${years} year${years > 1 ? "s" : ""} left`
		} else if (daysLeft > 30) {
			const months = Math.floor(daysLeft / 30)
			return `${months} month${months > 1 ? "s" : ""} left`
		} else {
			return `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`
		}
	}

	// Get unique categories from goals
	const categories = ["all", ...new Set(goals.map((goal) => goal.category))]

	// Count goals by status
	const activeGoalsCount = goals.filter(
		(goal) => goal.status === "on-track" || goal.status === "at-risk" || goal.status === "behind",
	).length
	const completedGoalsCount = goals.filter((goal) => goal.status === "completed").length
	const upcomingGoalsCount = goals.filter((goal) => goal.status === "not-started").length

	// Calculate total progress
	const totalProgress =
		goals.length > 0
			? (goals.reduce((sum, goal) => sum + goal.currentAmount, 0) /
				goals.reduce((sum, goal) => sum + goal.targetAmount, 0)) *
			100
			: 0

	return (
		<Layout>
			<div>
				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Financial Goals</h1>
						<p className="text-muted-foreground mt-1">Track and manage your savings goals</p>
					</div>
					<Button asChild size="sm" className="sm:self-start">
						<Link href="/goals/create">
							<PlusCircle className="mr-2 h-4 w-4" />
							New Goal
						</Link>
					</Button>
				</div>

				{/* Goals Overview */}
				<div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
					<Card className="col-span-1 md:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg font-medium">Overall Progress</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									${goals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()} of $
									{goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
								</span>
								<span className="text-sm font-medium">{totalProgress.toFixed(1)}%</span>
							</div>
							<Progress value={totalProgress} max={100} className="h-2" />

								<TooltipProvider>
							<div className="grid grid-cols-3 gap-4 pt-2">
									<Tooltip>
										<TooltipTrigger asChild>
											<div className="flex flex-col items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
												<Target className="h-5 w-5 text-blue-500 mb-1" />
												<span className="text-xs text-muted-foreground">Active</span>
												<span className="text-xl font-semibold">{activeGoalsCount}</span>
											</div>
										</TooltipTrigger>
										<TooltipContent>
											<p>Active financial goals</p>
										</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<div className="flex flex-col items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
												<CheckCircle className="h-5 w-5 text-green-500 mb-1" />
												<span className="text-xs text-muted-foreground">Completed</span>
												<span className="text-xl font-semibold">{completedGoalsCount}</span>
											</div>
										</TooltipTrigger>
										<TooltipContent>
											<p>Completed financial goals</p>
										</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<div className="flex flex-col items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
												<Clock className="h-5 w-5 text-amber-500 mb-1" />
												<span className="text-xs text-muted-foreground">Upcoming</span>
												<span className="text-xl font-semibold">{upcomingGoalsCount}</span>
											</div>
										</TooltipTrigger>
										<TooltipContent>
											<p>Upcoming financial goals</p>
										</TooltipContent>
									</Tooltip>
							</div>
								</TooltipProvider>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg font-medium">Goal Insights</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="mr-2 p-2 rounded-full bg-primary/10">
										<Target className="h-4 w-4 text-primary" />
									</div>
									<div>
										<div className="text-sm font-medium">Highest Priority</div>
										<div className="text-xs text-muted-foreground">Home Down Payment</div>
									</div>
								</div>
								<Badge variant="outline">$50,000</Badge>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="mr-2 p-2 rounded-full bg-primary/10">
										<Calendar className="h-4 w-4 text-primary" />
									</div>
									<div>
										<div className="text-sm font-medium">Next Deadline</div>
										<div className="text-xs text-muted-foreground">Vacation Fund</div>
									</div>
								</div>
								<Badge variant="outline">July 15</Badge>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="mr-2 p-2 rounded-full bg-primary/10">
										<TrendingUp className="h-4 w-4 text-primary" />
									</div>
									<div>
										<div className="text-sm font-medium">Fastest Growing</div>
										<div className="text-xs text-muted-foreground">Emergency Fund</div>
									</div>
								</div>
								<Badge variant="outline">+25% / month</Badge>
							</div>

							<Button variant="outline" className="w-full mt-2" size="sm">
									<BarChart3 className="mr-2 h-4 w-4" />
									View Detailed Insights
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Search and Filters */}
				<div className="flex flex-col sm:flex-row gap-4 mb-6">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search goals..."
							className="pl-9"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="icon">
							<Filter className="h-4 w-4" />
						</Button>
						<Select value={categoryFilter} onValueChange={setCategoryFilter}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="All Categories" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category === "all" ? "All Categories" : category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Goals Overview Cards */}
				<GoalsOverviewCards goals={goals} />

				{/* Main Content */}
				<div className="mt-6">
					<Tabs defaultValue="all">
						<TabsList className="w-full grid grid-cols-4">
							<TabsTrigger value="all">
								All Goals
								<Badge variant="secondary" className="ml-2">
									{goals.length}
								</Badge>
							</TabsTrigger>
							<TabsTrigger value="active">
								Active
								<Badge variant="secondary" className="ml-2">
									{activeGoalsCount}
								</Badge>
							</TabsTrigger>
							<TabsTrigger value="completed">
								Completed
								<Badge variant="secondary" className="ml-2">
									{completedGoalsCount}
								</Badge>
							</TabsTrigger>
							<TabsTrigger value="upcoming">
								Upcoming
								<Badge variant="secondary" className="ml-2">
									{upcomingGoalsCount}
								</Badge>
							</TabsTrigger>
						</TabsList>

						<TabsContent value="all" className="mt-6">
							<GoalsTabContent
								goals={goals.filter(
									(goal) =>
										(categoryFilter === "all" || goal.category === categoryFilter) &&
										(goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
											goal.category.toLowerCase().includes(searchQuery.toLowerCase())),
								)}
								filter="all"
								calculateTimeLeft={calculateTimeLeft}
								formatDate={formatDate}
							/>
						</TabsContent>

						<TabsContent value="active" className="mt-6">
							<GoalsTabContent
								goals={goals.filter(
									(goal) =>
										(categoryFilter === "all" || goal.category === categoryFilter) &&
										(goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
											goal.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
										(goal.status === "on-track" || goal.status === "at-risk" || goal.status === "behind"),
								)}
								filter="active"
								calculateTimeLeft={calculateTimeLeft}
								formatDate={formatDate}
							/>
						</TabsContent>

						<TabsContent value="completed" className="mt-6">
							<GoalsTabContent
								goals={goals.filter(
									(goal) =>
										(categoryFilter === "all" || goal.category === categoryFilter) &&
										(goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
											goal.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
										goal.status === "completed",
								)}
								filter="completed"
								calculateTimeLeft={calculateTimeLeft}
								formatDate={formatDate}
							/>
						</TabsContent>

						<TabsContent value="upcoming" className="mt-6">
							<GoalsTabContent
								goals={goals.filter(
									(goal) =>
										(categoryFilter === "all" || goal.category === categoryFilter) &&
										(goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
											goal.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
										goal.status === "not-started",
								)}
								filter="upcoming"
								calculateTimeLeft={calculateTimeLeft}
								formatDate={formatDate}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</Layout>
	)
}
