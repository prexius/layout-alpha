"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight, DollarSign, History, TrendingUp } from "lucide-react"
import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


export function WalletOverview({ className }) {
  const [activeTab, setActiveTab] = useState("week")

  // Generate data based on active tab
  const data = useMemo(() => {
    // Weekly data with some natural fluctuations
    const weekData = [
      { date: "Mon", value: 100, previous: 500 },
      { date: "Tue", value: 2200, previous: 1600 },
      { date: "Wed", value: 150, previous: 550 },
      { date: "Thu", value: 2300, previous: 1700 },
      { date: "Fri", value: 400, previous: 800 },
      { date: "Sat", value: 2350, previous: 1750 },
      { date: "Sun", value: 500, previous: 900 },
    ]

    // Monthly data with a dip in the middle
    const monthData = [
      { date: "Jan", value: 9000, previous: 6500 },
      { date: "Feb", value: 9500, previous: 7000 },
      { date: "Mar", value: 9200, previous: 6800 },
      { date: "Apr", value: 8800, previous: 6400 },
      { date: "May", value: 9600, previous: 7200 },
      { date: "Jun", value: 10200, previous: 7800 },
    ]

    // Yearly data with seasonal patterns
    const yearData = [
      { date: "Jan", value: 110000, previous: 80000 },
      { date: "Feb", value: 125000, previous: 90000 },
      { date: "Mar", value: 135000, previous: 100000 },
      { date: "Apr", value: 120000, previous: 85000 },
      { date: "May", value: 110000, previous: 80000 },
      { date: "Jun", value: 130000, previous: 95000 },
      { date: "Jul", value: 140000, previous: 105000 },
      { date: "Aug", value: 135000, previous: 100000 },
      { date: "Sep", value: 125000, previous: 90000 },
      { date: "Oct", value: 115000, previous: 85000 },
      { date: "Nov", value: 130000, previous: 95000 },
      { date: "Dec", value: 145000, previous: 110000 },
    ]

    switch (activeTab) {
      case "week":
        return weekData
      case "month":
        return monthData
      case "year":
        return yearData
      default:
        return weekData
    }
  }, [activeTab])

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Calculate growth percentage
  const growthPercentage = (
    ((data[data.length - 1].value - data[data.length - 1].previous) / data[data.length - 1].previous) *
    100
  ).toFixed(1)

  const isPositiveGrowth = Number.parseFloat(growthPercentage) >= 0

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-border rounded-lg shadow-md p-3">
          <p className="text-muted-foreground font-medium mb-1">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <p className="text-foreground font-medium">Current: {formatCurrency(payload[0].value)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary/40" />
              <p className="text-muted-foreground">Previous: {formatCurrency(payload[1].value)}</p>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl sm:text-2xl">Wallet Overview</CardTitle>
            <CardDescription className="text-sm">Your financial summary across all wallets.</CardDescription>
          </div>
          <Tabs defaultValue="week" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="w-full flex">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="h-[200px] sm:h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.4} />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => formatCurrency(value)}
                width={80}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="previous"
                stackId="1"
                stroke="hsl(var(--primary))"
                strokeOpacity={0.4}
                strokeWidth={1}
                fillOpacity={1}
                fill="url(#colorPrevious)"
              />

              <Area
                type="monotone"
                dataKey="value"
                stackId="1"
                stroke="hsl(var(--primary))"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <Card className="bg-primary/5 border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -mt-8 -mr-8"></div>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
              </div>
              <p className="text-xl sm:text-2xl font-semibold">{formatCurrency(data[data.length - 1].value)}</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -mt-8 -mr-8"></div>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <History className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Previous Balance</p>
              </div>
              <p className="text-xl sm:text-2xl font-semibold">{formatCurrency(data[data.length - 1].previous)}</p>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "border overflow-hidden relative",
              isPositiveGrowth ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-rose-50 dark:bg-rose-950/20",
            )}
          >
            <div
              className={cn(
                "absolute top-0 right-0 w-16 h-16 rounded-full -mt-8 -mr-8",
                isPositiveGrowth ? "bg-emerald-100 dark:bg-emerald-900/20" : "bg-rose-100 dark:bg-rose-900/20",
              )}
            ></div>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={cn(
                    "p-2 rounded-full",
                    isPositiveGrowth ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-rose-100 dark:bg-rose-900/30",
                  )}
                >
                  <TrendingUp
                    className={cn(
                      "h-4 w-4",
                      isPositiveGrowth ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                    )}
                  />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Growth</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xl sm:text-2xl font-semibold">{growthPercentage}%</p>
                {isPositiveGrowth ? (
                  <ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
