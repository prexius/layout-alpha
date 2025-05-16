"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { PlusCircle, Search, SlidersHorizontal, Edit, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Card } from "../ui/card"

export function BudgetCategoriesTab({ categories }) {
	const [searchQuery, setSearchQuery] = useState("")
	const [hoveredCategory, setHoveredCategory] = useState(null)

	// Format currency
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value)
	}

	const getStatusColor = (status) => {
		switch (status) {
			case "on-track":
				return "bg-emerald-500"
			case "warning":
				return "bg-amber-500"
			case "exceeded":
				return "bg-destructive"
			default:
				return "bg-emerald-500"
		}
	}

	const getStatusBadge = (status, percentUsed) => {
		switch (status) {
			case "on-track":
				return (
					<Badge variant="success" size="sm">
						On Track
					</Badge>
				)
			case "warning":
				return (
					<Badge variant="warning" size="sm">
						Warning
					</Badge>
				)
			case "exceeded":
				return (
					<Badge variant="destructive" size="sm">
						Exceeded
					</Badge>
				)
			default:
				return (
					<Badge variant="success" size="sm">
						On Track
					</Badge>
				)
		}
	}

	const getProgressColor = (percentUsed) => {
		if (percentUsed >= 100) return "bg-destructive"
		if (percentUsed >= 85) return "bg-amber-500"
		return "bg-emerald-500"
	}

	// Filter categories based on search query
	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<Card className="space-y-6 p-4">
			<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
				<div className="relative w-full sm:w-64">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search categories..."
						className="pl-9 h-9 w-full"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="flex gap-2 w-full sm:w-auto">
					<Button variant="outline" size="sm" className="h-9 gap-1">
						<SlidersHorizontal className="h-4 w-4" />
						<span className="hidden sm:inline">Filter</span>
					</Button>
					<Button asChild className="ml-auto sm:ml-0">
						<Link href="/budget/create">
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Category
						</Link>
					</Button>
				</div>
			</div>

			<div className="rounded-xl border border-border/40 overflow-hidden">
				<div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted/50">
					<div className="col-span-4">Category</div>
					<div className="col-span-2 text-right">Budgeted</div>
					<div className="col-span-2 text-right">Spent</div>
					<div className="col-span-2 text-right">Remaining</div>
					<div className="col-span-2 text-right">Progress</div>
				</div>

				<div className="divide-y">
					{filteredCategories.length > 0 ? (
						filteredCategories.map((category, index) => (
							<motion.div
								key={category.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2, delay: index * 0.05 }}
								onHoverStart={() => setHoveredCategory(category.id)}
								onHoverEnd={() => setHoveredCategory(null)}
							>
								<div
									className={cn(
										"grid grid-cols-12 gap-4 p-4 items-center transition-colors relative",
										hoveredCategory === category.id ? "bg-muted/50" : "",
									)}
								>
									{/* Hover indicator */}
									{hoveredCategory === category.id && (
										<motion.div
											className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "100%" }}
											transition={{ duration: 0.2 }}
										/>
									)}

									<div className="col-span-4 flex items-center gap-3">
										<div className={`w-3 h-3 rounded-full ${getStatusColor(category.status)}`}></div>
										<span className="font-medium">{category.name}</span>
										<div className="hidden sm:block">{getStatusBadge(category.status, category.percentUsed)}</div>
									</div>
									<div className="col-span-2 text-right font-medium">{formatCurrency(category.budgeted)}</div>
									<div className="col-span-2 text-right">{formatCurrency(category.spent)}</div>
									<div
										className={cn(
											"col-span-2 text-right font-medium",
											category.remaining < 0 ? "text-destructive" : "",
										)}
									>
										{formatCurrency(category.remaining)}
									</div>
									<div className="col-span-2">
										<div className="flex items-center justify-end gap-2">
											<Progress
												value={Math.min(category.percentUsed, 100)}
												max={100}
												className="h-2 w-24"
												indicatorClassName={getProgressColor(category.percentUsed)}
											/>
											<span className="text-xs w-12 text-right">{category.percentUsed.toFixed(0)}%</span>
										</div>
									</div>

									{/* Action button that appears on hover */}
									{hoveredCategory === category.id && (
										<motion.div
											className="absolute right-4 top-1/2 transform -translate-y-1/2"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.2 }}
										>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>
														<Edit className="mr-2 h-4 w-4" />
														Edit Category
													</DropdownMenuItem>
													<DropdownMenuItem>View Transactions</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem className="text-destructive">Delete Category</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</motion.div>
									)}
								</div>
							</motion.div>
						))
					) : (
						<div className="p-8 text-center text-muted-foreground">No categories found matching your search.</div>
					)}
				</div>
			</div>
		</Card>
	)
}
