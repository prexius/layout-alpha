import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, LogOut, Mail, PencilLine, Phone } from "lucide-react"

export default function ProfilePage() {
	return (
		<Layout>
			<div className="container px-4 py-6 mx-auto max-w-5xl">
				<div className="mb-6 md:mb-8">
					<h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile</h1>
					<p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
				</div>

				{/* Mobile Tabs (visible on small screens only) */}
				<div className="md:hidden mb-6">
					<Tabs defaultValue="profile" className="w-full">
						<TabsList className="grid grid-cols-2 w-full">
							<TabsTrigger value="profile">Profile</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>

						<TabsContent value="profile" className="mt-4 space-y-6">
							{/* Profile Card (Mobile) */}
							<ProfileCard />

							{/* Personal Information Card (Mobile) */}
							<PersonalInfoCard />
						</TabsContent>

						<TabsContent value="settings" className="mt-4 space-y-6">
							{/* Financial Preferences Card (Mobile) */}
							<FinancialPreferencesCard />
						</TabsContent>
					</Tabs>
				</div>

				{/* Desktop Layout (hidden on small screens) */}
				<div className="hidden md:grid md:grid-cols-[280px_1fr] md:gap-8">
					<div className="space-y-6">
						<ProfileCard />
					</div>

					<div className="space-y-6">
						<PersonalInfoCard />
						<FinancialPreferencesCard />
					</div>
				</div>
			</div>
		</Layout>
	)
}

function ProfileCard() {
	return (
		<Card className="border-none shadow-md">
			<CardContent className="p-6">
				<div className="flex flex-col items-center space-y-4">
					<div className="relative group">
						<div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
							<img
								src="/placeholder.svg"
								width="128"
								height="128"
								className="object-cover w-full h-full transition-transform group-hover:scale-105"
								alt="Profile"
							/>
						</div>
						<Button
							size="icon"
							variant="secondary"
							className="absolute bottom-0 right-0 rounded-full shadow-md h-8 w-8 md:h-10 md:w-10"
						>
							<PencilLine className="h-4 w-4 md:h-5 md:w-5" />
							<span className="sr-only">Edit Profile Picture</span>
						</Button>
					</div>

					<div className="text-center">
						<h2 className="text-xl font-bold">John Doe</h2>
						<p className="text-sm text-muted-foreground flex items-center justify-center mt-1">
							<Mail className="h-3 w-3 mr-1" />
							john.doe@example.com
						</p>
					</div>

					<Separator />

					<div className="w-full space-y-3">
						<div className="flex justify-between items-center text-sm">
							<span className="text-muted-foreground flex items-center">
								<Calendar className="h-3 w-3 mr-1.5" />
								Member since
							</span>
							<span className="font-medium">Jan 15, 2023</span>
						</div>
						<div className="flex justify-between items-center text-sm">
							<span className="text-muted-foreground flex items-center">
								<Clock className="h-3 w-3 mr-1.5" />
								Last login
							</span>
							<span className="font-medium">Today, 10:30 AM</span>
						</div>
					</div>

					<Button variant="outline" className="w-full mt-2">
						<LogOut className="mr-2 h-4 w-4" />
						Sign Out
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

function PersonalInfoCard() {
	return (
		<Card className="border-none shadow-md">
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
				<CardDescription>Update your personal details.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="first-name">First Name</Label>
						<Input id="first-name" defaultValue="John" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="last-name">Last Name</Label>
						<Input id="last-name" defaultValue="Doe" />
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input id="email" type="email" defaultValue="john.doe@example.com" className="pl-10" />
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone">Phone Number</Label>
					<div className="relative">
						<Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="pl-10" />
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
				<Button variant="outline" className="w-full sm:w-auto order-2 sm:order-1">
					Cancel
				</Button>
				<Button className="w-full sm:w-auto order-1 sm:order-2">Save Changes</Button>
			</CardFooter>
		</Card>
	)
}

function FinancialPreferencesCard() {
	return (
		<Card className="border-none shadow-md">
			<CardHeader>
				<CardTitle>Financial Preferences</CardTitle>
				<CardDescription>Set your default financial preferences.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="default-currency">Default Currency</Label>
					<Select defaultValue="usd">
						<SelectTrigger id="default-currency">
							<SelectValue placeholder="Select currency" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="usd">USD - US Dollar</SelectItem>
							<SelectItem value="eur">EUR - Euro</SelectItem>
							<SelectItem value="gbp">GBP - British Pound</SelectItem>
							<SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
							<SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="default-wallet">Default Wallet</Label>
					<Select defaultValue="w1">
						<SelectTrigger id="default-wallet">
							<SelectValue placeholder="Select wallet" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="w1">Main Savings</SelectItem>
							<SelectItem value="w2">Emergency Fund</SelectItem>
							<SelectItem value="w3">Travel Budget</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
				<Button variant="outline" className="w-full sm:w-auto order-2 sm:order-1">
					Reset
				</Button>
				<Button className="w-full sm:w-auto order-1 sm:order-2">Save Preferences</Button>
			</CardFooter>
		</Card>
	)
}
