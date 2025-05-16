"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Car, GraduationCap, Home, MoreHorizontal, Plane, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function FinancialGoals({ className }) {
	const [hoveredGoal, setHoveredGoal] = useState(null)

	// Format currency
	const formatCurrency = (value, currency = "USD") => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value)
	}

	// Mock data for demonstration
	const goals = [
		{
			id: "g1",
			name: "Vacation Fund",
			target: 5000,
			current: 3250,
			deadline: "2023-12-15",
			icon: Plane,
			progress: 65,
		},
		{
			id: "g2",
			name: "New Car",
			target: 25000,
			current: 12500,
			deadline: "2024-06-30",
			icon: Car,
			progress: 50,
		},
		{
			id: "g3",
			name: "Home Down Payment",
			target: 50000,
			current: 15000,
			deadline: "2025-01-15",
			icon: Home,
			progress: 30,
		},
		{
			id: "g4",
			name: "Education Fund",
			target: 20000,
			current: 8000,
			deadline: "2024-09-01",
			icon: GraduationCap,
			progress: 40,
		},
	]

	return (
		<Card className={cn("overflow-hidden", className)}>
			<CardHeader className="flex flex-row items-center justify-between pb-3">
				<div>
					<CardTitle className="text-xl">Financial Goals</CardTitle>
					<CardDescription>Track your progress towards your financial targets</CardDescription>
				</div>
				<Link href="/goals/create">
					<Button size="sm" className="h-9 gap-1">
						<PlusCircle className="h-4 w-4" />
						Add Goal
					</Button></Link>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{goals.map((goal, index) => {
						const Icon = goal.icon
						const progress = Math.round((goal.current / goal.target) * 100)
						const deadline = new Date(goal.deadline).toLocaleDateString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})

						return (
							<motion.div
								key={goal.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2, delay: index * 0.1 }}
								onHoverStart={() => setHoveredGoal(goal.id)}
								onHoverEnd={() => setHoveredGoal(null)}
							>
								<div
									className={cn(
										"rounded-lg border border-border/40 p-4 transition-all duration-200",
										hoveredGoal === goal.id ? "bg-muted/50" : "",
									)}
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
												<Icon className="h-5 w-5 text-primary" />
											</div>
											<div>
												<div className="font-medium">{goal.name}</div>
												<div className="text-sm text-muted-foreground">Target: {formatCurrency(goal.target)}</div>
											</div>
										</div>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>Edit Goal</DropdownMenuItem>
												<DropdownMenuItem>Add Funds</DropdownMenuItem>
												<DropdownMenuItem>View Details</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>

									<div className="mt-4">
										<div className="mb-1 flex items-center justify-between text-sm">
											<span>
												{formatCurrency(goal.current)} of {formatCurrency(goal.target)}
											</span>
											<Badge variant={progress >= 75 ? "success" : progress >= 50 ? "info" : "secondary"} size="sm">
												{progress}%
											</Badge>
										</div>
										<Progress
											value={progress}
											className="h-2"
											indicatorClassName={
												progress >= 75 ? "bg-emerald-500" : progress >= 50 ? "bg-blue-500" : "bg-primary"
											}
										/>
									</div>

									<div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
										<span>Deadline: {deadline}</span>
										<span>{formatCurrency(goal.target - goal.current)} remaining</span>
									</div>
								</div>
							</motion.div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
