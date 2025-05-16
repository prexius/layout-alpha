"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Download, TrendingUp } from "lucide-react"
import { useState } from "react"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip as RechartsTooltip,
	ReferenceLine,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts"

const data = [
	{ name: "Jan", income: 4000, expenses: 2400, savings: 1600 },
	{ name: "Feb", income: 3000, expenses: 1398, savings: 1602 },
	{ name: "Mar", income: 2000, expenses: 1800, savings: 200 },
	{ name: "Apr", income: 2780, expenses: 1908, savings: 872 },
	{ name: "May", income: 1890, expenses: 1800, savings: 90 },
	{ name: "Jun", income: 2390, expenses: 1800, savings: 590 },
	{ name: "Jul", income: 3490, expenses: 2300, savings: 1190 },
]

const quarterlyData = [
	{ name: "Q1", income: 9000, expenses: 5598, savings: 3402 },
	{ name: "Q2", income: 7060, expenses: 5508, savings: 1552 },
]

const yearlyData = [
	{ name: "2023", income: 32000, expenses: 19200, savings: 12800 },
	{ name: "2024", income: 35550, expenses: 21000, savings: 14550 },
]

export function IncomeExpenseReport({ detailed = false }) {
	const [period, setPeriod] = useState("monthly")

	const currentData = period === "monthly" ? data : period === "quarterly" ? quarterlyData : yearlyData

	const totalIncome = currentData.reduce((sum, item) => sum + item.income, 0)
	const totalExpenses = currentData.reduce((sum, item) => sum + item.expenses, 0)
	const totalSavings = totalIncome - totalExpenses
	const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1)

	const incomeChange = 12.5 // Percentage change from previous period
	const expenseChange = -5.2 // Percentage change from previous period

	return (
		<Card className="w-full overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-xl font-semibold tracking-tight">Income vs Expenses</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Compare your income and expenses over time
						</CardDescription>
					</div>
					{detailed && (
						<Button variant="outline" size="sm" className="h-8 gap-1">
							<Download className="h-3.5 w-3.5" />
							<span className="text-xs">Export</span>
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				{detailed && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
						>
							<div className="flex justify-between items-start mb-2">
								<span className="text-sm text-muted-foreground">Total Income</span>
								<div
									className={`flex items-center text-xs px-1.5 py-0.5 rounded-full ${incomeChange > 0 ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-950" : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-950"}`}
								>
									{incomeChange > 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
									{Math.abs(incomeChange)}%
								</div>
							</div>
							<div className="text-2xl font-semibold">${totalIncome.toLocaleString()}</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
						>
							<div className="flex justify-between items-start mb-2">
								<span className="text-sm text-muted-foreground">Total Expenses</span>
								<div
									className={`flex items-center text-xs px-1.5 py-0.5 rounded-full ${expenseChange < 0 ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-950" : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-950"}`}
								>
									{expenseChange < 0 ? (
										<ArrowDown className="h-3 w-3 mr-0.5" />
									) : (
										<ArrowUp className="h-3 w-3 mr-0.5" />
									)}
									{Math.abs(expenseChange)}%
								</div>
							</div>
							<div className="text-2xl font-semibold">${totalExpenses.toLocaleString()}</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
						>
							<div className="flex justify-between items-start mb-2">
								<span className="text-sm text-muted-foreground">Savings Rate</span>
								<div className="flex items-center text-xs text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-950 px-1.5 py-0.5 rounded-full">
									<TrendingUp className="h-3 w-3 mr-0.5" />
									Good
								</div>
							</div>
							<div className="text-2xl font-semibold">{savingsRate}%</div>
						</motion.div>
					</div>
				)}

				<Tabs defaultValue="monthly" onValueChange={setPeriod} className="w-full">
					<TabsList className="mb-4 grid w-full grid-cols-3 h-9">
						<TabsTrigger value="monthly" className="text-xs">
							Monthly
						</TabsTrigger>
						<TabsTrigger value="quarterly" className="text-xs">
							Quarterly
						</TabsTrigger>
						<TabsTrigger value="yearly" className="text-xs">
							Yearly
						</TabsTrigger>
					</TabsList>

					<div className={detailed ? "h-[350px]" : "h-[300px]"}>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={currentData}
								margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
								barGap={4}
								barSize={detailed ? 30 : 20}
							>
								<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
								<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 12 }}
									tickFormatter={(value) => `$${value}`}
								/>
								<RechartsTooltip
									formatter={(value, name) => [
										`$${value.toLocaleString()}`,
										name === "income" ? "Income" : name === "expenses" ? "Expenses" : "Savings",
									]}
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.9)",
										borderRadius: "0.5rem",
										border: "none",
										boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
										padding: "0.75rem",
									}}
								/>
								<Legend
									verticalAlign="top"
									height={36}
									formatter={(value) => <span className="text-xs capitalize">{value}</span>}
								/>
								<ReferenceLine y={0} stroke="#e5e7eb" />
								<Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} animationDuration={1500} />
								<Bar
									dataKey="expenses"
									name="Expenses"
									fill="#ef4444"
									radius={[4, 4, 0, 0]}
									animationDuration={1500}
									animationBegin={300}
								/>
								{detailed && (
									<Bar
										dataKey="savings"
										name="Savings"
										fill="#3b82f6"
										radius={[4, 4, 0, 0]}
										animationDuration={1500}
										animationBegin={600}
									/>
								)}
							</BarChart>
						</ResponsiveContainer>
					</div>
				</Tabs>
			</CardContent>
		</Card>
	)
}

export default IncomeExpenseReport
