"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncomeExpenseReport } from "@/components/reports/income-expense-report"
import { CategoryBreakdown } from "@/components/reports/category-breakdown"
import { SavingsReport } from "@/components/reports/savings-report"
import { TrendsReport } from "@/components/reports/trends-report"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Filter, Share2 } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ReportsTabs() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <TabsList className="h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/50 p-1 mb-4 sm:mb-0 w-full sm:w-auto overflow-x-auto flex-nowrap">
          <TabsTrigger value="overview" className="rounded-lg text-sm whitespace-nowrap">
            Overview
          </TabsTrigger>
          <TabsTrigger value="income-expense" className="rounded-lg text-sm whitespace-nowrap">
            Income & Expenses
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-lg text-sm whitespace-nowrap">
            Categories
          </TabsTrigger>
          <TabsTrigger value="savings" className="rounded-lg text-sm whitespace-nowrap">
            Savings
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg text-sm whitespace-nowrap">
            Trends
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <TabsContent value="overview">
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2">
          <motion.div variants={item}>
            <IncomeExpenseReport />
          </motion.div>
          <motion.div variants={item}>
            <CategoryBreakdown />
          </motion.div>
          <motion.div variants={item}>
            <SavingsReport />
          </motion.div>
          <motion.div variants={item}>
            <TrendsReport />
          </motion.div>
        </motion.div>
      </TabsContent>

      <TabsContent value="income-expense">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <IncomeExpenseReport detailed={true} />
        </motion.div>
      </TabsContent>

      <TabsContent value="categories">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <CategoryBreakdown detailed={true} />
        </motion.div>
      </TabsContent>

      <TabsContent value="savings">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <SavingsReport detailed={true} />
        </motion.div>
      </TabsContent>

      <TabsContent value="trends">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <TrendsReport detailed={true} />
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}

export default ReportsTabs
