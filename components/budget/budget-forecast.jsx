"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { TrendingUp, AlertCircle, ArrowRight, Calendar, Download } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function BudgetForecast({ className }) {
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Mock data for forecast
  const forecastData = {
    currentMonth: "April",
    daysLeft: 12,
    totalBudget: 3500,
    spentToDate: 2150,
    projectedTotal: 3100,
    projectedRemaining: 400,
    riskCategories: [
      {
        name: "Dining Out",
        budget: 300,
        spent: 275,
        projected: 350,
        risk: "high",
      },
      {
        name: "Entertainment",
        budget: 150,
        spent: 180,
        projected: 200,
        risk: "exceeded",
      },
    ],
    dailyForecast: [
      { day: "Apr 1", spent: 120, projected: 0 },
      { day: "Apr 5", spent: 450, projected: 0 },
      { day: "Apr 10", spent: 950, projected: 0 },
      { day: "Apr 15", spent: 1500, projected: 0 },
      { day: "Apr 19", spent: 2150, projected: 0 },
      { day: "Apr 20", spent: 0, projected: 2300 },
      { day: "Apr 25", spent: 0, projected: 2700 },
      { day: "Apr 30", spent: 0, projected: 3100 },
    ],
  }

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Find which data point is non-zero
      const dataPoint = payload.find((p) => p.value > 0)
      if (!dataPoint) return null

      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-md">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            {dataPoint.dataKey === "spent" ? "Actual: " : "Projected: "}
            {formatCurrency(dataPoint.value)}
          </p>
        </div>
      )
    }
    return null
  }

  // Get risk badge
  const getRiskBadge = (risk) => {
    switch (risk) {
      case "high":
        return (
          <Badge variant="warning" size="sm">
            At Risk
          </Badge>
        )
      case "exceeded":
        return (
          <Badge variant="destructive" size="sm">
            Exceeded
          </Badge>
        )
      default:
        return (
          <Badge variant="success" size="sm">
            On Track
          </Badge>
        )
    }
  }

  return (
    <Card className={cn("border-border/40 overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Forecast</CardTitle>
            <CardDescription>Projected spending for the rest of the month.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Change Period</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="rounded-lg border border-border/40 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-medium">Monthly Forecast</h3>
                  <p className="text-sm text-muted-foreground">
                    {forecastData.daysLeft} days left in {forecastData.currentMonth}
                  </p>
                </div>
                <Badge variant="outline" className="w-fit">
                  Projected Savings: {formatCurrency(forecastData.projectedRemaining)}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span>
                      Spent: {formatCurrency(forecastData.spentToDate)} of {formatCurrency(forecastData.totalBudget)}
                    </span>
                    <span>
                      Projected: {formatCurrency(forecastData.projectedTotal)} (
                      {((forecastData.projectedTotal / forecastData.totalBudget) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                      <div
                        style={{ width: `${(forecastData.spentToDate / forecastData.totalBudget) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      ></div>
                      <div
                        style={{
                          width: `${
                            ((forecastData.projectedTotal - forecastData.spentToDate) / forecastData.totalBudget) * 100
                          }%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary/40"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <div className="rounded-lg border border-border/40 p-4">
              <h3 className="text-sm font-medium mb-4">Spending Projection</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={forecastData.dailyForecast}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                      <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                      </linearGradient>
                      <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="spent"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorSpent)"
                    />
                    <Area
                      type="monotone"
                      dataKey="projected"
                      stroke="hsl(var(--primary))"
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#colorProjected)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Actual Spending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary/40 rounded-full"></div>
                  <span>Projected Spending</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Categories */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <div className="rounded-lg border border-border/40 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Categories at Risk</h3>
                <TrendingUp className="h-4 w-4 text-amber-500" />
              </div>

              <div className="space-y-4">
                {forecastData.riskCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{category.name}</span>
                        {getRiskBadge(category.risk)}
                      </div>
                      <div className="text-sm">
                        {formatCurrency(category.spent)} of {formatCurrency(category.budget)}
                      </div>
                    </div>

                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-1 text-xs text-muted-foreground">
                        <span>Current: {((category.spent / category.budget) * 100).toFixed(0)}%</span>
                        <span>Projected: {((category.projected / category.budget) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                        <div
                          style={{ width: `${(category.spent / category.budget) * 100}%` }}
                          className={cn(
                            "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                            category.risk === "exceeded" ? "bg-destructive" : "bg-amber-500",
                          )}
                        ></div>
                        <div
                          style={{
                            width: `${((category.projected - category.spent) / category.budget) * 100}%`,
                          }}
                          className={cn(
                            "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                            category.risk === "exceeded" ? "bg-destructive/40" : "bg-amber-500/40",
                          )}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                      <span>Projected to exceed budget by {formatCurrency(category.projected - category.budget)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="link" className="mt-4 p-0 h-auto text-primary" size="sm">
                View all categories <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
