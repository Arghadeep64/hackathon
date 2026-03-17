"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Phase = "inhale" | "hold" | "exhale" | "rest"

const phases: { phase: Phase; duration: number; instruction: string; scale: number }[] = [
  { phase: "inhale", duration: 4, instruction: "Breathe in...", scale: 1.5 },
  { phase: "hold", duration: 4, instruction: "Hold...", scale: 1.5 },
  { phase: "exhale", duration: 4, instruction: "Breathe out...", scale: 1 },
  { phase: "rest", duration: 2, instruction: "Rest...", scale: 1 },
]

interface BreathingExerciseProps {
  onComplete: () => void
  onSkip: () => void
  cycles?: number
}

export function BreathingExercise({ onComplete, onSkip, cycles = 3 }: BreathingExerciseProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [timeInPhase, setTimeInPhase] = useState(phases[0].duration)
  const [currentCycle, setCurrentCycle] = useState(1)
  const [isActive, setIsActive] = useState(true)

  const currentPhase = phases[currentPhaseIndex]

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimeInPhase((prev) => {
        if (prev <= 1) {
          const nextIndex = (currentPhaseIndex + 1) % phases.length
          
          if (nextIndex === 0) {
            if (currentCycle >= cycles) {
              setIsActive(false)
              setTimeout(onComplete, 500)
              return 0
            }
            setCurrentCycle((c) => c + 1)
          }
          
          setCurrentPhaseIndex(nextIndex)
          return phases[nextIndex].duration
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, currentPhaseIndex, currentCycle, cycles, onComplete])

  const getPhaseColor = () => {
    switch (currentPhase.phase) {
      case "inhale": return "from-teal-400 to-cyan-500"
      case "hold": return "from-cyan-400 to-blue-500"
      case "exhale": return "from-blue-400 to-indigo-500"
      case "rest": return "from-indigo-400 to-purple-500"
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden glass-card">
      <div className={cn("h-1.5 bg-gradient-to-r transition-all duration-500", getPhaseColor())} />
      <CardHeader className="text-center pb-2 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onSkip}
        >
          <X className="h-4 w-4" />
        </Button>
        <motion.div 
          className="mx-auto mb-4 h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Wind className="h-7 w-7 text-primary" />
        </motion.div>
        <CardTitle className="text-2xl">Breathing Exercise</CardTitle>
        <p className="text-sm text-muted-foreground">
          Cycle {currentCycle} of {cycles}
        </p>
      </CardHeader>
      <CardContent className="space-y-8 pb-8">
        {/* Main Breathing Circle */}
        <div className="flex items-center justify-center py-8">
          <div className="relative h-56 w-56 flex items-center justify-center">
            {/* Outer pulsing rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className={cn(
                  "absolute inset-0 rounded-full border-2",
                  ring === 1 ? "border-primary/30" : 
                  ring === 2 ? "border-primary/20" : "border-primary/10"
                )}
                animate={{
                  scale: currentPhase.phase === "inhale" || currentPhase.phase === "hold" 
                    ? [1, 1.1 + ring * 0.05, 1.1 + ring * 0.05]
                    : [1.1 + ring * 0.05, 1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: currentPhase.duration,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Main breathing circle */}
            <motion.div
              className={cn(
                "rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg",
                getPhaseColor()
              )}
              animate={{
                scale: currentPhase.scale,
                boxShadow: currentPhase.phase === "hold" 
                  ? "0 0 60px rgba(45, 212, 191, 0.5)"
                  : "0 0 30px rgba(45, 212, 191, 0.3)",
              }}
              transition={{
                duration: currentPhase.duration,
                ease: "easeInOut",
              }}
              style={{ width: 120, height: 120 }}
            >
              <motion.span 
                className="text-4xl font-light text-white"
                key={timeInPhase}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {timeInPhase}
              </motion.span>
            </motion.div>
            
            {/* Particle effects */}
            <AnimatePresence>
              {currentPhase.phase === "inhale" && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-primary/60"
                      initial={{ 
                        scale: 0,
                        x: Math.cos(i * 60 * Math.PI / 180) * 120,
                        y: Math.sin(i * 60 * Math.PI / 180) * 120,
                      }}
                      animate={{ 
                        scale: [0, 1, 0],
                        x: 0,
                        y: 0,
                      }}
                      transition={{
                        duration: currentPhase.duration,
                        delay: i * 0.1,
                        ease: "easeIn",
                      }}
                    />
                  ))}
                </>
              )}
              {currentPhase.phase === "exhale" && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-primary/60"
                      initial={{ 
                        scale: 1,
                        x: 0,
                        y: 0,
                      }}
                      animate={{ 
                        scale: [1, 0.5, 0],
                        x: Math.cos(i * 60 * Math.PI / 180) * 100,
                        y: Math.sin(i * 60 * Math.PI / 180) * 100,
                      }}
                      transition={{
                        duration: currentPhase.duration,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Instruction */}
        <div className="text-center space-y-4">
          <motion.p 
            key={currentPhase.instruction}
            className="text-2xl font-medium text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPhase.instruction}
          </motion.p>
          
          {/* Phase indicators */}
          <div className="flex justify-center gap-2">
            {phases.map((p, idx) => (
              <motion.div
                key={p.phase}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentPhaseIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted"
                )}
                layout
              />
            ))}
          </div>
        </div>

        {/* Skip Button */}
        <div className="flex justify-center">
          <Button 
            onClick={onSkip}
            variant="outline"
            className="px-8"
            size="lg"
          >
            Skip Exercise
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
