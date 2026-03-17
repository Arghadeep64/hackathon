"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Droplets,
  Wind,
  PersonStanding
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BreathingExercise } from "./breathing-exercise"
import { StretchingExercise } from "./stretching-exercise"

type BreakType = "hydration" | "breathing" | "stretching"

interface Break {
  type: BreakType
  title: string
  description: string
  icon: React.ElementType
  duration: number
  points: number
}

const breaks: Break[] = [
  {
    type: "hydration",
    title: "Hydration Break",
    description: "Time to drink some water! Stay hydrated for optimal focus.",
    icon: Droplets,
    duration: 30,
    points: 5,
  },
  {
    type: "breathing",
    title: "Breathing Exercise",
    description: "Take a moment for deep breathing to reduce stress.",
    icon: Wind,
    duration: 60,
    points: 10,
  },
  {
    type: "stretching",
    title: "Stretching Break",
    description: "Stand up and stretch to prevent muscle tension.",
    icon: PersonStanding,
    duration: 90,
    points: 15,
  },
]

interface WorkTimerProps {
  onPointsEarned?: (points: number) => void
  onBreakCompleted?: () => void
}

export function WorkTimer({ onPointsEarned, onBreakCompleted }: WorkTimerProps) {
  const [workDuration] = useState(25 * 60) // 25 minutes
  const [timeRemaining, setTimeRemaining] = useState(workDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [showBreak, setShowBreak] = useState(false)
  const [currentBreak, setCurrentBreak] = useState<Break | null>(null)
  const [breakTimeRemaining, setBreakTimeRemaining] = useState(0)
  const [activeExercise, setActiveExercise] = useState<BreakType | null>(null)

  const triggerBreak = useCallback(() => {
    const randomBreak = breaks[Math.floor(Math.random() * breaks.length)]
    setCurrentBreak(randomBreak)
    setBreakTimeRemaining(randomBreak.duration)
    setShowBreak(true)
    setIsRunning(false)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            triggerBreak()
            return workDuration
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining, workDuration, triggerBreak])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (showBreak && breakTimeRemaining > 0 && !activeExercise) {
      interval = setInterval(() => {
        setBreakTimeRemaining((prev) => prev - 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showBreak, breakTimeRemaining, activeExercise])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((workDuration - timeRemaining) / workDuration) * 100

  const handleCompleteBreak = () => {
    if (currentBreak) {
      onPointsEarned?.(currentBreak.points)
      onBreakCompleted?.()
    }
    setShowBreak(false)
    setCurrentBreak(null)
    setActiveExercise(null)
    setIsRunning(true)
  }

  const handleSkipBreak = () => {
    setShowBreak(false)
    setCurrentBreak(null)
    setActiveExercise(null)
    setIsRunning(true)
  }

  const handleStartExercise = () => {
    if (currentBreak) {
      setActiveExercise(currentBreak.type)
    }
  }

  if (activeExercise === "breathing") {
    return (
      <BreathingExercise 
        onComplete={handleCompleteBreak}
        onSkip={handleSkipBreak}
      />
    )
  }

  if (activeExercise === "stretching") {
    return (
      <StretchingExercise
        onComplete={handleCompleteBreak}
        onSkip={handleSkipBreak}
      />
    )
  }

  if (showBreak && currentBreak) {
    const Icon = currentBreak.icon
    return (
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <div className="h-2 bg-primary" />
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{currentBreak.title}</CardTitle>
          <CardDescription className="text-base">
            {currentBreak.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Complete for +{currentBreak.points} points
            </p>
            {currentBreak.type === "hydration" ? (
              <p className="text-4xl font-bold text-primary">
                {formatTime(breakTimeRemaining)}
              </p>
            ) : null}
          </div>

          <div className="flex gap-3">
            {currentBreak.type === "hydration" ? (
              <Button 
                onClick={handleCompleteBreak} 
                className="flex-1"
                size="lg"
              >
                I Drank Water
              </Button>
            ) : (
              <Button 
                onClick={handleStartExercise} 
                className="flex-1"
                size="lg"
              >
                Start Exercise
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={handleSkipBreak}
              size="lg"
            >
              Skip
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Work Timer</CardTitle>
        <CardDescription>
          Focus on your work. We will remind you to take breaks.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48">
              <svg className="h-48 w-48 -rotate-90 transform">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={553}
                  strokeDashoffset={553 - (553 * progress) / 100}
                  className="text-primary transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tracking-tight">
                  {formatTime(timeRemaining)}
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  {isRunning ? "Focus time" : "Paused"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTimeRemaining(workDuration)}
            className="h-12 w-12"
          >
            <RotateCcw className="h-5 w-5" />
            <span className="sr-only">Reset timer</span>
          </Button>

          <Button
            size="lg"
            onClick={() => setIsRunning(!isRunning)}
            className={cn(
              "h-14 w-14 rounded-full",
              isRunning && "bg-destructive hover:bg-destructive/90"
            )}
          >
            {isRunning ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
            <span className="sr-only">{isRunning ? "Pause" : "Start"}</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {breaks.map((breakItem) => {
            const Icon = breakItem.icon
            return (
              <button
                key={breakItem.type}
                onClick={() => {
                  setCurrentBreak(breakItem)
                  setBreakTimeRemaining(breakItem.duration)
                  setShowBreak(true)
                  setIsRunning(false)
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  {breakItem.title.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
