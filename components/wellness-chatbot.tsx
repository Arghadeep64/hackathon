"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Sparkles,
  Droplets,
  Wind,
  PersonStanding,
  Heart,
  Clock,
  Stethoscope,
  Loader2
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickReplies = [
  { label: "Breathing exercise", icon: Wind },
  { label: "Hydration reminder", icon: Droplets },
  { label: "Stretch break", icon: PersonStanding },
  { label: "Find a clinic", icon: Stethoscope },
]

// Simple wellness chatbot responses
const getWellnessResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes("breath") || lowerMessage.includes("stress") || lowerMessage.includes("anxious") || lowerMessage.includes("calm")) {
    return "I recommend trying a box breathing exercise: Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, and hold for 4 seconds. Repeat this cycle 4-6 times. This technique activates your parasympathetic nervous system and helps reduce stress. Would you like me to guide you through it?"
  }
  
  if (lowerMessage.includes("water") || lowerMessage.includes("hydrat") || lowerMessage.includes("drink") || lowerMessage.includes("thirst")) {
    return "Staying hydrated is essential! Aim for 8 glasses (about 2 liters) of water daily. Signs of dehydration include fatigue, headaches, and difficulty concentrating. Try keeping a water bottle at your desk and take a sip every 20 minutes. Would you like me to set up hydration reminders?"
  }
  
  if (lowerMessage.includes("stretch") || lowerMessage.includes("back") || lowerMessage.includes("neck") || lowerMessage.includes("shoulder") || lowerMessage.includes("posture")) {
    return "Here's a quick desk stretch routine: 1) Roll your shoulders backward 10 times, 2) Tilt your head to each side for 15 seconds, 3) Stand and reach for the ceiling, 4) Twist your torso gently side to side. These stretches help prevent tension and improve posture. Ready to try them?"
  }
  
  if (lowerMessage.includes("clinic") || lowerMessage.includes("doctor") || lowerMessage.includes("hospital") || lowerMessage.includes("medical") || lowerMessage.includes("aiims") || lowerMessage.includes("apollo")) {
    return "You can find nearby hospitals and clinics using our Clinic Finder feature. It shows healthcare options across India from government hospitals like AIIMS and Safdarjung (starting from ₹10) to private hospitals like Apollo, Fortis, and Max. All listings include ratings, consultation fees in Rupees, and OPD availability. Would you like me to help you search for a specific type of specialist?"
  }
  
  if (lowerMessage.includes("symptom") || lowerMessage.includes("sick") || lowerMessage.includes("pain") || lowerMessage.includes("feel")) {
    return "If you're experiencing symptoms, our Symptom Checker can help identify which type of specialist might be most appropriate for your concerns. It uses a triage system (Green/Yellow/Red) to assess urgency. For emergencies in India, call 112 (National Emergency) or 102 (Ambulance). Would you like to describe your symptoms?"
  }
  
  if (lowerMessage.includes("break") || lowerMessage.includes("tired") || lowerMessage.includes("focus") || lowerMessage.includes("productivity")) {
    return "Taking regular breaks actually improves productivity! The Pomodoro Technique suggests working for 25 minutes, then taking a 5-minute break. During breaks, try stepping away from your screen, doing light stretches, or practicing mindful breathing. Your Work Timer is set up to remind you automatically."
  }
  
  if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia") || lowerMessage.includes("rest")) {
    return "Good sleep hygiene is crucial for wellness. Tips: 1) Maintain a consistent sleep schedule, 2) Avoid screens 1 hour before bed, 3) Keep your room cool and dark, 4) Try relaxation techniques like deep breathing. Aim for 7-9 hours per night."
  }
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage.includes("namaste")) {
    return "Namaste! I'm your wellness assistant. I can help you with breathing exercises (Pranayama), hydration tips, stretching routines (Yoga stretches), finding hospitals and clinics across India, and general wellness advice. What would you like to know about today?"
  }
  
  if (lowerMessage.includes("thank")) {
    return "You're welcome! Remember, taking care of your health is a journey, not a destination. I'm here whenever you need wellness tips or support. Is there anything else I can help you with?"
  }
  
  // Default response
  return "I'm here to help with your wellness journey! I can assist with breathing exercises, hydration reminders, stretching routines, finding clinics, or checking symptoms. What would you like to explore?"
}

export function WellnessChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! I'm your wellness assistant. How can I help you stay healthy today? You can ask me about breathing exercises (Pranayama), hydration, stretching, or finding hospitals and clinics across India.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500))

    const response = getWellnessResponse(userMessage.content)
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleQuickReply = (reply: string) => {
    setInput(reply)
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: reply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsTyping(true)

      setTimeout(() => {
        const response = getWellnessResponse(reply)
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        }
        setIsTyping(false)
        setMessages((prev) => [...prev, assistantMessage])
      }, 1000 + Math.random() * 500)
    }, 100)
    setInput("")
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-primary to-accent hover:shadow-xl hover:scale-105 transition-all"
              >
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">Open wellness chat</span>
              </Button>
              
              {/* Notification pulse */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]"
          >
            <Card className="flex flex-col h-[600px] max-h-[calc(100vh-120px)] shadow-2xl border-primary/20 overflow-hidden bg-card/95 backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-accent/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Wellness Assistant</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      Online - Here to help
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                        message.role === "user"
                          ? "bg-primary"
                          : "bg-gradient-to-br from-primary to-accent"
                      )}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 max-w-[75%]",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={cn(
                        "text-[10px] mt-1 opacity-70",
                        message.role === "user" ? "text-right" : "text-left"
                      )}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {quickReplies.map((reply) => (
                    <Button
                      key={reply.label}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply.label)}
                      className="shrink-0 text-xs h-8 rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                    >
                      <reply.icon className="h-3 w-3 mr-1.5" />
                      {reply.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-card/80">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about wellness tips..."
                    className="flex-1 rounded-full bg-muted border-0 focus-visible:ring-primary/50"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isTyping}
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50"
                  >
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
