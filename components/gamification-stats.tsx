"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Flame, 
  Target, 
  Droplets, 
  Wind, 
  PersonStanding,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GamificationStatsProps {
  points: number
  streak: number
  breaksCompleted: number
  todayBreaks: {
    hydration: number
    breathing: number
    stretching: number
  }
}

const levels = [
  { name: "Beginner", minPoints: 0, color: "text-muted-foreground" },
  { name: "Health Starter", minPoints: 50, color: "text-primary" },
  { name: "Wellness Warrior", minPoints: 150, color: "text-accent" },
  { name: "Balance Master", minPoints: 300, color: "text-chart-4" },
  { name: "Zen Champion", minPoints: 500, color: "text-chart-1" },
]

export function GamificationStats({ 
  points, 
  streak, 
  breaksCompleted,
  todayBreaks 
}: GamificationStatsProps) {
  const currentLevel = [...levels].reverse().find((l) => points >= l.minPoints) || levels[0]
  const nextLevel = levels.find((l) => l.minPoints > points)
  const progressToNextLevel = nextLevel 
    ? ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100

  return (
    <div className="space-y-4">
      {/* Main Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">{points}</span>
              <span className="text-xs text-muted-foreground">Points</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
                <Flame className="h-6 w-6 text-destructive" />
              </div>
              <span className="text-2xl font-bold">{streak}</span>
              <span className="text-xs text-muted-foreground">Day Streak</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                <Target className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold">{breaksCompleted}</span>
              <span className="text-xs text-muted-foreground">Total Breaks</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={cn("font-semibold", currentLevel.color)}>
              {currentLevel.name}
            </span>
            {nextLevel && (
              <span className="text-sm text-muted-foreground">
                {nextLevel.minPoints - points} pts to {nextLevel.name}
              </span>
            )}
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
        </CardContent>
      </Card>

      {/* Today's Breaks */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Today&apos;s Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
              <Droplets className="h-5 w-5 text-chart-3 mb-1" />
              <span className="text-xl font-bold">{todayBreaks.hydration}</span>
              <span className="text-xs text-muted-foreground">Hydration</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
              <Wind className="h-5 w-5 text-chart-1 mb-1" />
              <span className="text-xl font-bold">{todayBreaks.breathing}</span>
              <span className="text-xs text-muted-foreground">Breathing</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
              <PersonStanding className="h-5 w-5 text-chart-2 mb-1" />
              <span className="text-xl font-bold">{todayBreaks.stretching}</span>
              <span className="text-xs text-muted-foreground">Stretching</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Preview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div 
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center",
                breaksCompleted >= 1 ? "bg-primary/20" : "bg-muted"
              )}
            >
              <span className="text-xl">🎯</span>
            </div>
            <div 
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center",
                breaksCompleted >= 5 ? "bg-primary/20" : "bg-muted"
              )}
            >
              <span className="text-xl">{breaksCompleted >= 5 ? "⭐" : "🔒"}</span>
            </div>
            <div 
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center",
                streak >= 3 ? "bg-primary/20" : "bg-muted"
              )}
            >
              <span className="text-xl">{streak >= 3 ? "🔥" : "🔒"}</span>
            </div>
            <div 
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center",
                points >= 100 ? "bg-primary/20" : "bg-muted"
              )}
            >
              <span className="text-xl">{points >= 100 ? "💯" : "🔒"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
