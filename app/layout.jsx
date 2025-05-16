import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Poppins } from 'next/font/google'
export const metadata = {
	title: "Expenzo - Personal Finance Dashboard",
	description: "Manage your finances with ease using Expenzo.",
}
const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	// variable: "--Poppins-font-family",
	display: 'swap',
})
export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${poppins.className}`}>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	)
}
