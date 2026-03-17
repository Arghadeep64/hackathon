"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Wind, PersonStanding, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface VirtualPlantProps {
  points: number
  todayBreaks: {
    hydration: number
    breathing: number
    stretching: number
  }
}

export function VirtualPlant({ points, todayBreaks }: VirtualPlantProps) {
  // Plant grows based on points
  const growthStage = Math.min(Math.floor(points / 25), 5)
  const totalBreaks = todayBreaks.hydration + todayBreaks.breathing + todayBreaks.stretching
  
  // Calculate plant health (0-100)
  const health = Math.min(100, totalBreaks * 15 + points / 5)
  
  // Get plant state
  const getPlantState = () => {
    if (growthStage === 0) return { name: "Seed", emoji: "🌱" }
    if (growthStage === 1) return { name: "Sprout", emoji: "🌿" }
    if (growthStage === 2) return { name: "Sapling", emoji: "🪴" }
    if (growthStage === 3) return { name: "Growing", emoji: "🌳" }
    if (growthStage === 4) return { name: "Flourishing", emoji: "🌲" }
    return { name: "Blooming", emoji: "🌸" }
  }
  
  const plantState = getPlantState()

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Your Wellness Garden
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 flex items-end justify-center overflow-hidden rounded-xl bg-gradient-to-b from-sky-100/50 via-sky-50/30 to-emerald-100/50 dark:from-sky-900/20 dark:via-sky-950/10 dark:to-emerald-900/20">
          {/* Sun/Moon */}
          <motion.div
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-400"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Clouds */}
          <motion.div
            className="absolute top-8 left-4 h-4 w-12 rounded-full bg-white/60 dark:bg-white/20"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-12 left-12 h-3 w-8 rounded-full bg-white/40 dark:bg-white/10"
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-600/30 to-transparent" />
          
          {/* Pot */}
          <motion.div
            className="relative z-10 mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pot Container */}
            <div className="relative">
              {/* Plant Stem & Leaves */}
              <AnimatePresence>
                {growthStage > 0 && (
                  <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    initial={{ scaleY: 0, originY: 1 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Main Stem */}
                    <div 
                      className="w-2 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
                      style={{ height: `${Math.min(growthStage * 20 + 20, 100)}px` }}
                    />
                    
                    {/* Leaves */}
                    {growthStage >= 2 && (
                      <>
                        <motion.div
                          className="absolute -left-6 bottom-8"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: -30 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <div className="h-8 w-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 rotate-[-30deg]" />
                        </motion.div>
                        <motion.div
                          className="absolute -right-6 bottom-12"
                          initial={{ scale: 0, rotate: 45 }}
                          animate={{ scale: 1, rotate: 30 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <div className="h-8 w-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 rotate-[30deg]" />
                        </motion.div>
                      </>
                    )}
                    
                    {growthStage >= 3 && (
                      <>
                        <motion.div
                          className="absolute -left-8 bottom-16"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          <div className="h-10 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 rotate-[-40deg]" />
                        </motion.div>
                        <motion.div
                          className="absolute -right-8 bottom-20"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        >
                          <div className="h-10 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 rotate-[40deg]" />
                        </motion.div>
                      </>
                    )}
                    
                    {/* Flowers */}
                    {growthStage >= 4 && (
                      <motion.div
                        className="absolute -top-4 left-1/2 -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        <div className="text-3xl">{growthStage >= 5 ? "🌸" : "🌼"}</div>
                      </motion.div>
                    )}
                    
                    {/* Sparkles for max level */}
                    {growthStage >= 5 && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-yellow-400"
                            style={{
                              top: `${-20 - i * 15}px`,
                              left: `${-20 + i * 20}px`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          >
                            <Sparkles className="h-4 w-4" />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Pot Base */}
              <div className="relative">
                <div className="h-12 w-20 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-2xl" />
                <div className="absolute -top-2 left-0 right-0 h-4 bg-gradient-to-b from-amber-500 to-amber-700 rounded-t-lg" />
                {/* Soil */}
                <div className="absolute top-1 left-2 right-2 h-3 bg-gradient-to-b from-amber-900 to-amber-950 rounded-t-lg" />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Status Bar */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Plant Status:</span>
            <span className="font-medium flex items-center gap-2">
              {plantState.name}
              <span className="text-lg">{plantState.emoji}</span>
            </span>
          </div>
          
          {/* Health Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Health</span>
              <span>{Math.round(health)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  health >= 70 ? "bg-gradient-to-r from-green-400 to-emerald-500" :
                  health >= 40 ? "bg-gradient-to-r from-yellow-400 to-amber-500" :
                  "bg-gradient-to-r from-red-400 to-rose-500"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${health}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Activity Icons */}
          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="flex flex-col items-center">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                todayBreaks.hydration > 0 ? "bg-blue-100 dark:bg-blue-900/30" : "bg-muted"
              )}>
                <Droplets className={cn(
                  "h-5 w-5",
                  todayBreaks.hydration > 0 ? "text-blue-500" : "text-muted-foreground"
                )} />
              </div>
              <span className="text-xs text-muted-foreground mt-1">{todayBreaks.hydration}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                todayBreaks.breathing > 0 ? "bg-cyan-100 dark:bg-cyan-900/30" : "bg-muted"
              )}>
                <Wind className={cn(
                  "h-5 w-5",
                  todayBreaks.breathing > 0 ? "text-cyan-500" : "text-muted-foreground"
                )} />
              </div>
              <span className="text-xs text-muted-foreground mt-1">{todayBreaks.breathing}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                todayBreaks.stretching > 0 ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
              )}>
                <PersonStanding className={cn(
                  "h-5 w-5",
                  todayBreaks.stretching > 0 ? "text-green-500" : "text-muted-foreground"
                )} />
              </div>
              <span className="text-xs text-muted-foreground mt-1">{todayBreaks.stretching}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
