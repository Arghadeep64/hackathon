"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  IndianRupee,
  Star,
  Navigation,
  Filter,
  Building2,
  ChevronDown,
  List,
  Map
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dynamically import the map to avoid SSR issues
const ClinicMap = dynamic(() => import("./clinic-map").then(mod => mod.ClinicMap), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-xl bg-muted flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
})

interface Clinic {
  id: string
  name: string
  specialty: string[]
  address: string
  distance: number
  rating: number
  reviewCount: number
  priceRange: "low" | "medium" | "high"
  acceptsWalkIn: boolean
  hours: string
  phone: string
  waitTime?: string
  lat: number
  lng: number
  consultationFee: number
}

const mockClinics: Clinic[] = [
  {
    id: "1",
    name: "Apollo Clinic",
    specialty: ["General Physician", "Family Medicine", "Pediatrics"],
    address: "Connaught Place, New Delhi",
    distance: 0.5,
    rating: 4.5,
    reviewCount: 328,
    priceRange: "medium",
    acceptsWalkIn: true,
    hours: "8:00 AM - 8:00 PM",
    phone: "+91 11 2345 6789",
    waitTime: "15 min",
    lat: 28.6315,
    lng: 77.2167,
    consultationFee: 500,
  },
  {
    id: "2",
    name: "Fortis Healthcare",
    specialty: ["General Physician", "Internal Medicine", "Dermatologist"],
    address: "Vasant Kunj, New Delhi",
    distance: 1.2,
    rating: 4.8,
    reviewCount: 456,
    priceRange: "high",
    acceptsWalkIn: false,
    hours: "9:00 AM - 6:00 PM",
    phone: "+91 11 3456 7890",
    waitTime: "30 min",
    lat: 28.5355,
    lng: 77.1588,
    consultationFee: 1200,
  },
  {
    id: "3",
    name: "Max Super Speciality Hospital",
    specialty: ["Emergency", "General Physician", "Urgent Care"],
    address: "Saket, New Delhi",
    distance: 0.8,
    rating: 4.6,
    reviewCount: 512,
    priceRange: "high",
    acceptsWalkIn: true,
    hours: "24/7",
    phone: "+91 11 4567 8901",
    waitTime: "45 min",
    lat: 28.5245,
    lng: 77.2066,
    consultationFee: 1500,
  },
  {
    id: "4",
    name: "Mohalla Clinic",
    specialty: ["General Physician", "Pediatrics", "Basic Healthcare"],
    address: "Lajpat Nagar, New Delhi",
    distance: 2.1,
    rating: 4.2,
    reviewCount: 267,
    priceRange: "low",
    acceptsWalkIn: true,
    hours: "8:00 AM - 2:00 PM",
    phone: "+91 11 5678 9012",
    lat: 28.5677,
    lng: 77.2433,
    consultationFee: 50,
  },
  {
    id: "5",
    name: "AIIMS OPD",
    specialty: ["Cardiologist", "Neurologist", "Pulmonologist", "All Specialties"],
    address: "Ansari Nagar, New Delhi",
    distance: 3.4,
    rating: 4.7,
    reviewCount: 1024,
    priceRange: "low",
    acceptsWalkIn: true,
    hours: "8:00 AM - 4:00 PM",
    phone: "+91 11 2658 8500",
    lat: 28.5672,
    lng: 77.2100,
    consultationFee: 10,
  },
  {
    id: "6",
    name: "Sir Ganga Ram Hospital",
    specialty: ["ENT Specialist", "Allergist", "Sleep Specialist"],
    address: "Rajinder Nagar, New Delhi",
    distance: 1.5,
    rating: 4.5,
    reviewCount: 398,
    priceRange: "medium",
    acceptsWalkIn: false,
    hours: "9:00 AM - 5:00 PM",
    phone: "+91 11 2575 0000",
    lat: 28.6406,
    lng: 77.1898,
    consultationFee: 700,
  },
  {
    id: "7",
    name: "Medanta - The Medicity",
    specialty: ["Orthopedist", "Sports Medicine", "Physical Therapist"],
    address: "Sector 38, Gurugram",
    distance: 12.8,
    rating: 4.9,
    reviewCount: 756,
    priceRange: "high",
    acceptsWalkIn: false,
    hours: "7:00 AM - 9:00 PM",
    phone: "+91 124 4141 414",
    lat: 28.4395,
    lng: 77.0426,
    consultationFee: 2000,
  },
  {
    id: "8",
    name: "Centre for Sight",
    specialty: ["Ophthalmologist", "Optometrist"],
    address: "Dwarka, New Delhi",
    distance: 5.9,
    rating: 4.4,
    reviewCount: 245,
    priceRange: "medium",
    acceptsWalkIn: true,
    hours: "9:00 AM - 6:00 PM",
    phone: "+91 11 4700 0000",
    waitTime: "20 min",
    lat: 28.5921,
    lng: 77.0460,
    consultationFee: 600,
  },
  {
    id: "9",
    name: "Safdarjung Hospital",
    specialty: ["General Physician", "Surgery", "Emergency", "All Specialties"],
    address: "Ring Road, New Delhi",
    distance: 2.3,
    rating: 4.1,
    reviewCount: 892,
    priceRange: "low",
    acceptsWalkIn: true,
    hours: "24/7",
    phone: "+91 11 2673 0000",
    waitTime: "60 min",
    lat: 28.5684,
    lng: 77.2074,
    consultationFee: 10,
  },
  {
    id: "10",
    name: "BLK Super Speciality Hospital",
    specialty: ["Cardiologist", "Oncologist", "Gastroenterologist"],
    address: "Pusa Road, New Delhi",
    distance: 4.2,
    rating: 4.6,
    reviewCount: 534,
    priceRange: "high",
    acceptsWalkIn: false,
    hours: "8:00 AM - 8:00 PM",
    phone: "+91 11 3040 3040",
    lat: 28.6467,
    lng: 77.1854,
    consultationFee: 1800,
  },
]

