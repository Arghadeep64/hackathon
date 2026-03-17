"use client"

import { useEffect, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet"
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
  userLocation?: { lat: number; lng: number } | null
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

const userLocationIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
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

export function ClinicMap({ clinics, selectedClinic, onSelectClinic, userLocation }: ClinicMapProps) {
  // Calculate map center based on user location or first clinic
  const center = useMemo<[number, number]>(() => {
    if (userLocation) {
      return [userLocation.lat, userLocation.lng]
    }
    if (clinics.length > 0) {
      return [clinics[0].lat, clinics[0].lng]
    }
    // Default center (New Delhi, India)
    return [28.6139, 77.2090]
  }, [userLocation, clinics])

  // Calculate appropriate zoom level based on clinic distances
  const zoom = useMemo(() => {
    if (clinics.length === 0) return 12
    const maxDistance = Math.max(...clinics.map(c => c.distance))
    if (maxDistance < 2) return 15
    if (maxDistance < 5) return 13
    if (maxDistance < 10) return 12
    return 11
  }, [clinics])
  
  const getPriceLabel = (range: "low" | "medium" | "high", fee?: number) => {
    if (fee) return `${fee}`
    switch (range) {
      case "low": return "Affordable"
      case "medium": return "Moderate"
      case "high": return "Premium"
    }
  }

  return (
    <div className="relative h-[400px] w-full rounded-xl overflow-hidden border">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} zoom={zoom} />
        
        {/* User location marker with accuracy circle */}
        {userLocation && (
          <>
            <Marker 
              position={[userLocation.lat, userLocation.lng]}
              icon={userLocationIcon}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">Your Location</p>
                  <p className="text-xs text-muted-foreground">
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={[userLocation.lat, userLocation.lng]}
              radius={200}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.1,
                weight: 2
              }}
            />
          </>
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
              <div className="min-w-[220px] space-y-2">
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
                  <span className="mx-1">|</span>
                  <span>{clinic.distance} km away</span>
                </div>
                <p className="text-xs text-muted-foreground">{clinic.address}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{clinic.hours}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="h-7 text-xs flex-1 gap-1"
                    onClick={() => {
                      window.open(`https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`, "_blank")
                    }}
                  >
                    <Navigation className="h-3 w-3" />
                    Directions
                  </Button>
                  {clinic.phone !== "Contact not available" && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 text-xs flex-1 gap-1"
                      onClick={() => {
                        window.open(`tel:${clinic.phone}`, "_self")
                      }}
                    >
                      <Phone className="h-3 w-3" />
                      Call
                    </Button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span>Your Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span>Hospital/Clinic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  )
}
