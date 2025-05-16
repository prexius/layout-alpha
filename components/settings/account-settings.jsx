"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, CreditCard, PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"

export function AccountSettings() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [paymentType, setPaymentType] = useState("card")

	const bankAccounts = [
		{ id: 1, name: "Chase Checking", accountNumber: "****6789", type: "Checking" },
		{ id: 2, name: "Wells Fargo Savings", accountNumber: "****4321", type: "Savings" },
	]

	const cards = [
		{ id: 1, name: "Visa Platinum", lastFour: "5678", expiryDate: "05/26", type: "Credit" },
		{ id: 2, name: "Mastercard Gold", lastFour: "9012", expiryDate: "11/25", type: "Debit" },
	]

	return (
		<Tabs defaultValue="profile" className="w-full">
			<TabsList className="flex flex-wrap h-auto w-full mb-4">
				<TabsTrigger value="profile" className="flex-1 h-9 text-xs sm:text-sm md:text-base">
					Profile
				</TabsTrigger>
				<TabsTrigger value="bank-accounts-cards" className="flex-1 h-9 text-xs sm:text-sm md:text-base">
					Bank Accounts & Cards
				</TabsTrigger>
			</TabsList>

			<TabsContent value="profile" className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Account Information</h3>
					<p className="text-sm text-muted-foreground">Update your account details and personal information.</p>
				</div>
				<Separator />
				<div className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" defaultValue="John Doe" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" defaultValue="john.doe@example.com" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="username">Username</Label>
						<Input id="username" defaultValue="johndoe" />
					</div>
				</div>
				<Separator />
				<div className="space-y-4">
					<div>
						<h3 className="text-lg font-medium">Delete Account</h3>
						<p className="text-sm text-muted-foreground">Permanently delete your account and all of your data.</p>
					</div>
					<Button variant="destructive">Delete Account</Button>
				</div>
			</TabsContent>

			<TabsContent value="bank-accounts-cards" className="space-y-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<h3 className="text-lg font-medium">Payment Methods</h3>
						<p className="text-sm text-muted-foreground">Manage your bank accounts and cards.</p>
					</div>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button className="flex items-center gap-2 w-full sm:w-auto">
								<PlusCircle className="h-4 w-4" />
								Add New
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Add Payment Method</DialogTitle>
								<DialogDescription>Add a new bank account or card to your wallet.</DialogDescription>
							</DialogHeader>

							<div className="py-4 space-y-4">
								<RadioGroup
									defaultValue="card"
									value={paymentType}
									onValueChange={setPaymentType}
									className="flex flex-col sm:flex-row gap-4"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="card" id="card" />
										<Label htmlFor="card" className="flex items-center gap-2">
											<CreditCard className="h-4 w-4" /> Card
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="bank" id="bank" />
										<Label htmlFor="bank" className="flex items-center gap-2">
											<Building className="h-4 w-4" /> Bank Account
										</Label>
									</div>
								</RadioGroup>

								{paymentType === "card" ? (
									<div className="space-y-4">
										<div className="grid gap-2">
											<Label htmlFor="cardName">Name on Card</Label>
											<Input id="cardName" placeholder="John Doe" />
										</div>
										<div className="grid gap-2">
											<Label htmlFor="cardNumber">Card Number</Label>
											<Input id="cardNumber" placeholder="4111 1111 1111 1111" />
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="grid gap-2">
												<Label htmlFor="expiryDate">Expiry Date</Label>
												<Input id="expiryDate" placeholder="MM/YY" />
											</div>
											<div className="grid gap-2">
												<Label htmlFor="cvv">CVV</Label>
												<Input id="cvv" placeholder="123" />
											</div>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="cardType">Card Type</Label>
											<Select>
												<SelectTrigger id="cardType">
													<SelectValue placeholder="Select card type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="credit">Credit Card</SelectItem>
													<SelectItem value="debit">Debit Card</SelectItem>
													<SelectItem value="prepaid">Prepaid Card</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								) : (
									<div className="space-y-4">
										<div className="grid gap-2">
											<Label htmlFor="accountName">Account Name</Label>
											<Input id="accountName" placeholder="My Checking Account" />
										</div>
										<div className="grid gap-2">
											<Label htmlFor="accountNumber">Account Number</Label>
											<Input id="accountNumber" placeholder="123456789" />
										</div>
										<div className="grid gap-2">
											<Label htmlFor="routingNumber">Routing Number</Label>
											<Input id="routingNumber" placeholder="987654321" />
										</div>
										<div className="grid gap-2">
											<Label htmlFor="accountType">Account Type</Label>
											<Select>
												<SelectTrigger id="accountType">
													<SelectValue placeholder="Select account type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="checking">Checking</SelectItem>
													<SelectItem value="savings">Savings</SelectItem>
													<SelectItem value="business">Business</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								)}
							</div>

							<DialogFooter className="flex-col sm:flex-row gap-2">
								<Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
									Cancel
								</Button>
								<Button onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
									Add {paymentType === "card" ? "Card" : "Bank Account"}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<Separator />

				<div className="space-y-6">
					<div>
						<h4 className="text-md font-medium mb-4">Bank Accounts</h4>
						{bankAccounts.length > 0 ? (
							<div className="space-y-3">
								{bankAccounts.map((account) => (
									<div
										key={account.id}
										className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg"
									>
										<div className="flex items-center gap-3 mb-2 sm:mb-0">
											<Building className="h-8 w-8 text-muted-foreground" />
											<div>
												<p className="font-medium">{account.name}</p>
												<p className="text-sm text-muted-foreground">
													{account.accountNumber} • {account.type}
												</p>
											</div>
										</div>
										<Button variant="ghost" size="icon" className="ml-auto">
											<Trash2 className="h-4 w-4 text-destructive" />
										</Button>
									</div>
								))}
							</div>
						) : (
							<p className="text-sm text-muted-foreground">No bank accounts added yet.</p>
						)}
					</div>

					<div>
						<h4 className="text-md font-medium mb-4">Cards</h4>
						{cards.length > 0 ? (
							<div className="space-y-3">
								{cards.map((card) => (
									<div
										key={card.id}
										className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg"
									>
										<div className="flex items-center gap-3 mb-2 sm:mb-0">
											<CreditCard className="h-8 w-8 text-muted-foreground" />
											<div>
												<p className="font-medium">{card.name}</p>
												<p className="text-sm text-muted-foreground">
													•••• {card.lastFour} • Expires {card.expiryDate} • {card.type}
												</p>
											</div>
										</div>
										<Button variant="ghost" size="icon" className="ml-auto">
											<Trash2 className="h-4 w-4 text-destructive" />
										</Button>
									</div>
								))}
							</div>
						) : (
							<p className="text-sm text-muted-foreground">No cards added yet.</p>
						)}
					</div>
				</div>
			</TabsContent>
		</Tabs>
	)
}
