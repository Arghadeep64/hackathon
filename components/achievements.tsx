"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Trophy,
  Flame,
  Droplets,
  Wind,
  PersonStanding,
  Sparkles,
  Star,
  Zap,
  Target,
  Crown,
  Leaf,
  Heart,
  Award,
  Lock,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: LucideIcon
  category: "breaks" | "streaks" | "special" | "milestones"
  progress: number
  target: number
  unlocked: boolean
  unlockedAt?: Date
  rarity: "common" | "rare" | "epic" | "legendary"
  points: number
}

const rarityColors = {
  common: {
    bg: "bg-slate-100 dark:bg-slate-800",
    border: "border-slate-200 dark:border-slate-700",
    text: "text-slate-600 dark:text-slate-400",
    icon: "text-slate-500",
  },
  rare: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-600 dark:text-blue-400",
    icon: "text-blue-500",
  },
  epic: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-600 dark:text-purple-400",
    icon: "text-purple-500",
  },
  legendary: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-600 dark:text-amber-400",
    icon: "text-amber-500",
  },
}

const rarityLabels = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
}

interface AchievementsProps {
  points: number
  streak: number
  breaksCompleted: number
  todayBreaks: {
    hydration: number
    breathing: number
    stretching: number
  }
  className?: string
}

export function Achievements({ 
  points, 
  streak, 
  breaksCompleted, 
  todayBreaks,
  className 
}: AchievementsProps) {
  const achievements: Achievement[] = [
    // Break achievements
    {
      id: "first-break",
      name: "First Steps",
      description: "Complete your first wellness break",
      icon: Star,
      category: "breaks",
      progress: Math.min(breaksCompleted, 1),
      target: 1,
      unlocked: breaksCompleted >= 1,
      rarity: "common",
      points: 10,
    },
    {
      id: "hydration-hero",
      name: "Hydration Hero",
      description: "Complete 5 hydration breaks",
      icon: Droplets,
      category: "breaks",
      progress: Math.min(todayBreaks.hydration, 5),
      target: 5,
      unlocked: todayBreaks.hydration >= 5,
      rarity: "rare",
      points: 50,
    },
    {
      id: "zen-master",
      name: "Zen Master",
      description: "Complete 5 breathing exercises",
      icon: Wind,
      category: "breaks",
      progress: Math.min(todayBreaks.breathing, 5),
      target: 5,
      unlocked: todayBreaks.breathing >= 5,
      rarity: "rare",
      points: 50,
    },
    {
      id: "stretch-expert",
      name: "Stretch Expert",
      description: "Complete 5 stretching breaks",
      icon: PersonStanding,
      category: "breaks",
      progress: Math.min(todayBreaks.stretching, 5),
      target: 5,
      unlocked: todayBreaks.stretching >= 5,
      rarity: "rare",
      points: 50,
    },
    // Streak achievements
    {
      id: "streak-starter",
      name: "On a Roll",
      description: "Maintain a 3-day streak",
      icon: Flame,
      category: "streaks",
      progress: Math.min(streak, 3),
      target: 3,
      unlocked: streak >= 3,
      rarity: "common",
      points: 25,
    },
    {
      id: "streak-warrior",
      name: "Streak Warrior",
      description: "Maintain a 7-day streak",
      icon: Zap,
      category: "streaks",
      progress: Math.min(streak, 7),
      target: 7,
      unlocked: streak >= 7,
      rarity: "epic",
      points: 100,
    },
    {
      id: "streak-legend",
      name: "Legendary Focus",
      description: "Maintain a 30-day streak",
      icon: Crown,
      category: "streaks",
      progress: Math.min(streak, 30),
      target: 30,
      unlocked: streak >= 30,
      rarity: "legendary",
      points: 500,
    },
    // Milestone achievements
    {
      id: "century",
      name: "Century Club",
      description: "Earn 100 wellness points",
      icon: Target,
      category: "milestones",
      progress: Math.min(points, 100),
      target: 100,
      unlocked: points >= 100,
      rarity: "rare",
      points: 25,
    },
    {
      id: "wellness-warrior",
      name: "Wellness Warrior",
      description: "Earn 500 wellness points",
      icon: Trophy,
      category: "milestones",
      progress: Math.min(points, 500),
      target: 500,
      unlocked: points >= 500,
      rarity: "epic",
      points: 100,
    },
    // Special achievements
    {
      id: "balanced",
      name: "Perfect Balance",
      description: "Complete all three break types in one day",
      icon: Heart,
      category: "special",
      progress: [todayBreaks.hydration > 0, todayBreaks.breathing > 0, todayBreaks.stretching > 0].filter(Boolean).length,
      target: 3,
      unlocked: todayBreaks.hydration > 0 && todayBreaks.breathing > 0 && todayBreaks.stretching > 0,
      rarity: "epic",
      points: 75,
    },
    {
      id: "plant-nurture",
      name: "Green Thumb",
      description: "Help your virtual plant grow to full bloom",
      icon: Leaf,
      category: "special",
      progress: Math.min(points, 100),
      target: 100,
      unlocked: points >= 100,
      rarity: "rare",
      points: 50,
    },
    {
      id: "champion",
      name: "Wellness Champion",
      description: "Unlock 10 achievements",
      icon: Award,
      category: "special",
      progress: 0, // Will be calculated
      target: 10,
      unlocked: false,
      rarity: "legendary",
      points: 250,
    },
  ]

  // Calculate champion achievement progress
  const unlockedCount = achievements.filter(a => a.id !== "champion" && a.unlocked).length
  const championAchievement = achievements.find(a => a.id === "champion")
  if (championAchievement) {
    championAchievement.progress = unlockedCount
    championAchievement.unlocked = unlockedCount >= 10
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const lockedAchievements = achievements.filter(a => !a.unlocked)

  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Achievements
          </CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            {unlockedAchievements.length} / {achievements.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Unlocked</h4>
            <div className="grid gap-2">
              <AnimatePresence>
                {unlockedAchievements.map((achievement, idx) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    index={idx}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* In Progress */}
        {lockedAchievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">In Progress</h4>
            <div className="grid gap-2">
              {lockedAchievements.slice(0, 3).map((achievement, idx) => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                  index={idx}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const colors = rarityColors[achievement.rarity]
  const progress = (achievement.progress / achievement.target) * 100
  const Icon = achievement.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "relative p-3 rounded-xl border transition-all",
        achievement.unlocked ? colors.bg : "bg-muted/30",
        achievement.unlocked ? colors.border : "border-border",
        "hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3">
        <motion.div 
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
            achievement.unlocked 
              ? `bg-gradient-to-br ${achievement.rarity === "legendary" ? "from-amber-400 to-orange-500" : achievement.rarity === "epic" ? "from-purple-400 to-pink-500" : achievement.rarity === "rare" ? "from-blue-400 to-cyan-500" : "from-slate-400 to-slate-500"}`
              : "bg-muted"
          )}
          whileHover={achievement.unlocked ? { scale: 1.1, rotate: 5 } : {}}
        >
          {achievement.unlocked ? (
            <Icon className="h-5 w-5 text-white" />
          ) : (
            <Lock className="h-4 w-4 text-muted-foreground" />
          )}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h5 className={cn(
              "font-medium text-sm truncate",
              achievement.unlocked ? "text-foreground" : "text-muted-foreground"
            )}>
              {achievement.name}
            </h5>
            <Badge 
              variant="outline" 
              className={cn(
                "text-[10px] px-1.5 py-0",
                colors.text,
                colors.border
              )}
            >
              {rarityLabels[achievement.rarity]}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className={cn(
                  "h-full rounded-full",
                  achievement.unlocked 
                    ? "bg-gradient-to-r from-primary to-accent" 
                    : "bg-primary/50"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0">
              {achievement.progress}/{achievement.target}
            </span>
          </div>
        </div>

        {achievement.unlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center shadow-md">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
