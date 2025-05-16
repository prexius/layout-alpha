"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CreateBudgetPage() {
	const [activeTab, setActiveTab] = useState("details")
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
	const categories = [
		{ id: "c1", name: "Housing", amount: 1200 },
		{ id: "c2", name: "Groceries", amount: 500 },
		{ id: "c3", name: "Dining Out", amount: 300 },
		{ id: "c4", name: "Transportation", amount: 200 },
		{ id: "c5", name: "Entertainment", amount: 150 },
		{ id: "c6", name: "Utilities", amount: 250 },
	]

	const wallets = [
		{ id: "w1", name: "Main Savings" },
		{ id: "w2", name: "Emergency Fund" },
		{ id: "w3", name: "Travel Budget" },
	]

	// Handle tab navigation
	const handleTabChange = (value) => {
		setActiveTab(value)
	}

	// Handle continue button clicks
	const handleContinue = () => {
		if (activeTab === "details") setActiveTab("categories")
		else if (activeTab === "categories") setActiveTab("review")
	}

	// Handle back button clicks
	const handleBack = () => {
		if (activeTab === "categories") setActiveTab("details")
		else if (activeTab === "review") setActiveTab("categories")
	}

	return (
		<Layout>
			<div className="px-2 sm:px-0">
				<div className="mx-auto max-w-3xl">
					<div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
						<Button variant="outline" size="icon" asChild className="h-8 w-8 sm:h-10 sm:w-10">
							<Link href="/budget">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Link>
						</Button>
						<h1 className="text-lg sm:text-xl font-semibold">Create New Budget</h1>
					</div>

					<Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
						<ScrollArea className="w-full pb-2" orientation="horizontal">
							<TabsList className="inline-flex w-full min-w-max">
								<TabsTrigger value="details" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
									Budget Details
								</TabsTrigger>
								<TabsTrigger value="categories" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
									Categories
								</TabsTrigger>
								<TabsTrigger value="review" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
									{isMobile ? "Review" : "Review & Save"}
								</TabsTrigger>
							</TabsList>
						</ScrollArea>

						<TabsContent value="details" className="mt-4 sm:mt-6">
							<Card>
								<CardHeader className="pb-4 sm:pb-6">
									<CardTitle className="text-base sm:text-lg">Budget Information</CardTitle>
									<CardDescription className="text-xs sm:text-sm">
										Set up the basic details for your new budget.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="budget-name" className="text-xs sm:text-sm">
											Budget Name
										</Label>
										<Input id="budget-name" placeholder="e.g. April 2023 Budget" className="h-9 sm:h-10 text-sm" />
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="budget-period" className="text-xs sm:text-sm">
												Budget Period
											</Label>
											<Select defaultValue="monthly">
												<SelectTrigger id="budget-period" className="h-9 sm:h-10 text-xs sm:text-sm">
													<SelectValue placeholder="Select period" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="weekly">Weekly</SelectItem>
													<SelectItem value="biweekly">Bi-weekly</SelectItem>
													<SelectItem value="monthly">Monthly</SelectItem>
													<SelectItem value="quarterly">Quarterly</SelectItem>
													<SelectItem value="annual">Annual</SelectItem>
													<SelectItem value="custom">Custom</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<Label htmlFor="budget-month" className="text-xs sm:text-sm">
												Month
											</Label>
											<Select defaultValue="april">
												<SelectTrigger id="budget-month" className="h-9 sm:h-10 text-xs sm:text-sm">
													<SelectValue placeholder="Select month" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="january">January 2023</SelectItem>
													<SelectItem value="february">February 2023</SelectItem>
													<SelectItem value="march">March 2023</SelectItem>
													<SelectItem value="april">April 2023</SelectItem>
													<SelectItem value="may">May 2023</SelectItem>
													<SelectItem value="june">June 2023</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="total-amount" className="text-xs sm:text-sm">
											Total Budget Amount
										</Label>
										<div className="relative">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
											<Input
												id="total-amount"
												type="number"
												min="0"
												step="0.01"
												placeholder="0.00"
												className="pl-8 h-9 sm:h-10 text-sm"
												defaultValue="3500"
											/>
										</div>
										<p className="text-[10px] sm:text-xs text-muted-foreground">
											This is the total amount you plan to budget for this period.
										</p>
									</div>

									<div className="space-y-2">
										<Label htmlFor="primary-wallet" className="text-xs sm:text-sm">
											Primary Wallet
										</Label>
										<Select defaultValue="w1">
											<SelectTrigger id="primary-wallet" className="h-9 sm:h-10 text-xs sm:text-sm">
												<SelectValue placeholder="Select wallet" />
											</SelectTrigger>
											<SelectContent>
												{wallets.map((wallet) => (
													<SelectItem key={wallet.id} value={wallet.id}>
														{wallet.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<p className="text-[10px] sm:text-xs text-muted-foreground">
											The wallet from which this budget will be funded.
										</p>
									</div>

									<div className="space-y-2">
										<Label htmlFor="budget-notes" className="text-xs sm:text-sm">
											Notes (Optional)
										</Label>
										<Input
											id="budget-notes"
											placeholder="Add any notes about this budget"
											className="h-9 sm:h-10 text-sm"
										/>
									</div>
								</CardContent>
								<CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between pt-4 sm:pt-6">
									<Button variant="outline" asChild className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm">
										<Link href="/budget">Cancel</Link>
									</Button>
									<Button className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm" onClick={handleContinue}>
										Continue to Categories
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>

						<TabsContent value="categories" className="mt-4 sm:mt-6">
							<Card>
								<CardHeader className="pb-4 sm:pb-6">
									<CardTitle className="text-base sm:text-lg">Budget Categories</CardTitle>
									<CardDescription className="text-xs sm:text-sm">
										Allocate your budget across different spending categories.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4 sm:space-y-6">
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
										<div>
											<h3 className="text-base sm:text-lg font-medium">Total Budget: $3,500.00</h3>
											<p className="text-xs sm:text-sm text-muted-foreground">
												Allocated: $2,600.00 | Remaining: $900.00
											</p>
										</div>
										<Button variant="outline" size="sm" className="h-9 sm:h-10 text-xs sm:text-sm">
											<Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
											Add Category
										</Button>
									</div>

									<Separator />

									<div className="space-y-3 sm:space-y-4">
										{categories.map((category, index) => (
											<div key={category.id} className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
												<div className="col-span-5 sm:col-span-5">
													<Label htmlFor={`category-${index}`} className="sr-only">
														Category Name
													</Label>
													<Input
														id={`category-${index}`}
														defaultValue={category.name}
														className="h-9 sm:h-10 text-xs sm:text-sm"
													/>
												</div>
												<div className="col-span-5 sm:col-span-5">
													<Label htmlFor={`amount-${index}`} className="sr-only">
														Amount
													</Label>
													<div className="relative">
														<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
															$
														</span>
														<Input
															id={`amount-${index}`}
															type="number"
															min="0"
															step="0.01"
															className="pl-8 h-9 sm:h-10 text-xs sm:text-sm"
															defaultValue={category.amount}
														/>
													</div>
												</div>
												<div className="col-span-2 flex justify-end">
													<Button
														variant="ghost"
														size="icon"
														className="text-muted-foreground hover:text-destructive h-8 w-8"
													>
														<Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
														<span className="sr-only">Delete category</span>
													</Button>
												</div>
											</div>
										))}
									</div>
								</CardContent>
								<CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between pt-4 sm:pt-6">
									<Button
										variant="outline"
										className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm"
										onClick={handleBack}
									>
										Back to Details
									</Button>
									<Button className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm" onClick={handleContinue}>
										Continue to Review
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>

						<TabsContent value="review" className="mt-4 sm:mt-6">
							<Card>
								<CardHeader className="pb-4 sm:pb-6">
									<CardTitle className="text-base sm:text-lg">Review Your Budget</CardTitle>
									<CardDescription className="text-xs sm:text-sm">
										Confirm the details before saving your budget.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4 sm:space-y-6">
									<div className="rounded-lg border p-3 sm:p-4 space-y-3 sm:space-y-4">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
											<div>
												<h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Budget Name</h4>
												<p className="text-sm">April 2023 Budget</p>
											</div>
											<div>
												<h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Period</h4>
												<p className="text-sm">Monthly (April 2023)</p>
											</div>
											<div>
												<h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Amount</h4>
												<p className="text-sm">$3,500.00</p>
											</div>
											<div>
												<h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Primary Wallet</h4>
												<p className="text-sm">Main Savings</p>
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-base sm:text-lg font-medium mb-2">Category Allocation</h3>
										<div className="rounded-lg border overflow-hidden">
											<div className="grid grid-cols-12 gap-2 sm:gap-4 p-2 sm:p-3 font-medium text-xs sm:text-sm bg-muted/50">
												<div className="col-span-6">Category</div>
												<div className="col-span-3 text-right">Amount</div>
												<div className="col-span-3 text-right">% of Total</div>
											</div>

											<ScrollArea className="max-h-[250px] sm:max-h-none">
												{categories.map((category) => (
													<div key={category.id} className="grid grid-cols-12 gap-2 sm:gap-4 p-2 sm:p-3 border-t">
														<div className="col-span-6 text-xs sm:text-sm truncate">{category.name}</div>
														<div className="col-span-3 text-right text-xs sm:text-sm">
															${category.amount.toLocaleString()}
														</div>
														<div className="col-span-3 text-right text-xs sm:text-sm">
															{((category.amount / 3500) * 100).toFixed(1)}%
														</div>
													</div>
												))}
											</ScrollArea>

											<div className="grid grid-cols-12 gap-2 sm:gap-4 p-2 sm:p-3 border-t bg-muted/30 font-medium">
												<div className="col-span-6 text-xs sm:text-sm">Unallocated</div>
												<div className="col-span-3 text-right text-xs sm:text-sm">$900.00</div>
												<div className="col-span-3 text-right text-xs sm:text-sm">25.7%</div>
											</div>
										</div>
									</div>
								</CardContent>
								<CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between pt-4 sm:pt-6">
									<Button
										variant="outline"
										className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm"
										onClick={handleBack}
									>
										Back to Categories
									</Button>
									<Button className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm">Save Budget</Button>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</Layout>
	)
}
