'use client '
import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { EventInfo, PlaceInfo, ShopInfo } from "@/app/(user)/explor/page"
interface MapComponentProps {
  latitude: number
  longitude: number
  zoom: number
  events: EventInfo[]
  historicalPlaces: PlaceInfo[]
  localShops: ShopInfo[]
  selectedMarker: EventInfo | PlaceInfo | ShopInfo | null
  setSelectedMarker: (marker: EventInfo | PlaceInfo | ShopInfo | null) => void
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  zoom,
  events,
  historicalPlaces,
  localShops,
  selectedMarker,
  setSelectedMarker,
}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true) // This ensures that the map renders only on the client side
  }, [])

  if (!isClient) {
    return null // Return null if rendering on the server side
  }

  return (
    <MapContainer center={[latitude, longitude]} zoom={zoom} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {[...events, ...historicalPlaces, ...localShops].map((item) => (
        <Marker
          key={`${item.id}-${item.lat}-${item.lon}`}
          position={[item.lat, item.lon]}
          eventHandlers={{
            click: () => setSelectedMarker(item),
          }}
        >
          <Popup>
            <strong>{item.name}</strong>
            <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapComponent
