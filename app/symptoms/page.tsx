"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { SymptomChecker } from "@/components/symptom-checker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Shield,
  AlertTriangle,
  Info,
  Stethoscope,
  CheckCircle,
  AlertCircle
} from "lucide-react"

export default function SymptomsPage() {
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
              <Stethoscope className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Symptom Triage
              </h1>
              <p className="text-muted-foreground">
                Get matched with the right specialist for your symptoms
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Symptom Checker */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SymptomChecker />
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Severity Legend */}
            <Card className="glass-card overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Severity Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 dark:text-red-400">Red - Emergency</p>
                    <p className="text-xs text-muted-foreground">Seek immediate care</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-700 dark:text-amber-400">Yellow - Urgent</p>
                    <p className="text-xs text-muted-foreground">Schedule soon</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400">Green - Routine</p>
                    <p className="text-xs text-muted-foreground">Schedule at convenience</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Call 911 immediately if you experience:
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    "Severe chest pain or pressure",
                    "Difficulty breathing",
                    "Sudden confusion or trouble speaking",
                    "Sudden severe headache",
                    "Loss of consciousness",
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 text-sm">
                  {[
                    { title: "Select Symptoms", desc: "Search or browse common symptoms" },
                    { title: "Get Recommendations", desc: "See which specialists can help" },
                    { title: "Find Care", desc: "Locate clinics and specialists nearby" },
                  ].map((step, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <span className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 text-primary-foreground font-medium text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-medium">{step.title}</p>
                        <p className="text-muted-foreground">{step.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Privacy Note */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Your Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your symptom information is processed locally and is not stored or shared. This tool is designed to help guide you to appropriate care while respecting your privacy.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
