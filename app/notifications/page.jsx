import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
	return (
		<Layout>
			<div>
				<div className="mb-4 sm:mb-6">
					<h1 className="text-xl sm:text-2xl font-semibold">Notifications</h1>
					<p className="text-muted-foreground text-sm">Stay updated with your account activity.</p>
				</div>

				<div className="mx-auto max-w-4xl">
					<Card>
						<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-0">
							<div>
								<CardTitle>Your Notifications</CardTitle>
								<CardDescription>Stay updated with your account activity.</CardDescription>
							</div>
							<Button variant="outline" size="sm" className="mt-2 sm:mt-0">
								Mark All as Read
							</Button>
						</CardHeader>
						<CardContent>
							<Tabs defaultValue="all">
								<TabsList className="mb-4 sm:mb-6 w-full overflow-x-auto flex-nowrap">
									<TabsTrigger value="all">All</TabsTrigger>
									<TabsTrigger value="unread">Unread</TabsTrigger>
									<TabsTrigger value="transactions">Transactions</TabsTrigger>
									<TabsTrigger value="alerts">Alerts</TabsTrigger>
								</TabsList>

								<TabsContent value="all">
									<div className="space-y-4">
										{/* Unread notification */}
										<div className="relative rounded-lg border bg-muted/40 p-4">
											<div className="absolute left-2 top-4 h-2 w-2 rounded-full bg-blue-500" />
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Large Deposit Received</h3>
													<span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
												</div>
												<p className="text-sm text-muted-foreground">
													You received a deposit of $2,750.00 to your Main Savings wallet.
												</p>
											</div>
										</div>

										{/* Unread notification */}
										<div className="relative rounded-lg border bg-muted/40 p-4">
											<div className="absolute left-2 top-4 h-2 w-2 rounded-full bg-blue-500" />
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Monthly Budget Alert</h3>
													<span className="text-xs text-muted-foreground">Yesterday, 3:45 PM</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Your "Dining Out" budget is at 85% of its limit for this month.
												</p>
											</div>
										</div>

										{/* Read notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Bill Payment Reminder</h3>
													<span className="text-xs text-muted-foreground">Apr 15, 2023</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Your electric bill payment is due in 3 days. Set up automatic payment to avoid late fees.
												</p>
											</div>
										</div>

										{/* Read notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Savings Goal Achieved</h3>
													<span className="text-xs text-muted-foreground">Apr 10, 2023</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Congratulations! You've reached your "Emergency Fund" savings goal of $10,000.
												</p>
											</div>
										</div>

										{/* Read notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">New Feature Available</h3>
													<span className="text-xs text-muted-foreground">Apr 5, 2023</span>
												</div>
												<p className="text-sm text-muted-foreground">
													We've added new financial reports. Check them out in the Reports section.
												</p>
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="unread">
									<div className="space-y-4">
										{/* Unread notification */}
										<div className="relative rounded-lg border bg-muted/40 p-4">
											<div className="absolute left-2 top-4 h-2 w-2 rounded-full bg-blue-500" />
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Large Deposit Received</h3>
													<span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
												</div>
												<p className="text-sm text-muted-foreground">
													You received a deposit of $2,750.00 to your Main Savings wallet.
												</p>
											</div>
										</div>

										{/* Unread notification */}
										<div className="relative rounded-lg border bg-muted/40 p-4">
											<div className="absolute left-2 top-4 h-2 w-2 rounded-full bg-blue-500" />
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Monthly Budget Alert</h3>
													<span className="text-xs text-muted-foreground">Yesterday, 3:45 PM</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Your "Dining Out" budget is at 85% of its limit for this month.
												</p>
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="transactions">
									<div className="space-y-4">
										{/* Transaction notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Large Deposit Received</h3>
													<span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
												</div>
												<p className="text-sm text-muted-foreground">
													You received a deposit of $2,750.00 to your Main Savings wallet.
												</p>
											</div>
										</div>

										{/* Transaction notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Recurring Payment Processed</h3>
													<span className="text-xs text-muted-foreground">Apr 12, 2023</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Your monthly subscription payment of $14.99 was processed successfully.
												</p>
											</div>
										</div>

										{/* Transaction notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Transfer Completed</h3>
													<span className="text-xs text-muted-foreground">Apr 8, 2023</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Your transfer of $500.00 from Main Savings to Travel Budget has been completed.
												</p>
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="alerts">
									<div className="space-y-4">
										{/* Alert notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Monthly Budget Alert</h3>
													<span className="text-xs text-muted-foreground">Yesterday, 3:45 PM</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Your "Dining Out" budget is at 85% of its limit for this month.
												</p>
											</div>
										</div>

										{/* Alert notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Bill Payment Reminder</h3>
													<span className="text-xs text-muted-foreground">Apr 15, 2023</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Your electric bill payment is due in 3 days. Set up automatic payment to avoid late fees.
												</p>
											</div>
										</div>

										{/* Alert notification */}
										<div className="relative rounded-lg border p-4">
											<div className="pl-4">
												<div className="mb-1 flex items-center justify-between">
													<h3 className="font-medium">Low Balance Warning</h3>
													<span className="text-xs text-muted-foreground">Apr 3, 2023</span>
												</div>
												<p className="text-sm text-muted-foreground">
													Your Travel Budget wallet balance is below $200. Consider adding funds.
												</p>
											</div>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</div>
		</Layout>
	)
}
