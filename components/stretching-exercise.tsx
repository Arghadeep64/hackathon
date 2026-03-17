"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PersonStanding, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const stretches = [
  {
    id: 1,
    name: "Neck Rolls",
    description: "Slowly roll your head in a circle, 5 times each direction",
    duration: 20,
  },
  {
    id: 2,
    name: "Shoulder Shrugs",
    description: "Raise shoulders to ears, hold for 3 seconds, then release",
    duration: 15,
  },
  {
    id: 3,
    name: "Wrist Circles",
    description: "Rotate your wrists in circles, 10 times each direction",
    duration: 15,
  },
  {
    id: 4,
    name: "Standing Stretch",
    description: "Reach arms overhead and stretch tall, then lean side to side",
    duration: 20,
  },
]

interface StretchingExerciseProps {
  onComplete: () => void
  onSkip: () => void
}

export function StretchingExercise({ onComplete, onSkip }: StretchingExerciseProps) {
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(stretches[0].duration)
  const [completedStretches, setCompletedStretches] = useState<number[]>([])

  const currentStretch = stretches[currentStretchIndex]
  const progress = ((currentStretch.duration - timeRemaining) / currentStretch.duration) * 100
  const totalProgress = ((currentStretchIndex + progress / 100) / stretches.length) * 100

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Move to next stretch
          setCompletedStretches((c) => [...c, currentStretch.id])
          
          if (currentStretchIndex >= stretches.length - 1) {
            clearInterval(interval)
            setTimeout(onComplete, 500)
            return 0
          }
          
          setCurrentStretchIndex((idx) => idx + 1)
          return stretches[currentStretchIndex + 1].duration
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentStretchIndex, currentStretch.id, onComplete])

  const handleNextStretch = () => {
    setCompletedStretches((c) => [...c, currentStretch.id])
    
    if (currentStretchIndex >= stretches.length - 1) {
      onComplete()
      return
    }
    
    setCurrentStretchIndex((idx) => idx + 1)
    setTimeRemaining(stretches[currentStretchIndex + 1].duration)
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <div className="h-2 bg-primary" />
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <PersonStanding className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Stretching Break</CardTitle>
        <p className="text-sm text-muted-foreground">
          Exercise {currentStretchIndex + 1} of {stretches.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress indicators */}
        <div className="flex gap-2">
          {stretches.map((stretch, idx) => (
            <div
              key={stretch.id}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-colors",
                completedStretches.includes(stretch.id)
                  ? "bg-primary"
                  : idx === currentStretchIndex
                  ? "bg-primary/50"
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Current stretch */}
        <div className="bg-muted/50 rounded-xl p-6 text-center space-y-4">
          <div className="h-24 w-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">
              {timeRemaining}
            </span>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {currentStretch.name}
            </h3>
            <p className="text-muted-foreground mt-2">
              {currentStretch.description}
            </p>
          </div>

          <Progress value={progress} className="h-2" />
        </div>

        {/* Stretch list */}
        <div className="space-y-2">
          {stretches.map((stretch, idx) => (
            <div
              key={stretch.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors",
                idx === currentStretchIndex && "bg-primary/5 border border-primary/20",
                completedStretches.includes(stretch.id) && "opacity-60"
              )}
            >
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                  completedStretches.includes(stretch.id)
                    ? "bg-primary text-primary-foreground"
                    : idx === currentStretchIndex
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {completedStretches.includes(stretch.id) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  idx + 1
                )}
              </div>
              <span
                className={cn(
                  "flex-1 text-sm",
                  idx === currentStretchIndex
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {stretch.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {stretch.duration}s
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={onSkip}
            variant="outline"
            size="lg"
          >
            Skip All
          </Button>
          <Button 
            onClick={handleNextStretch}
            className="flex-1"
            size="lg"
          >
            {currentStretchIndex >= stretches.length - 1 ? (
              "Complete"
            ) : (
              <>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
