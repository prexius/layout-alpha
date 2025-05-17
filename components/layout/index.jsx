"use client"

import { Footer } from "@/components/layout/footer"
// import { HorizontalHeader } from "@/components/layout/horizontal-header"
import { Sidebar } from "@/components/layout/sidebar"
// import { VerticalHeader } from "@/components/layout/vertical-header"
import { useThemeContext } from "@/components/theme/theme-provider"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"
import { HorizontalHeader } from "./header/horizontal-header"
import { VerticalHeader } from "./header/vertical-header"

export function Layout({ children }) {
	// const { layout, direction } = useTheme()

	const { layout, direction } = useThemeContext()
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isMobileOpen, setIsMobileOpen] = useState(false)
	const isVertical = layout === "vertical"
	const isHorizontal = layout === "horizontal"

	// Reset sidebar state when layout changes
	// useEffect(() => {
	// 	// Close mobile sidebar when layout changes
	// 	setIsMobileOpen(false)

	// 	// Set collapsed state based on layout
	// 	if (isHorizontal) {
	// 		setIsCollapsed(true) // Always start collapsed in horizontal mode
	// 	}
	// }, [layout, isHorizontal])

	// Toggle sidebar collapsed state
	const toggleSidebar = () => setIsCollapsed(!isCollapsed)

	// Memoize the container class to prevent unnecessary re-renders
	const containerClass = useMemo(() => {
		return cn(
			"min-h-screen bg-background",
			direction === "rtl" && "rtl",
			isVertical && "md:pl-[70px]",
			isVertical && !isCollapsed && "md:pl-[260px]",
			direction === "rtl" && isVertical && "md:pr-[70px] md:pl-0",
			direction === "rtl" && isVertical && !isCollapsed && "md:pr-[260px] md:pl-0",
		)
	}, [direction, isVertical, isCollapsed])

	return (
		<div className={containerClass}>
			{/* Only render the sidebar for vertical layout or on mobile */}
			{(isVertical || isMobileOpen) && (
				<Sidebar
					isCollapsed={isCollapsed}
					setIsCollapsed={setIsCollapsed}
					isMobileOpen={isMobileOpen}
					setIsMobileOpen={setIsMobileOpen}
					isHorizontalLayout={isHorizontal}
				/>
			)}

			<div className="flex min-h-screen flex-col">
				{isVertical ? (
					<VerticalHeader toggleSidebar={toggleSidebar} setMobileOpen={setIsMobileOpen} />
				) : (
					<HorizontalHeader toggleSidebar={toggleSidebar} setMobileOpen={setIsMobileOpen} />
				)}
				<main className="flex-1">
					<div className="p-4 px-8">{children}</div>
				</main>
				<Footer />
			</div>
		</div>
	)
}


