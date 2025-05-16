"use client"

import { useState, useEffect } from "react"
import { useThemeContext } from "@/components/theme/theme-provider"
import { MobileSidebar } from "./mobile-sidebar"
import { DesktopSidebar } from "./desktop-sidebar"

export function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen, isHorizontalLayout = false }) {
	const { direction } = useThemeContext()
	const [isMobile, setIsMobile] = useState(false)

	// Check if mobile on mount and when window resizes
	useEffect(() => {
		const checkIfMobile = () => {
			const isMobileView = window.innerWidth < 768
			setIsMobile(isMobileView)
			if (isMobileView && !isMobileOpen) {
				setIsCollapsed(true)
			}
		}

		// Initial check
		checkIfMobile()

		// Add event listener
		window.addEventListener("resize", checkIfMobile)

		// Cleanup
		return () => window.removeEventListener("resize", checkIfMobile)
	}, [setIsCollapsed, isMobileOpen])

	// Render mobile sidebar or horizontal layout
	if (isMobile || isHorizontalLayout) {
		return <MobileSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} direction={direction} />
	}

	// Render desktop sidebar
	return <DesktopSidebar isCollapsed={isCollapsed} direction={direction} />
}
