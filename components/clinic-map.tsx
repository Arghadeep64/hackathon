"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Icon, LatLngExpression } from "leaflet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation, Phone, Clock, Star, IndianRupee } from "lucide-react"
import "leaflet/dist/leaflet.css"

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
  consultationFee?: number
}

interface ClinicMapProps {
  clinics: Clinic[]
  selectedClinic?: string | null
  onSelectClinic?: (id: string) => void
}

// Custom marker icon
const createCustomIcon = (isSelected: boolean) => new Icon({
  iconUrl: isSelected 
    ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
    : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function MapController({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  
  return null
}

export function ClinicMap({ clinics, selectedClinic, onSelectClinic }: ClinicMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  
  // Default center (New Delhi, India)
  const defaultCenter: [number, number] = [28.6139, 77.2090]
  const center = userLocation || defaultCenter
  
  const handleLocate = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
          setIsLocating(false)
        },
        () => {
          setIsLocating(false)
        }
      )
    }
  }
  
  const getPriceLabel = (range: "low" | "medium" | "high", fee?: number) => {
    if (fee) return `₹${fee}`
    switch (range) {
      case "low": return "₹"
      case "medium": return "₹₹"
      case "high": return "₹₹₹"
    }
  }

  return (
    <div className="relative h-[400px] w-full rounded-xl overflow-hidden border">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} zoom={12} />
        
        {/* User location marker */}
        {userLocation && (
          <Marker 
            position={userLocation}
            icon={new Icon({
              iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Clinic markers */}
        {clinics.map((clinic) => (
          <Marker
            key={clinic.id}
            position={[clinic.lat, clinic.lng]}
            icon={createCustomIcon(selectedClinic === clinic.id)}
            eventHandlers={{
              click: () => onSelectClinic?.(clinic.id),
            }}
          >
            <Popup>
              <div className="min-w-[200px] space-y-2">
                <h3 className="font-semibold text-base">{clinic.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {clinic.acceptsWalkIn && (
                    <Badge variant="secondary" className="text-xs">Walk-in OPD</Badge>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <IndianRupee className="h-3 w-3" />
                    {clinic.consultationFee || getPriceLabel(clinic.priceRange)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>{clinic.rating} ({clinic.reviewCount})</span>
                </div>
                <p className="text-xs text-muted-foreground">{clinic.address}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{clinic.hours}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="h-7 text-xs flex-1 gap-1">
                    <Navigation className="h-3 w-3" />
                    Directions
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs flex-1 gap-1">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Locate button overlay */}
      <div className="absolute top-4 right-4 z-[1000]">
        <Button
          size="sm"
          variant="secondary"
          className="gap-2 shadow-lg glass-card"
          onClick={handleLocate}
          disabled={isLocating}
        >
          <Navigation className={`h-4 w-4 ${isLocating ? "animate-pulse" : ""}`} />
          {isLocating ? "Locating..." : "Use my location"}
        </Button>
      </div>
    </div>
  )
}
