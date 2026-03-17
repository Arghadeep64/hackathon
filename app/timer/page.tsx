"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { WorkTimer } from "@/components/work-timer"
import { VirtualPlant } from "@/components/virtual-plant"
import { Achievements } from "@/components/achievements"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Clock,
  History,
  Target,
  Trophy,
  Flame,
  Droplets,
  Wind,
  PersonStanding,
  Timer,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const recentActivity = [
  { type: "breathing", time: "10 minutes ago", points: 10 },
  { type: "hydration", time: "45 minutes ago", points: 5 },
  { type: "stretching", time: "2 hours ago", points: 15 },
  { type: "breathing", time: "3 hours ago", points: 10 },
]

const activityIcons = {
  breathing: Wind,
  hydration: Droplets,
  stretching: PersonStanding,
}

const activityColors = {
  breathing: "text-cyan-500 bg-cyan-500/10",
  hydration: "text-blue-500 bg-blue-500/10",
  stretching: "text-green-500 bg-green-500/10",
}

export default function TimerPage() {
  const [points, setPoints] = useState(40)
  const [streak] = useState(3)
  const [breaksCompleted, setBreaksCompleted] = useState(4)
  const [todayBreaks, setTodayBreaks] = useState({
    hydration: 1,
    breathing: 2,
    stretching: 1,
  })

  const handlePointsEarned = (earned: number) => {
    setPoints((prev) => prev + earned)
  }

  const handleBreakCompleted = (type?: "hydration" | "breathing" | "stretching") => {
    setBreaksCompleted((prev) => prev + 1)
    if (type) {
      setTodayBreaks((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }))
    } else {
      const types = ["hydration", "breathing", "stretching"] as const
      const randomType = types[Math.floor(Math.random() * types.length)]
      setTodayBreaks((prev) => ({
        ...prev,
        [randomType]: prev[randomType] + 1,
      }))
    }
  }

  const goals = {
    hydration: { target: 6, icon: Droplets, color: "text-blue-500", bgColor: "bg-blue-500" },
    breathing: { target: 4, icon: Wind, color: "text-cyan-500", bgColor: "bg-cyan-500" },
    stretching: { target: 4, icon: PersonStanding, color: "text-green-500", bgColor: "bg-green-500" },
  }

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Navigation />
      
      <main className="container px-4 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div 
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Timer className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Focus Timer</h1>
              <p className="text-muted-foreground">
                Stay focused and take healthy breaks throughout your workday
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Timer Area */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WorkTimer 
              onPointsEarned={handlePointsEarned}
              onBreakCompleted={handleBreakCompleted}
            />

            {/* Tabs for History and Settings */}
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-2 glass-card">
                <TabsTrigger value="history" className="gap-2">
                  <History className="h-4 w-4" />
                  Recent Activity
                </TabsTrigger>
                <TabsTrigger value="goals" className="gap-2">
                  <Target className="h-4 w-4" />
                  Daily Goals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="history">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Breaks</CardTitle>
                    <CardDescription>
                      Your break activity from today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity, idx) => {
                        const Icon = activityIcons[activity.type as keyof typeof activityIcons]
                        const colorClass = activityColors[activity.type as keyof typeof activityColors]
                        
                        return (
                          <motion.div 
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", colorClass)}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium capitalize">
                                  {activity.type} Break
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {activity.time}
                                </p>
                              </div>
                            </div>
                            <motion.span 
                              className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full"
                              whileHover={{ scale: 1.05 }}
                            >
                              +{activity.points} pts
                            </motion.span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Goals</CardTitle>
                    <CardDescription>
                      Track your progress towards daily wellness targets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {(Object.keys(goals) as Array<keyof typeof goals>).map((key, idx) => {
                        const goal = goals[key]
                        const current = todayBreaks[key]
                        const progress = Math.min((current / goal.target) * 100, 100)
                        const Icon = goal.icon
                        
                        return (
                          <motion.div 
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Icon className={cn("h-4 w-4", goal.color)} />
                                <span className="text-sm font-medium capitalize">{key} Breaks</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {current} / {goal.target}
                              </span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <motion.div 
                                className={cn("h-full rounded-full", goal.bgColor)}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                              />
                            </div>
                            {progress >= 100 && (
                              <motion.p 
                                className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <Sparkles className="h-3 w-3" />
                                Goal completed!
                              </motion.p>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Sidebar Stats */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Virtual Plant */}
            <VirtualPlant
              points={points}
              todayBreaks={todayBreaks}
            />

            {/* Quick Stats */}
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  Session Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <motion.div 
                    className="text-center p-3 rounded-xl bg-primary/5"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Trophy className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xl font-bold">{points}</p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </motion.div>
                  <motion.div 
                    className="text-center p-3 rounded-xl bg-orange-500/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Flame className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                    <p className="text-xl font-bold">{streak}</p>
                    <p className="text-xs text-muted-foreground">Streak</p>
                  </motion.div>
                  <motion.div 
                    className="text-center p-3 rounded-xl bg-accent/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Target className="h-5 w-5 text-accent-foreground mx-auto mb-1" />
                    <p className="text-xl font-bold">{breaksCompleted}</p>
                    <p className="text-xs text-muted-foreground">Breaks</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Achievements
              points={points}
              streak={streak}
              breaksCompleted={breaksCompleted}
              todayBreaks={todayBreaks}
            />

            {/* Tips Card */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Wellness Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Take a break every 25-30 minutes for optimal focus",
                    "Drink 8 glasses of water throughout the day",
                    "Deep breathing reduces stress and improves concentration",
                    "Regular stretching prevents muscle tension and pain",
                  ].map((tip, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
