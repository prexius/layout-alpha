"use client"

import { ThemeConfig } from "@/components/theme/theme-config"
import { useThemeContext } from "@/components/theme/theme-provider"
import { Button } from "@/components/ui/button"
import { Menu, PanelLeft } from "lucide-react"
import { useState } from "react"
import { AuthButtons } from "./auth-buttons"
import { NotificationsMenu } from "./notifications-menu"
import { ProfileMenu } from "./profile-menu"
import { SearchDialog } from "./search-dialog"
import { ThemeToggle } from "./theme-toggle"

// Mock search results
const getSearchResults = (query) => {
	const results = [
		{ id: 1, title: "Checking Account", type: "Wallet", href: "/wallets/1" },
		{ id: 2, title: "Savings Goal: Vacation", type: "Goal", href: "/goals/2" },
		{ id: 3, title: "Monthly Budget", type: "Budget", href: "/budget" },
		{ id: 4, title: "Electricity Bill", type: "Bill", href: "/bills/pay" },
		{ id: 5, title: "Income Report", type: "Report", href: "/reports" },
	]
	return results.filter((item) => query && item.title.toLowerCase().includes(query.toLowerCase()))
}

// Mock notifications data
const defaultNotifications = [
	{
		id: 1,
		title: "Large Deposit Received",
		description: "You received a deposit of $2,750.00",
		time: "Today, 10:30 AM",
		unread: true,
	},
	{
		id: 2,
		title: "Monthly Budget Alert",
		description: "Your 'Dining Out' budget is at 85% of its limit",
		time: "Yesterday, 3:45 PM",
		unread: true,
	},
	{
		id: 3,
		title: "Bill Payment Reminder",
		description: "Electric bill payment is due in 3 days",
		time: "Apr 15, 2023",
		unread: false,
	},
]

export function VerticalHeader({ toggleSidebar, setMobileOpen, notifications = defaultNotifications }) {
	const { direction } = useThemeContext()
	const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes
	const [searchOpen, setSearchOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const searchResults = getSearchResults(searchQuery)

	const handleLogout = () => {
		// In a real app, you would handle logout logic here
		setIsLoggedIn(false)
		window.location.href = "/auth/login"
	}

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card">
			<div className="container flex h-16 items-center justify-between px-3 sm:px-4 md:px-6 max-w-full">
				<div className="flex items-center gap-2">
					{/* Sidebar Toggle Button */}
					<Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 hidden md:flex">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle sidebar</span>
					</Button>

					{/* Mobile menu button */}
					<Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setMobileOpen(true)}>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle menu</span>
					</Button>

					{/* Search Dialog */}
					<SearchDialog
						searchOpen={searchOpen}
						setSearchOpen={setSearchOpen}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						searchResults={searchResults}
					/>
				</div>

				<div className="flex items-center gap-3">
					{/* Theme Toggle */}
					<ThemeToggle />

					{/* Appearance Settings */}
					<ThemeConfig />

					{isLoggedIn ? (
						<>
							{/* Notification Dropdown */}
							<NotificationsMenu notifications={notifications} />

							{/* Profile Dropdown */}
							<ProfileMenu handleLogout={handleLogout} />
						</>
					) : (
						<AuthButtons />
					)}
				</div>
			</div>
		</header>
	)
}
