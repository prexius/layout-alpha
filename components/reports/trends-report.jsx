"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useState } from "react"
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts"

const data = [
	{ name: "Jan", spending: 2400, income: 4000, savings: 1600 },
	{ name: "Feb", spending: 1398, income: 3000, savings: 1602 },
	{ name: "Mar", spending: 9800, income: 2000, savings: -7800 },
	{ name: "Apr", spending: 3908, income: 2780, savings: -1128 },
	{ name: "May", spending: 4800, income: 1890, savings: -2910 },
	{ name: "Jun", spending: 3800, income: 2390, savings: -1410 },
	{ name: "Jul", spending: 4300, income: 3490, savings: -810 },
]

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
				<p className="text-sm font-medium mb-1">{label}</p>
				<div className="flex flex-col gap-1">
					{payload.map((entry, index) => (
						<p key={`item-${index}`} className="text-xs flex items-center">
							<span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }}></span>
							<span className="text-muted-foreground mr-1">{entry.name}:</span>
							<span className="font-medium">${Math.abs(entry.value).toLocaleString()}</span>
							{entry.name === "Savings" && entry.value < 0 && (
								<Badge variant="destructive" className="ml-1.5 text-[10px] h-4 px-1">
									Deficit
								</Badge>
							)}
						</p>
					))}
				</div>
			</div>
		)
	}
	return null
}

export function TrendsReport({ detailed = false }) {
	const [metric, setMetric] = useState("all")

	const getMetricData = () => {
		if (metric === "all") return data

		return data.map((item) => ({
			name: item.name,
			[metric]: item[metric],
		}))
	}

	const getMetricColor = (metricName) => {
		switch (metricName) {
			case "income":
				return "#22c55e"
			case "spending":
				return "#ef4444"
			case "savings":
				return "#3b82f6"
			default:
				return "#8884d8"
		}
	}

	const renderLines = () => {
		if (metric === "all") {
			return ["income", "spending", "savings"].map((metricName) => (
				<Line
					key={metricName}
					type="monotone"
					dataKey={metricName}
					name={metricName.charAt(0).toUpperCase() + metricName.slice(1)}
					stroke={getMetricColor(metricName)}
					strokeWidth={2}
					dot={{ r: 4, strokeWidth: 2, fill: "white" }}
					activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
				/>
			))
		}

		return (
			<Line
				type="monotone"
				dataKey={metric}
				name={metric.charAt(0).toUpperCase() + metric.slice(1)}
				stroke={getMetricColor(metric)}
				strokeWidth={3}
				dot={{ r: 4, strokeWidth: 2, fill: "white" }}
				activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
			/>
		)
	}

	return (
		<Card className="w-full overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-xl font-semibold tracking-tight">Financial Trends</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Analyze your financial patterns over time
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="all" onValueChange={setMetric} className="w-full">
					<TabsList className="mb-4 grid w-full grid-cols-4 h-9">
						<TabsTrigger value="all" className="text-xs">
							All Metrics
						</TabsTrigger>
						<TabsTrigger value="income" className="text-xs">
							Income
						</TabsTrigger>
						<TabsTrigger value="spending" className="text-xs">
							Spending
						</TabsTrigger>
						<TabsTrigger value="savings" className="text-xs">
							Savings
						</TabsTrigger>
					</TabsList>

					<div className={detailed ? "h-[350px]" : "h-[300px]"}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={getMetricData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
								<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 12 }}
									tickFormatter={(value) => `$${Math.abs(value)}`}
								/>
								<RechartsTooltip content={<CustomTooltip />} />
								<Legend
									verticalAlign="top"
									height={36}
									formatter={(value) => <span className="text-xs">{value}</span>}
								/>
								{renderLines()}
							</LineChart>
						</ResponsiveContainer>
					</div>
				</Tabs>

				{detailed && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
					>
						<div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
							<div className="flex items-center gap-2 mb-1">
								<div className="w-3 h-3 rounded-full bg-green-500" />
								<span className="text-sm font-medium">Income Trend</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Your income has {data[data.length - 1].income > data[0].income ? "increased" : "decreased"} by{" "}
								{Math.abs((((data[data.length - 1].income - data[0].income) / data[0].income) * 100).toFixed(1))}% since
								January.
							</p>
						</div>

						<div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
							<div className="flex items-center gap-2 mb-1">
								<div className="w-3 h-3 rounded-full bg-red-500" />
								<span className="text-sm font-medium">Spending Trend</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Your spending has {data[data.length - 1].spending > data[0].spending ? "increased" : "decreased"} by{" "}
								{Math.abs((((data[data.length - 1].spending - data[0].spending) / data[0].spending) * 100).toFixed(1))}%
								since January.
							</p>
						</div>

						<div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
							<div className="flex items-center gap-2 mb-1">
								<div className="w-3 h-3 rounded-full bg-blue-500" />
								<span className="text-sm font-medium">Savings Trend</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Your savings rate is currently{" "}
								{((data[data.length - 1].savings / data[data.length - 1].income) * 100).toFixed(1)}% of your income.
							</p>
						</div>
					</motion.div>
				)}
			</CardContent>
		</Card>
	)
}

export default TrendsReport
