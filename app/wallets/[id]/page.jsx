import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { TransactionHistoryCard } from "@/components/wallets/transaction-history-card"
import { WalletActionsCard } from "@/components/wallets/wallet-actions-card"
import { WalletDetailsCard } from "@/components/wallets/wallet-details-card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function WalletPage({ params }) {
	// In a real app, you would fetch wallet data based on params.id
	const walletId = params.id

	// Mock data for demonstration
	const wallet = {
		id: walletId,
		name: "Main Wallet",
		balance: 2543.89,
		currency: "USD",
		type: "Savings",
		lastUpdated: "2023-04-15T10:30:00Z",
	}

	return (
		<Layout>
			<div>
				<div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
					<Button variant="outline" size="icon" asChild>
						<Link href="/">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Link>
					</Button>
					<h1 className="text-xl sm:text-2xl font-semibold">Wallet Details</h1>
				</div>
				<div className="grid gap-4 sm:gap-6">
					<div className="grid gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-1">
						<WalletDetailsCard wallet={wallet} />
						<WalletActionsCard wallet={wallet} />
					</div>
					<TransactionHistoryCard walletId={walletId} />
				</div>
			</div>
		</Layout>
	)
}
