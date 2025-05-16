"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  BarChart3,
  PieChart,
  ArrowRight,
  Lightbulb,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

export function BudgetInsightsTab() {
  const [activeRecommendation, setActiveRecommendation] = useState(null)

  // Mock data for spending trends
  const spendingTrends = [
    { category: "Dining Out", change: 15, status: "increased" },
    { category: "Transportation", change: -12, status: "decreased" },
    { category: "Entertainment", change: 8, status: "increased" },
  ]

  // Mock data for recommendations
  const recommendations = [
    {
      id: "r1",
      title: "Adjust Entertainment Budget",
      description:
        "Based on your spending patterns, consider increasing your Entertainment budget by $50 and reducing your Shopping budget accordingly.",
      impact: "high",
      action: "Apply Recommendation",
    },
    {
      id: "r2",
      title: "Create Savings Goal",
      description: "You have unallocated budget of $250. Consider creating a savings goal for this amount.",
      impact: "medium",
      action: "Create Savings Goal",
    },
    {
      id: "r3",
      title: "Set Up Automatic Transfers",
      description: "Automate your budget by setting up automatic transfers to your category wallets.",
      impact: "medium",
      action: "Set Up Transfers",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card className="border-border/40 overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Budget Insights</CardTitle>
                <CardDescription>Analysis of your spending patterns.</CardDescription>
              </div>
              <Badge variant="outline" className="font-normal">
                April 2023
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                <div className="flex items-start gap-4 rounded-lg border border-border/40 p-4 bg-amber-50/50 dark:bg-amber-950/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dining Out Budget Alert</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You've used 92% of your Dining Out budget with 12 days remaining in the month. Consider reducing
                      spending in this category.
                    </p>
                    <div className="mt-2">
                      <Progress value={92} max={100} className="h-2" indicatorClassName="bg-amber-500" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>$0</span>
                        <span>$300</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div className="flex items-start gap-4 rounded-lg border border-border/40 p-4 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Transportation Savings</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You're spending less on Transportation this month compared to your average. Great job saving $45
                      so far!
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="success" size="sm">
                        -12% vs. Last Month
                      </Badge>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <div className="flex items-start gap-4 rounded-lg border border-border/40 p-4 bg-rose-50/50 dark:bg-rose-950/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                    <TrendingDown className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Entertainment Budget Exceeded</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You've exceeded your Entertainment budget by $30 this month. Consider adjusting your budget or
                      reducing spending.
                    </p>
                    <div className="mt-2">
                      <Progress value={120} max={100} className="h-2" indicatorClassName="bg-rose-500" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>$0</span>
                        <span>$150</span>
                        <span className="text-rose-500">$180</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>How your spending has changed compared to last month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spendingTrends.map((trend, index) => (
                <motion.div
                  key={trend.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/40">
                    <div className="flex items-center gap-3">
                      {trend.status === "increased" ? (
                        <TrendingUp className="h-5 w-5 text-rose-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-emerald-500" />
                      )}
                      <span className="font-medium">{trend.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={trend.status === "increased" ? "destructive" : "success"} className="font-normal">
                        {trend.status === "increased" ? "+" : ""}
                        {trend.change}%
                      </Badge>
                      {trend.status === "increased" ? (
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="mt-4 pt-4 border-t border-border/40">
                <Button variant="outline" className="w-full gap-1">
                  View Detailed Analysis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/40 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Budget Recommendations</CardTitle>
              <CardDescription>Suggestions to improve your financial health.</CardDescription>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                onHoverStart={() => setActiveRecommendation(recommendation.id)}
                onHoverEnd={() => setActiveRecommendation(null)}
              >
                <div
                  className={cn(
                    "rounded-lg border border-border/40 p-4 transition-all duration-200",
                    activeRecommendation === recommendation.id ? "bg-muted/50" : "",
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles
                      className={cn(
                        "h-4 w-4",
                        recommendation.impact === "high"
                          ? "text-primary"
                          : recommendation.impact === "medium"
                            ? "text-amber-500"
                            : "text-muted-foreground",
                      )}
                    />
                    <h4 className="font-medium">{recommendation.title}</h4>
                    <Badge
                      variant={
                        recommendation.impact === "high"
                          ? "default"
                          : recommendation.impact === "medium"
                            ? "warning"
                            : "secondary"
                      }
                      size="sm"
                      className="ml-auto"
                    >
                      {recommendation.impact.charAt(0).toUpperCase() + recommendation.impact.slice(1)} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>
                  <Button
                    variant={activeRecommendation === recommendation.id ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {recommendation.action}
                  </Button>
                </div>
              </motion.div>
            ))}

            <div className="mt-4 pt-4 border-t border-border/40 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                We analyze your spending patterns to provide personalized recommendations.
              </p>
              <Button variant="link" className="text-primary">
                How are recommendations calculated?
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
