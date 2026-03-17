"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Animated stick figure component for each exercise
function NeckRollsAnimation() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {/* Body */}
      <line x1="60" y1="50" x2="60" y2="85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Arms */}
      <line x1="60" y1="55" x2="40" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="55" x2="80" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Legs */}
      <line x1="60" y1="85" x2="45" y2="110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="85" x2="75" y2="110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Animated Head */}
      <motion.g
        animate={{
          rotate: [0, 30, 0, -30, 0],
          x: [0, 5, 0, -5, 0],
          y: [0, 3, 0, 3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "60px", originY: "45px" }}
      >
        <circle cx="60" cy="35" r="15" fill="currentColor" className="text-primary" />
        {/* Face indicator - small dot */}
        <circle cx="65" cy="33" r="2" fill="white" />
      </motion.g>
      {/* Direction arrows */}
      <motion.path
        d="M 30 35 Q 35 15 60 12 Q 85 15 90 35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        className="text-primary/40"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  )
}

function ShoulderShrugsAnimation() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {/* Head */}
      <circle cx="60" cy="25" r="12" fill="currentColor" className="text-primary" />
      {/* Body */}
      <line x1="60" y1="37" x2="60" y2="75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Animated Shoulders and Arms */}
      <motion.g
        animate={{
          y: [0, -10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          times: [0, 0.3, 0.7, 1],
          ease: "easeInOut",
        }}
      >
        {/* Left shoulder & arm */}
        <line x1="60" y1="45" x2="35" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="35" y1="50" x2="30" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Right shoulder & arm */}
        <line x1="60" y1="45" x2="85" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="85" y1="50" x2="90" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      {/* Legs */}
      <line x1="60" y1="75" x2="45" y2="105" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="75" x2="75" y2="105" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Up arrows */}
      <motion.g
        animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }}
        transition={{ duration: 2, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
      >
        <path d="M 25 35 L 30 28 L 35 35" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/60" />
        <path d="M 85 35 L 90 28 L 95 35" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/60" />
      </motion.g>
    </svg>
  )
}

function WristCirclesAnimation() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {/* Body */}
      <circle cx="60" cy="20" r="10" fill="currentColor" className="text-primary" />
      <line x1="60" y1="30" x2="60" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Arms extended forward */}
      <line x1="60" y1="40" x2="35" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="40" x2="85" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Forearms */}
      <line x1="35" y1="50" x2="25" y2="65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="85" y1="50" x2="95" y2="65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Animated Hands/Wrists */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{ originX: "25px", originY: "65px" }}
      >
        <circle cx="20" cy="72" r="5" fill="currentColor" className="text-primary/80" />
      </motion.g>
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{ originX: "95px", originY: "65px" }}
      >
        <circle cx="100" cy="72" r="5" fill="currentColor" className="text-primary/80" />
      </motion.g>
      {/* Circle indicators */}
      <circle cx="20" cy="72" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" className="text-primary/30" />
      <circle cx="100" cy="72" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" className="text-primary/30" />
      {/* Legs */}
      <line x1="60" y1="60" x2="50" y2="90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="60" x2="70" y2="90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function StandingStretchAnimation() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {/* Legs (static) */}
      <line x1="55" y1="75" x2="45" y2="110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="75" x2="75" y2="110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      
      {/* Animated upper body */}
      <motion.g
        animate={{
          rotate: [0, 15, 0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "60px", originY: "75px" }}
      >
        {/* Body */}
        <line x1="60" y1="40" x2="60" y2="75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Head */}
        <circle cx="60" cy="28" r="12" fill="currentColor" className="text-primary" />
        {/* Arms reaching up */}
        <motion.g
          animate={{
            y: [0, -5, 0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <line x1="60" y1="45" x2="45" y2="25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="45" y1="25" x2="40" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="45" x2="75" y2="25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="75" y1="25" x2="80" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Hands */}
          <circle cx="40" cy="8" r="4" fill="currentColor" className="text-primary/80" />
          <circle cx="80" cy="8" r="4" fill="currentColor" className="text-primary/80" />
        </motion.g>
      </motion.g>
      
      {/* Side-to-side indicator */}
      <motion.path
        d="M 30 50 L 20 60 M 90 50 L 100 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary/40"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  )
}

// Map exercise id to animation component
const exerciseAnimations: Record<number, React.FC> = {
  1: NeckRollsAnimation,
  2: ShoulderShrugsAnimation,
  3: WristCirclesAnimation,
  4: StandingStretchAnimation,
}

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
  
  const AnimationComponent = exerciseAnimations[currentStretch.id]

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
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">Stretching Break</CardTitle>
        <p className="text-sm text-muted-foreground">
          Exercise {currentStretchIndex + 1} of {stretches.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
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

        {/* Current stretch with animation */}
        <div className="bg-muted/50 rounded-xl p-4 text-center space-y-3">
          {/* Animation container */}
          <motion.div 
            key={currentStretch.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-32 w-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary"
          >
            {AnimationComponent && <AnimationComponent />}
          </motion.div>
          
          {/* Timer */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-primary">
              {timeRemaining}
            </span>
            <span className="text-sm text-muted-foreground">seconds</span>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {currentStretch.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {currentStretch.description}
            </p>
          </div>

          <Progress value={progress} className="h-2" />
        </div>

        {/* Stretch list */}
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {stretches.map((stretch, idx) => (
            <div
              key={stretch.id}
              className={cn(
                "flex items-center gap-3 p-2.5 rounded-lg transition-colors",
                idx === currentStretchIndex && "bg-primary/5 border border-primary/20",
                completedStretches.includes(stretch.id) && "opacity-60"
              )}
            >
              <div
                className={cn(
                  "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium",
                  completedStretches.includes(stretch.id)
                    ? "bg-primary text-primary-foreground"
                    : idx === currentStretchIndex
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {completedStretches.includes(stretch.id) ? (
                  <Check className="h-3.5 w-3.5" />
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
