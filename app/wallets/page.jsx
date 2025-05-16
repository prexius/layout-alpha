import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { Layout } from "@/components/layout"
import { FinancialGoals } from "@/components/wallets/financial-goals"
import { WalletByCurrency } from "@/components/wallets/wallet-by-currency"
import { WalletCard } from "@/components/wallets/wallet-card"
import { WalletSummaryStats } from "@/components/wallets/wallet-summary-stats"
import { WalletsHeader } from "@/components/wallets/wallets-header"
// import { RecentTransactions } from "@/components/recent-transactions"

export default function WalletsPage() {
	// Mock data for demonstration
	const wallets = [
		{
			id: "w1",
			name: "Main Savings",
			balance: 2543.89,
			currency: "USD",
			type: "Savings",
			lastUpdated: "2023-04-15T10:30:00Z",
		},
		{
			id: "w2",
			name: "Emergency Fund",
			balance: 10234.56,
			currency: "USD",
			type: "Savings",
			lastUpdated: "2023-04-14T08:15:00Z",
		},
		{
			id: "w3",
			name: "Travel Budget",
			balance: 1500.0,
			currency: "USD",
			type: "Budget",
			lastUpdated: "2023-04-12T14:45:00Z",
		},
		{
			id: "w4",
			name: "Investment Portfolio",
			balance: 8750.25,
			currency: "USD",
			type: "Investment",
			lastUpdated: "2023-04-10T11:20:00Z",
		},
	]

	return (
		<Layout>
			<div>
				<WalletsHeader />

				{/* Summary Statistics */}
				<WalletSummaryStats className="mb-6" />

				<div className="grid gap-6 md:grid-cols-3">
					{/* Wallets Section - 2/3 width */}
					<div className="md:col-span-2 space-y-6">
						<div>
							<h2 className="mb-4 text-xl font-semibold">Your Wallets</h2>
							<div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
								{wallets.map((wallet) => (
									<WalletCard key={wallet.id} wallet={wallet} />
								))}
							</div>
						</div>

						<RecentTransactions />
					</div>

					{/* Right Sidebar - 1/3 width */}
					<div className="space-y-6">
						<FinancialGoals />
						<WalletByCurrency />
					</div>
				</div>
			</div>
		</Layout>
	)
}
