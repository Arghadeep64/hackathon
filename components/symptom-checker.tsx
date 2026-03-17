"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  X, 
  Stethoscope,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  MapPin,
  MessageCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const commonSymptoms = [
  "Headache",
  "Fatigue",
  "Cough",
  "Fever",
  "Sore Throat",
  "Back Pain",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Joint Pain",
  "Skin Rash",
  "Eye Pain",
  "Ear Pain",
  "Stomach Pain",
  "Anxiety",
  "Insomnia",
  "Muscle Ache",
]

// Severity levels matching the implementation plan
type Severity = "green" | "yellow" | "red"

interface SpecialistRecommendation {
  specialist: string
  relevance: "high" | "medium" | "low"
  description: string
  severity: Severity
}

const symptomToSpecialist: Record<string, SpecialistRecommendation[]> = {
  "Headache": [
    { specialist: "General Practitioner", relevance: "high", description: "For initial assessment and common headaches", severity: "green" },
    { specialist: "Neurologist", relevance: "medium", description: "For recurring or severe headaches", severity: "yellow" },
  ],
  "Fatigue": [
    { specialist: "General Practitioner", relevance: "high", description: "For initial blood work and assessment", severity: "green" },
    { specialist: "Endocrinologist", relevance: "medium", description: "If thyroid or hormonal issues suspected", severity: "green" },
  ],
  "Cough": [
    { specialist: "General Practitioner", relevance: "high", description: "For common respiratory infections", severity: "green" },
    { specialist: "Pulmonologist", relevance: "medium", description: "For persistent or chronic cough", severity: "yellow" },
  ],
  "Fever": [
    { specialist: "General Practitioner", relevance: "high", description: "For initial assessment", severity: "green" },
    { specialist: "Infectious Disease Specialist", relevance: "low", description: "For persistent or unexplained fever", severity: "yellow" },
  ],
  "Chest Pain": [
    { specialist: "Emergency Room", relevance: "high", description: "If severe or with shortness of breath - CALL 112", severity: "red" },
    { specialist: "Cardiologist", relevance: "high", description: "For heart-related concerns", severity: "yellow" },
  ],
  "Shortness of Breath": [
    { specialist: "Emergency Room", relevance: "high", description: "If sudden or severe - CALL 112", severity: "red" },
    { specialist: "Pulmonologist", relevance: "high", description: "For respiratory assessment", severity: "yellow" },
  ],
  "Back Pain": [
    { specialist: "General Practitioner", relevance: "high", description: "For initial assessment", severity: "green" },
    { specialist: "Orthopedist", relevance: "medium", description: "For structural issues", severity: "green" },
    { specialist: "Physical Therapist", relevance: "medium", description: "For rehabilitation", severity: "green" },
  ],
  "Joint Pain": [
    { specialist: "Rheumatologist", relevance: "high", description: "For inflammatory conditions", severity: "green" },
    { specialist: "Orthopedist", relevance: "high", description: "For structural issues", severity: "green" },
  ],
  "Skin Rash": [
    { specialist: "Dermatologist", relevance: "high", description: "For skin conditions", severity: "green" },
    { specialist: "Allergist", relevance: "medium", description: "If allergic reaction suspected", severity: "yellow" },
  ],
  "Eye Pain": [
    { specialist: "Ophthalmologist", relevance: "high", description: "For eye conditions", severity: "yellow" },
    { specialist: "Optometrist", relevance: "medium", description: "For vision-related issues", severity: "green" },
  ],
  "Ear Pain": [
    { specialist: "ENT Specialist", relevance: "high", description: "For ear, nose, and throat issues", severity: "green" },
    { specialist: "General Practitioner", relevance: "high", description: "For common ear infections", severity: "green" },
  ],
  "Anxiety": [
    { specialist: "Psychiatrist", relevance: "high", description: "For mental health assessment", severity: "yellow" },
    { specialist: "Psychologist", relevance: "high", description: "For therapy and counseling", severity: "green" },
  ],
  "Insomnia": [
    { specialist: "Sleep Specialist", relevance: "high", description: "For sleep disorders", severity: "green" },
    { specialist: "Psychiatrist", relevance: "medium", description: "If related to mental health", severity: "green" },
  ],
  "Sore Throat": [
    { specialist: "General Practitioner", relevance: "high", description: "For common infections", severity: "green" },
    { specialist: "ENT Specialist", relevance: "medium", description: "For recurring issues", severity: "green" },
  ],
  "Nausea": [
    { specialist: "General Practitioner", relevance: "high", description: "For initial assessment", severity: "green" },
    { specialist: "Gastroenterologist", relevance: "medium", description: "For digestive issues", severity: "green" },
  ],
  "Dizziness": [
    { specialist: "General Practitioner", relevance: "high", description: "For initial assessment", severity: "yellow" },
    { specialist: "ENT Specialist", relevance: "medium", description: "For balance disorders", severity: "green" },
    { specialist: "Neurologist", relevance: "medium", description: "For neurological causes", severity: "yellow" },
  ],
  "Stomach Pain": [
    { specialist: "General Practitioner", relevance: "high", description: "For initial assessment", severity: "green" },
    { specialist: "Gastroenterologist", relevance: "high", description: "For digestive issues", severity: "yellow" },
  ],
  "Muscle Ache": [
    { specialist: "General Practitioner", relevance: "high", description: "For initial assessment", severity: "green" },
    { specialist: "Physical Therapist", relevance: "high", description: "For rehabilitation", severity: "green" },
    { specialist: "Sports Medicine", relevance: "medium", description: "For sports-related injuries", severity: "green" },
  ],
}

