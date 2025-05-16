"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"
import { PlusCircle, Target, CheckCircle2, Clock, TrendingUp, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function BudgetGoals({ className }) {
  const [hoveredGoal, setHoveredGoal] = useState(null)

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Mock data for budget goals
  const goals = [
    {
      id: "g1",
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2023-12-31",
      progress: 65,
      status: "on-track",
      monthlySaving: 500,
    },
    {
      id: "g2",
      name: "Vacation Fund",
      target: 3000,
      current: 1200,
      deadline: "2023-08-15",
      progress: 40,
      status: "at-risk",
      monthlySaving: 300,
    },
    {
      id: "g3",
      name: "New Laptop",
      target: 2000,
      current: 1800,
      deadline: "2023-06-30",
      progress: 90,
      status: "on-track",
      monthlySaving: 400,
    },
  ]

  const getProgressColor = (progress, status) => {
    if (status === "at-risk") return "bg-amber-500"
    if (progress >= 90) return "bg-emerald-500"
    if (progress >= 50) return "bg-blue-500"
    return "bg-primary"
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "on-track":
        return (
          <Badge variant="success" size="sm">
            On Track
          </Badge>
        )
      case "at-risk":
        return (
          <Badge variant="warning" size="sm">
            At Risk
          </Badge>
        )
      case "behind":
        return (
          <Badge variant="destructive" size="sm">
            Behind
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

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className={cn("border-border/40 overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Goals</CardTitle>
            <CardDescription>Track your progress towards financial goals.</CardDescription>
          </div>
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              onHoverStart={() => setHoveredGoal(goal.id)}
              onHoverEnd={() => setHoveredGoal(null)}
            >
              <div
                className={cn(
                  "rounded-lg border border-border/40 p-4 transition-all duration-200 relative",
                  hoveredGoal === goal.id ? "bg-muted/50" : "",
                )}
              >
                {/* Hover indicator */}
                {hoveredGoal === goal.id && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{goal.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <Clock className="h-3 w-3" />
                        <span>Due: {formatDate(goal.deadline)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(goal.status)}
                    {hoveredGoal === goal.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                            <DropdownMenuItem>Add Funds</DropdownMenuItem>
                            <DropdownMenuItem>Adjust Timeline</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete Goal</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span>
                      {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                    </span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress
                    value={goal.progress}
                    max={100}
                    className="h-2"
                    indicatorClassName={getProgressColor(goal.progress, goal.status)}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Saving {formatCurrency(goal.monthlySaving)}/month</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>
                      {formatCurrency(goal.target - goal.current)} remaining (
                      {Math.ceil((goal.target - goal.current) / goal.monthlySaving)} months)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
