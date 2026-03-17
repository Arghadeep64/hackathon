"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { ClinicFinder } from "@/components/clinic-finder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MapPin,
  Phone,
  Clock,
  DollarSign,
  Building2
} from "lucide-react"

function ClinicFinderWithParams() {
  const searchParams = useSearchParams()
  const specialist = searchParams.get("specialist") || ""
  
  return <ClinicFinder initialSpecialist={specialist} />
}

export default function ClinicsPage() {
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
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Building2 className="h-6 w-6 text-accent-foreground" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Find Clinics & Specialists
              </h1>
              <p className="text-muted-foreground">
                Discover affordable healthcare options near you
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Clinic Finder */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Suspense fallback={
              <Card className="glass-card">
                <CardContent className="py-12 text-center">
                  <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <p className="text-muted-foreground">Loading clinics...</p>
                </CardContent>
              </Card>
            }>
              <ClinicFinderWithParams />
            </Suspense>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Quick Tips */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Finding Affordable Care</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  {[
                    { icon: DollarSign, title: "Community Health Centers", desc: "Often offer sliding-scale fees based on income" },
                    { icon: Clock, title: "Walk-in Clinics", desc: "No appointment needed, great for minor issues" },
                    { icon: Phone, title: "Call Ahead", desc: "Ask about self-pay rates and payment plans" },
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Price Guide */}
            <Card className="glass-card overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">Price Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "$ Affordable", price: "Under $75", color: "text-green-600 dark:text-green-400", bg: "bg-green-500" },
                    { label: "$$ Moderate", price: "$75 - $150", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500" },
                    { label: "$$$ Premium", price: "$150+", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500" },
                  ].map((tier, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${tier.bg}`} />
                        <span className={`font-medium ${tier.color}`}>{tier.label}</span>
                      </div>
                      <span className="text-muted-foreground">{tier.price}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Prices are estimates and may vary. Contact clinics directly for accurate pricing.
                </p>
              </CardContent>
            </Card>

            {/* Need Immediate Help */}
            <Card className="glass-card bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-11 w-11 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-red-700 dark:text-red-400">Emergency: 911</p>
                      <p className="text-muted-foreground text-xs">
                        For life-threatening emergencies
                      </p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-bold">Health Line: 811</p>
                      <p className="text-muted-foreground text-xs">
                        Free health advice 24/7
                      </p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
