"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Timer, 
  Activity, 
  Stethoscope, 
  MapPin, 
  Trophy,
  Leaf
} from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: Activity },
  { href: "/timer", label: "Focus Timer", icon: Timer },
  { href: "/symptoms", label: "Symptom Triage", icon: Stethoscope },
  { href: "/clinics", label: "Find Clinics", icon: MapPin },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border/50 rounded-none">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Leaf className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            WellnessNudge
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-muted/30">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative"
              >
                <motion.div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-10",
                    isActive 
                      ? "text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </motion.div>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg shadow-md"
                    layoutId="nav-pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 shadow-sm">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">40 pts</span>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-border/50">
        <div className="flex justify-around py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex-1"
              >
                <motion.div
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive ? "bg-primary/10" : "bg-transparent"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span>{item.label.split(' ')[0]}</span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