interface ClinicFinderProps {
  initialSpecialist?: string
}

export function ClinicFinder({ initialSpecialist }: ClinicFinderProps) {
  const [searchTerm, setSearchTerm] = useState(initialSpecialist || "")
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "price">("distance")
  const [filterWalkIn, setFilterWalkIn] = useState(false)
  const [filterPriceRange, setFilterPriceRange] = useState<"all" | "low" | "medium" | "high">("all")
  const [viewMode, setViewMode] = useState<"list" | "map">("map")
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null)

  useEffect(() => {
    if (initialSpecialist) {
      setSearchTerm(initialSpecialist)
    }
  }, [initialSpecialist])

  const filteredClinics = mockClinics
    .filter((clinic) => {
      const matchesSearch =
        !searchTerm ||
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.specialty.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        )
      const matchesWalkIn = !filterWalkIn || clinic.acceptsWalkIn
      const matchesPrice =
        filterPriceRange === "all" || clinic.priceRange === filterPriceRange
      return matchesSearch && matchesWalkIn && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance
        case "rating":
          return b.rating - a.rating
        case "price":
          return a.consultationFee - b.consultationFee
        default:
          return 0
      }
    })

  const getPriceDisplay = (range: "low" | "medium" | "high", fee: number) => {
    switch (range) {
      case "low":
        return { label: "Affordable", icon: "₹", color: "text-green-600 dark:text-green-400", fee: `₹${fee}` }
      case "medium":
        return { label: "Moderate", icon: "₹₹", color: "text-amber-600 dark:text-amber-400", fee: `₹${fee}` }
      case "high":
        return { label: "Premium", icon: "₹₹₹", color: "text-rose-600 dark:text-rose-400", fee: `₹${fee}` }
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Find Clinics Near You
          </CardTitle>
          <CardDescription>
            Search for affordable clinics and medical specialists across India
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by specialty or hospital name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("distance")}>
                    Distance
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price")}>
                    Price
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={filterWalkIn ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterWalkIn(!filterWalkIn)}
                className="gap-2"
              >
                Walk-in OPD
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <IndianRupee className="h-4 w-4" />
                    Price: {filterPriceRange === "all" ? "All" : filterPriceRange}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterPriceRange("all")}>
                    All Prices
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriceRange("low")}>
                    ₹ Govt/Affordable (Under ₹100)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriceRange("medium")}>
                    ₹₹ Moderate (₹100 - ₹1000)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriceRange("high")}>
                    ₹₹₹ Premium (Above ₹1000)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="gap-2"
              >
                <Map className="h-4 w-4" />
                Map
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            {filteredClinics.length} hospitals/clinics found
          </p>
        </CardContent>
      </Card>

      {/* Map View */}
      <AnimatePresence mode="wait">
        {viewMode === "map" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ClinicMap 
              clinics={filteredClinics} 
              selectedClinic={selectedClinic}
              onSelectClinic={setSelectedClinic}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clinic List */}
      <div className="space-y-4">
        {filteredClinics.map((clinic, idx) => {
          const price = getPriceDisplay(clinic.priceRange, clinic.consultationFee)
          const isSelected = selectedClinic === clinic.id
          
          return (
            <motion.div
              key={clinic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card 
                className={cn(
                  "overflow-hidden glass-card cursor-pointer transition-all duration-300",
                  isSelected && "ring-2 ring-primary shadow-lg"
                )}
                onClick={() => setSelectedClinic(isSelected ? null : clinic.id)}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Number indicator */}
                    <div className="w-12 bg-gradient-to-b from-primary/10 to-primary/5 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-primary">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg">{clinic.name}</h3>
                            {clinic.acceptsWalkIn && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                Walk-in OPD
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1 mt-1">
                            {clinic.specialty.slice(0, 3).map((spec) => (
                              <Badge
                                key={spec}
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                {spec}
                              </Badge>
                            ))}
                            {clinic.specialty.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                +{clinic.specialty.length - 3}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {clinic.distance} km
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              {clinic.rating} ({clinic.reviewCount})
                            </span>
                            <span className={cn("font-medium flex items-center gap-0.5", price.color)}>
                              <IndianRupee className="h-3 w-3" />
                              {clinic.consultationFee}
                            </span>
                            {clinic.waitTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {clinic.waitTime}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5 shrink-0" />
                            {clinic.address}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          <Button size="sm" className="gap-2">
                            <Navigation className="h-4 w-4" />
                            Directions
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Phone className="h-4 w-4" />
                            Call
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 pt-3 border-t text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {clinic.hours}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          {clinic.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}

        {filteredClinics.length === 0 && (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg">No hospitals found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
