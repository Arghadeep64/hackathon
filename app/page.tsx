"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { WorkTimer } from "@/components/work-timer"
import { GamificationStats } from "@/components/gamification-stats"
import { VirtualPlant } from "@/components/virtual-plant"
import { Achievements } from "@/components/achievements"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, 
  Stethoscope, 
  MapPin, 
  Timer,
  Heart,
  Sparkles,
  TrendingUp,
  Leaf
} from "lucide-react"

export default function HomePage() {
  const [points, setPoints] = useState(0)
  const [streak] = useState(1)
  const [breaksCompleted, setBreaksCompleted] = useState(0)
  const [todayBreaks, setTodayBreaks] = useState({
    hydration: 0,
    breathing: 0,
    stretching: 0,
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
      // Randomly increment one of the break types for demo
      const types = ["hydration", "breathing", "stretching"] as const
      const randomType = types[Math.floor(Math.random() * types.length)]
      setTodayBreaks((prev) => ({
        ...prev,
        [randomType]: prev[randomType] + 1,
      }))
    }
  }

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Navigation />
      
      <main className="container px-4 py-8">
        {/* Hero Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl">
            <motion.div 
              className="flex items-center gap-2 text-primary mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Your Wellness Companion</span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 text-balance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Take Better Care of Yourself,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                One Micro-Break at a Time
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl text-pretty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              WellnessNudge helps you maintain healthy habits throughout your workday with gamified reminders for stretching, hydration, and breathing exercises.
            </motion.p>
          </div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Timer */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <WorkTimer 
              onPointsEarned={handlePointsEarned}
              onBreakCompleted={handleBreakCompleted}
            />

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/symptoms" className="block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full glass-card hover:shadow-lg transition-all cursor-pointer group border-primary/10">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Stethoscope className="h-7 w-7 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            Symptom Checker
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Find the right specialist for your symptoms
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>

              <Link href="/clinics" className="block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full glass-card hover:shadow-lg transition-all cursor-pointer group border-accent/10">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center shrink-0"
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <MapPin className="h-7 w-7 text-accent-foreground" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            Find Clinics
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Locate affordable healthcare near you
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Stats & Plant */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Virtual Plant */}
            <VirtualPlant 
              points={points}
              todayBreaks={todayBreaks}
            />
            
            {/* Compact Stats */}
            <GamificationStats
              points={points}
              streak={streak}
              breaksCompleted={breaksCompleted}
              todayBreaks={todayBreaks}
            />

            {/* Achievements */}
            <Achievements
              points={points}
              streak={streak}
              breaksCompleted={breaksCompleted}
              todayBreaks={todayBreaks}
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.section 
          className="mt-20 pt-16 border-t"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Everything You Need for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Workplace Wellness
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform combines productivity tools with health features to help you stay balanced throughout your day.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Timer,
                title: "Smart Work Timer",
                description: "Focus sessions with automatic break reminders. Customize your work and break durations.",
                gradient: "from-primary/20 to-primary/5",
                iconColor: "text-primary",
              },
              {
                icon: Leaf,
                title: "Virtual Plant Garden",
                description: "Watch your plant grow as you complete wellness tasks. Nurture your digital companion.",
                gradient: "from-green-500/20 to-green-500/5",
                iconColor: "text-green-600 dark:text-green-400",
              },
              {
                icon: TrendingUp,
                title: "Health Insights",
                description: "Track your wellness habits over time. Find healthcare specialists when you need them.",
                gradient: "from-accent/30 to-accent/10",
                iconColor: "text-accent-foreground",
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass-card h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <motion.div 
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 bg-background/50 backdrop-blur-sm">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">WellnessNudge</span>
            </motion.div>
            <p className="text-sm text-muted-foreground text-center">
              Take care of your health. One break at a time.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Help</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
