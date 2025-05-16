"use client"

import { GoalContributionForm } from "@/components/goals/goal-contribution-form"
import { GoalDetails } from "@/components/goals/goal-details"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function GoalDetailsPage({ params }) {
	const router = useRouter()
	const [showContributionForm, setShowContributionForm] = useState(false)
	const isMobile = useIsMobile()

	// Mock goal data - in a real app, this would come from an API or database
	const goal = {
		id: "g2",
		name: "Vacation Fund",
		targetAmount: 3000,
		currentAmount: 1500,
		progress: 50,
		deadline: "2023-07-15",
		status: "on-track",
		category: "Travel",
		priority: "Medium",
		walletId: "w3",
		walletName: "Travel Budget",
		notes: "Summer vacation to the beach.",
		contributions: [
			{ date: "2023-02-01", amount: 500 },
			{ date: "2023-03-01", amount: 500 },
			{ date: "2023-04-01", amount: 500 },
		],
	}

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" }
		return new Date(dateString).toLocaleDateString(undefined, options)
	}

	const calculateTimeLeft = (deadline) => {
		const today = new Date()
		const targetDate = new Date(deadline)
		const timeLeft = targetDate - today

		// If deadline has passed
		if (timeLeft < 0) return "Deadline passed"

		const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

		if (daysLeft > 365) {
			const years = Math.floor(daysLeft / 365)
			return `${years} year${years > 1 ? "s" : ""} left`
		} else if (daysLeft > 30) {
			const months = Math.floor(daysLeft / 30)
			return `${months} month${months > 1 ? "s" : ""} left`
		} else {
			return `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`
		}
	}

	const handleDelete = (goalId) => {
		// In a real app, this would delete from a database
		console.log("Deleting goal:", goalId)

		// Navigate back to goals page
		router.push("/goals")
	}

	const handleAddContribution = (contribution) => {
		// In a real app, this would update the database
		console.log("Adding contribution:", contribution)

		// Close the form
		setShowContributionForm(false)
	}

	return (
		<Layout>
			<div className="px-4 sm:px-6">
				<div className="max-w-4xl mx-auto">
					<div className="mb-4 sm:mb-6">
						<Button variant="ghost" size={isMobile ? "sm" : "default"} asChild className="mb-2">
							<Link href="/goals">
								<ArrowLeft className="mr-2 h-4 w-4" />
								{isMobile ? "Back" : "Back to Goals"}
							</Link>
						</Button>
					</div>
					<GoalDetails
						goal={goal}
						formatDate={formatDate}
						calculateTimeLeft={calculateTimeLeft}
						onDelete={handleDelete}
						onContribute={() => setShowContributionForm(true)}
					/>
				</div>

				<Dialog open={showContributionForm} onOpenChange={setShowContributionForm}>
					<DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
						<GoalContributionForm
							goal={goal}
							onSubmit={handleAddContribution}
							onCancel={() => setShowContributionForm(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>
		</Layout>
	)
}
