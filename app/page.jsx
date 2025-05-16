import { Layout } from "@/components/layout"

export default function HomePage() {
	return (
		<Layout>
			<div className="flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Dashboard</h1>
			</div>
		</Layout>
	)
}
