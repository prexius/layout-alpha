"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { ArrowUpRight, Info } from "lucide-react"
import { useState } from "react"
import { Cell, Legend, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

const data = [
	{ name: "Housing", value: 1200, color: "#7c3aed" },
	{ name: "Food", value: 500, color: "#8b5cf6" },
	{ name: "Transportation", value: 300, color: "#a78bfa" },
	{ name: "Entertainment", value: 200, color: "#c4b5fd" },
	{ name: "Utilities", value: 150, color: "#ddd6fe" },
	{ name: "Other", value: 250, color: "#ede9fe" },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5
	const x = cx + radius * Math.cos(-midAngle * RADIAN)
	const y = cy + radius * Math.sin(-midAngle * RADIAN)

	return percent > 0.05 ? (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
			className="text-xs font-medium"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	) : null
}

export function CategoryBreakdown({ detailed = false }) {
	const [activeIndex, setActiveIndex] = useState(null)
	const total = data.reduce((sum, item) => sum + item.value, 0)

	const onPieEnter = (_, index) => {
		setActiveIndex(index)
	}

	const onPieLeave = () => {
		setActiveIndex(null)
	}

	return (
		<Card className="w-full overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-xl font-semibold tracking-tight">Expense Categories</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Breakdown of your expenses by category
						</CardDescription>
					</div>
					{detailed && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
										<Info className="h-4 w-4 text-muted-foreground" />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>View your spending patterns across categories</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
				</div>
			</CardHeader>
			<CardContent className={detailed ? "h-[450px]" : "h-[350px]"}>
				<div className="flex flex-col md:flex-row items-center justify-between h-full">
					<div className={detailed ? "w-full md:w-2/3 h-full" : "w-full h-full"}>
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={data}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={renderCustomizedLabel}
									outerRadius={detailed ? 140 : 120}
									innerRadius={detailed ? 70 : 50}
									fill="#8884d8"
									dataKey="value"
									onMouseEnter={onPieEnter}
									onMouseLeave={onPieLeave}
									animationBegin={0}
									animationDuration={1000}
								>
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
											stroke={activeIndex === index ? "#fff" : "transparent"}
											strokeWidth={activeIndex === index ? 2 : 0}
											className="transition-all duration-200"
										/>
									))}
								</Pie>
								<RechartsTooltip
									formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.9)",
										borderRadius: "0.5rem",
										border: "none",
										boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
										padding: "0.75rem",
									}}
								/>
								<Legend
									layout="horizontal"
									verticalAlign="bottom"
									align="center"
									formatter={(value, entry, index) => <span className="text-xs font-medium">{value}</span>}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>

					{detailed && (
						<div className="w-full md:w-1/3 mt-4 md:mt-0 md:pl-6 space-y-4">
							<h4 className="text-sm font-semibold">Top Expenses</h4>
							<div className="space-y-3">
								{data.slice(0, 3).map((item, index) => (
									<motion.div
										key={item.name}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm"
									>
										<div className="flex items-center gap-3">
											<div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
											<span className="text-sm font-medium">{item.name}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-semibold">${item.value.toLocaleString()}</span>
											<span className="text-xs text-muted-foreground">{((item.value / total) * 100).toFixed(0)}%</span>
										</div>
									</motion.div>
								))}

								<button className="flex items-center text-xs text-primary font-medium mt-2 hover:underline">
									View all categories
									<ArrowUpRight className="ml-1 h-3 w-3" />
								</button>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default CategoryBreakdown
