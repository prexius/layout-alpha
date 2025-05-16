"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
	AlertCircle,
	ArrowDownLeft,
	ArrowUpRight,
	BarChart3,
	Briefcase,
	ChevronRight,
	Clock,
	CreditCard,
	DollarSign,
	Download,
	Pencil,
	PiggyBank,
	Settings,
	Share2,
	TrendingUp,
	Wallet,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function WalletDetailsCard({ wallet, className }) {
	const [activeTab, setActiveTab] = useState("overview")
	const [isMobile, setIsMobile] = useState(false)

	// Check if screen is mobile size
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

	// Format currency
	const formatCurrency = (value, currency = "USD") => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value)
	}

	// Format date
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	// Format date for mobile (shorter version)
	const formatDateMobile = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	// Get icon based on wallet type
	const getWalletIcon = (type) => {
		switch (type) {
			case "Savings":
				return PiggyBank
			case "Budget":
				return Wallet
			case "Investment":
				return BarChart3
			default:
				return Briefcase
		}
	}

	// Get color scheme based on wallet type
	const getWalletColors = (type) => {
		switch (type) {
			case "Savings":
				return {
					bg: "bg-blue-100 dark:bg-blue-950/40",
					text: "text-blue-600 dark:text-blue-400",
					border: "border-blue-200 dark:border-blue-800/50",
					gradient: "from-blue-500 to-indigo-500",
				}
			case "Budget":
				return {
					bg: "bg-amber-100 dark:bg-amber-950/40",
					text: "text-amber-600 dark:text-amber-400",
					border: "border-amber-200 dark:border-amber-800/50",
					gradient: "from-amber-500 to-orange-500",
				}
			case "Investment":
				return {
					bg: "bg-emerald-100 dark:bg-emerald-950/40",
					text: "text-emerald-600 dark:text-emerald-400",
					border: "border-emerald-200 dark:border-emerald-800/50",
					gradient: "from-emerald-500 to-teal-500",
				}
			default:
				return {
					bg: "bg-violet-100 dark:bg-violet-950/40",
					text: "text-violet-600 dark:text-violet-400",
					border: "border-violet-200 dark:border-violet-800/50",
					gradient: "from-violet-500 to-purple-500",
				}
		}
	}

	const WalletIcon = getWalletIcon(wallet.type)
	const colors = getWalletColors(wallet.type)

	// Mock data for charts
	const balanceHistoryData = [
		{ date: "Jan", balance: 1200 },
		{ date: "Feb", balance: 1800 },
		{ date: "Mar", balance: 1600 },
		{ date: "Apr", balance: 2200 },
		{ date: "May", balance: 1900 },
		{ date: "Jun", balance: 2400 },
		{ date: "Jul", balance: 2100 },
		{ date: "Aug", balance: 2543.89 },
	]

	// Mock transactions for the activity tab
	const recentActivity = [
		{
			id: "t1",
			type: "deposit",
			amount: 500,
			date: "2023-04-15T08:30:00Z",
			description: "Salary Deposit",
		},
		{
			id: "t2",
			type: "withdrawal",
			amount: -120.45,
			date: "2023-04-14T14:15:00Z",
			description: "Grocery Shopping",
		},
		{
			id: "t3",
			type: "transfer",
			amount: -200,
			date: "2023-04-12T11:45:00Z",
			description: "Transfer to Emergency Fund",
		},
	]

	// Custom tooltip for the chart
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="rounded-lg border border-border bg-background p-3 shadow-md">
					<p className="mb-1 font-medium">{label}</p>
					<p className="text-sm text-muted-foreground">
						Balance: <span className="font-medium text-foreground">{formatCurrency(payload[0].value)}</span>
					</p>
				</div>
			)
		}
		return null
	}

	return (
		<Card className={cn("overflow-hidden", className)}>
			<CardHeader className="pb-3">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-3">
						<div className={cn("flex h-10 w-10 items-center justify-center rounded-full", colors.bg)}>
							<WalletIcon className={cn("h-5 w-5", colors.text)} />
						</div>
						<div>
							<CardTitle>{wallet.name}</CardTitle>
							<CardDescription className="truncate">
								{wallet.type} • ID: {wallet.id}
							</CardDescription>
						</div>
					</div>
					<Button variant="outline" size="sm" className="gap-1.5 self-end sm:self-auto">
						<Pencil className="h-3.5 w-3.5" />
						Edit Wallet
					</Button>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
					<div className="border-b border-border/40 px-3 sm:px-6">
						<TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0 overflow-x-auto">
							<TabsTrigger
								value="overview"
								className="rounded border-b-2 border-transparent px-2 sm:px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:shadow-none text-xs sm:text-sm"
							>
								Overview
							</TabsTrigger>
							<TabsTrigger
								value="activity"
								className="rounded border-b-2 border-transparent px-2 sm:px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:shadow-none text-xs sm:text-sm"
							>
								Activity
							</TabsTrigger>
							<TabsTrigger
								value="analytics"
								className="rounded border-b-2 border-transparent px-2 sm:px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:shadow-none text-xs sm:text-sm"
							>
								Analytics
							</TabsTrigger>
							<TabsTrigger
								value="settings"
								className="rounded border-b-2 border-transparent px-2 sm:px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:shadow-none text-xs sm:text-sm"
							>
								Settings
							</TabsTrigger>
						</TabsList>
					</div>

					{/* Overview Tab */}
					<TabsContent value="overview" className="m-0 p-3 sm:p-6">
						<div className="grid gap-6 sm:grid-cols-2">
							<div>
								<h3 className="mb-2 text-sm font-medium text-muted-foreground">Current Balance</h3>
								<div className="mb-4 text-2xl sm:text-3xl font-semibold">{formatCurrency(wallet.balance)}</div>

								<div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">
									<div className="rounded-lg border border-border/40 p-2 sm:p-3">
										<div className="mb-1 flex items-center gap-1 sm:gap-2">
											<ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
											<span className="text-xs sm:text-sm font-medium">Income</span>
										</div>
										<div className="text-base sm:text-lg font-semibold text-emerald-500">+$1,250.00</div>
									</div>
									<div className="rounded-lg border border-border/40 p-2 sm:p-3">
										<div className="mb-1 flex items-center gap-1 sm:gap-2">
											<ArrowDownLeft className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500" />
											<span className="text-xs sm:text-sm font-medium">Expenses</span>
										</div>
										<div className="text-base sm:text-lg font-semibold text-rose-500">-$450.45</div>
									</div>
								</div>

								<div className="space-y-3">
									<div className="flex items-center justify-between rounded-lg border border-border/40 p-2 sm:p-3">
										<div className="flex items-center gap-2">
											<Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
											<span className="text-xs sm:text-sm">Last Updated</span>
										</div>
										<span className="text-xs sm:text-sm font-medium">
											{isMobile ? formatDateMobile(wallet.lastUpdated) : formatDate(wallet.lastUpdated)}
										</span>
									</div>
									<div className="flex items-center justify-between rounded-lg border border-border/40 p-2 sm:p-3">
										<div className="flex items-center gap-2">
											<CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
											<span className="text-xs sm:text-sm">Linked Cards</span>
										</div>
										<Badge variant="outline" className="text-xs font-normal">
											2 Cards
										</Badge>
									</div>
									<div className="flex items-center justify-between rounded-lg border border-border/40 p-2 sm:p-3">
										<div className="flex items-center gap-2">
											<Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
											<span className="text-xs sm:text-sm">Shared With</span>
										</div>
										<Badge variant="outline" className="text-xs font-normal">
											None
										</Badge>
									</div>
								</div>
							</div>

							<div className="mt-6 sm:mt-0">
								<h3 className="mb-2 text-sm font-medium text-muted-foreground">Balance History</h3>
								<div className="h-[180px] sm:h-[240px] w-full">
									<ResponsiveContainer width="100%" height="100%">
										<AreaChart data={balanceHistoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
											<defs>
												<linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
													<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
													<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
												</linearGradient>
											</defs>
											<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.4} />
											<XAxis
												dataKey="date"
												axisLine={false}
												tickLine={false}
												tick={{ fill: "hsl(var(--muted-foreground))", fontSize: isMobile ? 10 : 12 }}
												dy={10}
											/>
											<YAxis
												axisLine={false}
												tickLine={false}
												tick={{ fill: "hsl(var(--muted-foreground))", fontSize: isMobile ? 10 : 12 }}
												tickFormatter={(value) => (isMobile ? `$${value / 1000}k` : `$${value}`)}
												width={isMobile ? 40 : 60}
											/>
											<Tooltip content={<CustomTooltip />} />
											<Area
												type="monotone"
												dataKey="balance"
												stroke="hsl(var(--primary))"
												strokeWidth={2}
												fillOpacity={1}
												fill="url(#colorBalance)"
											/>
										</AreaChart>
									</ResponsiveContainer>
								</div>

								<div className="mt-4 rounded-lg border border-border/40 bg-muted/30 p-3 sm:p-4">
									<h4 className="mb-2 text-sm font-medium">Quick Stats</h4>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<div className="text-xs sm:text-sm text-muted-foreground">Monthly Growth</div>
											<div className="mt-1 flex items-center gap-1">
												<TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
												<span className="text-sm font-medium text-emerald-500">+12.5%</span>
											</div>
										</div>
										<div>
											<div className="text-xs sm:text-sm text-muted-foreground">Interest Rate</div>
											<div className="mt-1 flex items-center gap-1">
												<DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
												<span className="text-sm font-medium">2.3% APY</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Activity Tab */}
					<TabsContent value="activity" className="m-0 p-3 sm:p-6">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-base sm:text-lg font-medium">Recent Activity</h3>
							<Button variant="outline" size="sm" className="h-8 text-xs sm:text-sm px-2 sm:px-3">
								View All
							</Button>
						</div>

						<div className="space-y-3 sm:space-y-4">
							{recentActivity.map((activity) => (
								<div
									key={activity.id}
									className="flex items-center justify-between rounded-lg border border-border/40 p-3 sm:p-4"
								>
									<div className="flex items-center gap-2 sm:gap-3">
										<div
											className={cn(
												"flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full",
												activity.type === "deposit"
													? "bg-emerald-100 dark:bg-emerald-950/40"
													: activity.type === "withdrawal"
														? "bg-rose-100 dark:bg-rose-950/40"
														: "bg-blue-100 dark:bg-blue-950/40",
											)}
										>
											{activity.type === "deposit" ? (
												<ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
											) : activity.type === "withdrawal" ? (
												<ArrowDownLeft className="h-4 w-4 sm:h-5 sm:w-5 text-rose-600 dark:text-rose-400" />
											) : (
												<Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
											)}
										</div>
										<div>
											<div className="font-medium text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
												{activity.description}
											</div>
											<div className="text-xs sm:text-sm text-muted-foreground">
												{new Date(activity.date).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													hour: "2-digit",
													minute: "2-digit",
												})}
											</div>
										</div>
									</div>
									<div
										className={cn(
											"font-medium text-sm sm:text-base",
											activity.amount > 0
												? "text-emerald-600 dark:text-emerald-400"
												: "text-rose-600 dark:text-rose-400",
										)}
									>
										{activity.amount > 0 ? "+" : ""}
										{formatCurrency(activity.amount)}
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 rounded-lg border border-border/40 bg-muted/30 p-3 sm:p-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
									<span className="font-medium text-sm sm:text-base">Pending Transactions</span>
								</div>
								<Button variant="ghost" size="sm" className="h-7 sm:h-8 gap-1 text-xs sm:text-sm px-2 sm:px-3">
									View All
									<ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
								</Button>
							</div>
							<div className="mt-2 text-xs sm:text-sm text-muted-foreground">No pending transactions at this time.</div>
						</div>
					</TabsContent>

					{/* Analytics Tab */}
					<TabsContent value="analytics" className="m-0 p-3 sm:p-6">
						<div className="mb-6 text-center">
							<h3 className="text-base sm:text-lg font-medium">Spending Analytics</h3>
							<p className="text-xs sm:text-sm text-muted-foreground">Track your spending patterns and trends</p>
						</div>

						<div className="rounded-lg border border-border/40 bg-muted/30 p-4 sm:p-6 text-center">
							<BarChart3 className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
							<h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium">Analytics Coming Soon</h3>
							<p className="mt-2 text-xs sm:text-sm text-muted-foreground">
								We're working on bringing you detailed spending analytics for this wallet.
							</p>
							<Button className="mt-3 sm:mt-4 h-8 sm:h-9 text-xs sm:text-sm">Get Notified</Button>
						</div>
					</TabsContent>

					{/* Settings Tab */}
					<TabsContent value="settings" className="m-0 p-3 sm:p-6">
						<div className="mb-4 sm:mb-6">
							<h3 className="text-base sm:text-lg font-medium">Wallet Settings</h3>
							<p className="text-xs sm:text-sm text-muted-foreground">Manage your wallet preferences and settings</p>
						</div>

						<div className="space-y-3 sm:space-y-4">
							<div className="flex items-center justify-between rounded-lg border border-border/40 p-3 sm:p-4">
								<div className="flex items-center gap-2 sm:gap-3">
									<Settings className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
									<div>
										<div className="font-medium text-sm sm:text-base">Wallet Preferences</div>
										<div className="text-xs sm:text-sm text-muted-foreground">
											Currency, notifications, and display options
										</div>
									</div>
								</div>
								<Button variant="outline" size="sm" className="h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3">
									Edit
								</Button>
							</div>

							<div className="flex items-center justify-between rounded-lg border border-border/40 p-3 sm:p-4">
								<div className="flex items-center gap-2 sm:gap-3">
									<Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
									<div>
										<div className="font-medium text-sm sm:text-base">Sharing & Permissions</div>
										<div className="text-xs sm:text-sm text-muted-foreground">Manage who can access this wallet</div>
									</div>
								</div>
								<Button variant="outline" size="sm" className="h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3">
									Manage
								</Button>
							</div>

							<div className="flex items-center justify-between rounded-lg border border-border/40 p-3 sm:p-4">
								<div className="flex items-center gap-2 sm:gap-3">
									<Download className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
									<div>
										<div className="font-medium text-sm sm:text-base">Export Data</div>
										<div className="text-xs sm:text-sm text-muted-foreground">
											Download transaction history and statements
										</div>
									</div>
								</div>
								<Button variant="outline" size="sm" className="h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3">
									Export
								</Button>
							</div>

							<div className="mt-4 sm:mt-6 rounded-lg border border-border/40 bg-destructive/10 p-3 sm:p-4">
								<div className="flex items-center gap-2 sm:gap-3">
									<AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
									<div>
										<div className="font-medium text-sm sm:text-base text-destructive">Danger Zone</div>
										<div className="text-xs sm:text-sm text-muted-foreground">
											Actions that cannot be undone, such as deleting this wallet
										</div>
									</div>
								</div>
								<Button variant="destructive" size="sm" className="mt-2 sm:mt-3 h-7 sm:h-8 text-xs sm:text-sm">
									Delete Wallet
								</Button>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
}