const severityConfig = {
  red: {
    label: "Emergency",
    description: "Seek immediate medical attention",
    color: "bg-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-900",
    textColor: "text-red-700 dark:text-red-400",
    icon: AlertTriangle,
  },
  yellow: {
    label: "Urgent",
    description: "Schedule an appointment soon",
    color: "bg-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-900",
    textColor: "text-amber-700 dark:text-amber-400",
    icon: AlertCircle,
  },
  green: {
    label: "Routine",
    description: "Can be scheduled at convenience",
    color: "bg-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-900",
    textColor: "text-green-700 dark:text-green-400",
    icon: CheckCircle,
  },
}

export function SymptomChecker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [conversationStep, setConversationStep] = useState(0)

  const filteredSymptoms = commonSymptoms.filter(
    (symptom) =>
      symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSymptoms.includes(symptom)
  )

  const addSymptom = (symptom: string) => {
    setSelectedSymptoms([...selectedSymptoms, symptom])
    setSearchTerm("")
    setConversationStep((prev) => prev + 1)
  }

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    setShowResults(false)
  }

  const getRecommendations = (): SpecialistRecommendation[] => {
    const allRecommendations: SpecialistRecommendation[] = []
    const seenSpecialists = new Set<string>()

    selectedSymptoms.forEach((symptom) => {
      const recommendations = symptomToSpecialist[symptom] || []
      recommendations.forEach((rec) => {
        if (!seenSpecialists.has(rec.specialist)) {
          seenSpecialists.add(rec.specialist)
          allRecommendations.push(rec)
        }
      })
    })

    // Sort by severity (red first, then yellow, then green)
    const severityOrder = { red: 0, yellow: 1, green: 2 }
    const relevanceOrder = { high: 0, medium: 1, low: 2 }
    
    return allRecommendations.sort((a, b) => {
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity]
      }
      return relevanceOrder[a.relevance] - relevanceOrder[b.relevance]
    })
  }

  const recommendations = showResults ? getRecommendations() : []
  const highestSeverity = recommendations.length > 0 
    ? recommendations.reduce((acc, rec) => {
        const order = { red: 0, yellow: 1, green: 2 }
        return order[rec.severity] < order[acc] ? rec.severity : acc
      }, "green" as Severity)
    : null

  const conversationPrompts = [
    "Hi! I'm here to help you find the right care. What symptoms are you experiencing?",
    "Got it. Any other symptoms you'd like to add?",
    "Anything else? The more details, the better recommendation I can provide.",
    "Is there anything else bothering you?"
  ]

  return (
    <div className="space-y-6">
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <CardTitle>Symptom Triage</CardTitle>
              <CardDescription>
                Let's find the right specialist for you
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Conversational UI */}
          <motion.div
            key={conversationStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-primary/5 border border-primary/10"
          >
            <p className="text-sm text-foreground">
              {conversationPrompts[Math.min(conversationStep, conversationPrompts.length - 1)]}
            </p>
          </motion.div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Type your symptom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Selected Symptoms */}
          <AnimatePresence>
            {selectedSymptoms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2"
              >
                {selectedSymptoms.map((symptom) => (
                  <motion.div
                    key={symptom}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Badge
                      variant="secondary"
                      className="pl-3 pr-1 py-2 text-sm bg-primary/10 hover:bg-primary/20"
                    >
                      {symptom}
                      <button
                        onClick={() => removeSymptom(symptom)}
                        className="ml-2 p-1 rounded-full hover:bg-foreground/10"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {symptom}</span>
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Symptom Suggestions */}
          <AnimatePresence>
            {searchTerm && filteredSymptoms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border rounded-xl overflow-hidden divide-y"
              >
                {filteredSymptoms.slice(0, 5).map((symptom, idx) => (
                  <motion.button
                    key={symptom}
                    onClick={() => addSymptom(symptom)}
                    className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {symptom}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Common Symptoms Grid */}
          {!searchTerm && selectedSymptoms.length === 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Common symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.slice(0, 12).map((symptom, idx) => (
                  <motion.button
                    key={symptom}
                    onClick={() => addSymptom(symptom)}
                    className="px-4 py-2 text-sm rounded-full border hover:bg-primary/5 hover:border-primary/30 transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {symptom}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Find Specialists Button */}
          {selectedSymptoms.length > 0 && !showResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={() => setShowResults(true)}
                className="w-full h-12 text-base gap-2"
                size="lg"
              >
                <Stethoscope className="h-5 w-5" />
                Get Recommendations
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {showResults && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-card overflow-hidden">
              {/* Severity Banner */}
              {highestSeverity && (
                <div className={cn(
                  "px-6 py-4 flex items-center gap-3",
                  severityConfig[highestSeverity].bgColor
                )}>
                  {(() => {
                    const Icon = severityConfig[highestSeverity].icon
                    return <Icon className={cn("h-6 w-6", severityConfig[highestSeverity].textColor)} />
                  })()}
                  <div>
                    <p className={cn("font-semibold", severityConfig[highestSeverity].textColor)}>
                      {severityConfig[highestSeverity].label} Care Recommended
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {severityConfig[highestSeverity].description}
                    </p>
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle>Recommended Specialists</CardTitle>
                <CardDescription>
                  Based on: {selectedSymptoms.join(", ")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Emergency Warning */}
                {highestSeverity === "red" && (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900"
                  >
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-red-700 dark:text-red-400">
                        Seek Immediate Medical Attention
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                        Based on your symptoms, you should consider calling 112 (National Emergency) or 102 (Ambulance) or going to the nearest emergency room immediately.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button variant="destructive" size="sm" className="gap-2">
                          <Phone className="h-4 w-4" />
                          Call 112
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950">
                          <Phone className="h-4 w-4" />
                          Call 102 (Ambulance)
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Specialist List */}
                <div className="space-y-3">
                  {recommendations.map((rec, idx) => {
                    const config = severityConfig[rec.severity]
                    const Icon = config.icon
                    
                    return (
                      <motion.div
                        key={`${rec.specialist}-${idx}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md",
                          config.bgColor,
                          config.borderColor
                        )}
                      >
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                          rec.relevance === "high" ? "bg-white/80 dark:bg-white/10" : "bg-white/50 dark:bg-white/5"
                        )}>
                          <Stethoscope className={cn("h-5 w-5", config.textColor)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{rec.specialist}</h4>
                            <Badge className={cn("text-xs", config.color, "text-white")}>
                              <Icon className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {rec.description}
                          </p>
                        </div>
                        <Link 
                          href={`/clinics?specialist=${encodeURIComponent(rec.specialist)}`}
                          className="shrink-0"
                        >
                          <Button variant="outline" size="sm" className="gap-2">
                            <MapPin className="h-4 w-4" />
                            Find Nearby
                          </Button>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center pt-4 border-t">
                  This is not medical advice. Please consult with a healthcare professional for proper diagnosis and treatment.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
