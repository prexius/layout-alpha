"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, Target } from "lucide-react"
import { useState } from "react"
import {
	Area,
	AreaChart,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ReferenceLine,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts"

const data = [
	{ name: "Jan", savings: 1000, goal: 800 },
	{ name: "Feb", savings: 1500, goal: 900 },
	{ name: "Mar", savings: 2000, goal: 1000 },
	{ name: "Apr", savings: 1800, goal: 1100 },
	{ name: "May", savings: 2200, goal: 1200 },
	{ name: "Jun", savings: 2500, goal: 1300 },
	{ name: "Jul", savings: 3000, goal: 1400 },
]

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
				<p className="text-sm font-medium mb-1">{label}</p>
				<div className="flex flex-col gap-1">
					<p className="text-xs flex items-center">
						<span className="w-2 h-2 rounded-full bg-primary mr-1.5"></span>
						<span className="text-muted-foreground mr-1">Savings:</span>
						<span className="font-medium">${payload[0].value.toLocaleString()}</span>
					</p>
					<p className="text-xs flex items-center">
						<span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
						<span className="text-muted-foreground mr-1">Goal:</span>
						<span className="font-medium">${payload[1].value.toLocaleString()}</span>
					</p>
				</div>
			</div>
		)
	}
	return null
}

export function SavingsReport({ detailed = false }) {
	const [hoveredIndex, setHoveredIndex] = useState(null)

	const currentSavings = data[data.length - 1].savings
	const previousSavings = data[data.length - 2].savings
	const savingsChange = (((currentSavings - previousSavings) / previousSavings) * 100).toFixed(1)

	const totalSaved = data.reduce((sum, item) => sum + item.savings, 0)
	const annualGoal = 15000
	const progressPercentage = Math.min(100, ((totalSaved / annualGoal) * 100).toFixed(0))

	return (
		<Card className="w-full overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div>
						<div className="flex items-center gap-2">
							<CardTitle className="text-xl font-semibold tracking-tight">Savings Growth</CardTitle>
							<Badge
								variant="outline"
								className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-200 dark:border-green-800"
							>
								+{savingsChange}%
							</Badge>
						</div>
						<CardDescription className="text-sm text-muted-foreground">
							Track your savings progress over time
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className={detailed ? "h-[400px]" : "h-[300px]"}>
				<div className="flex flex-col h-full">
					{detailed && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
							>
								<span className="text-sm text-muted-foreground">Current Savings</span>
								<div className="text-2xl font-semibold mt-1">${currentSavings.toLocaleString()}</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
							>
								<span className="text-sm text-muted-foreground">Total Saved</span>
								<div className="text-2xl font-semibold mt-1">${totalSaved.toLocaleString()}</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex flex-col"
							>
								<div className="flex justify-between items-center">
									<span className="text-sm text-muted-foreground">Annual Goal</span>
									<Target className="h-4 w-4 text-amber-500" />
								</div>
								<div className="text-2xl font-semibold mt-1">${annualGoal.toLocaleString()}</div>
								<div className="mt-2 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
									<div className="h-full bg-amber-500 rounded-full" style={{ width: `${progressPercentage}%` }} />
								</div>
								<div className="flex justify-between mt-1">
									<span className="text-xs text-muted-foreground">{progressPercentage}% complete</span>
									<span className="text-xs font-medium">
										${totalSaved.toLocaleString()} / ${annualGoal.toLocaleString()}
									</span>
								</div>
							</motion.div>
						</div>
					)}

					<div className="flex-1">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								data={data}
								margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
								onMouseMove={(e) => {
									if (e.activeTooltipIndex !== undefined) {
										setHoveredIndex(e.activeTooltipIndex)
									}
								}}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<defs>
									<linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
								<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 12 }}
									tickFormatter={(value) => `$${value}`}
								/>
								<RechartsTooltip content={<CustomTooltip />} />
								<ReferenceLine y={0} stroke="#e5e7eb" />
								<Area
									type="monotone"
									dataKey="goal"
									stroke="#f59e0b"
									strokeWidth={2}
									strokeDasharray="5 5"
									fill="none"
									dot={false}
								/>
								<Area
									type="monotone"
									dataKey="savings"
									stroke="#7c3aed"
									strokeWidth={2}
									fillOpacity={1}
									fill="url(#colorSavings)"
									activeDot={{
										r: 6,
										stroke: "#fff",
										strokeWidth: 2,
										fill: "#7c3aed",
									}}
									dot={(props) => {
										const { cx, cy, index } = props
										return (
											<circle
											key={`dot-${index}`}
												cx={cx}
												cy={cy}
												r={hoveredIndex === index ? 6 : 0}
												stroke="#fff"
												strokeWidth={2}
												fill="#7c3aed"
												className="transition-all duration-300"
											/>
										)
									}}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>

					{detailed && (
						<div className="mt-4 flex justify-end">
							<Button variant="link" className="text-sm text-primary font-medium p-0 h-auto gap-1 hover:no-underline">
								View detailed savings plan
								<ArrowRight className="h-3.5 w-3.5" />
							</Button>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default SavingsReport
