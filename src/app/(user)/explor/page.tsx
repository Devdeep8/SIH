'use client'

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
const MapComponent = dynamic(() => import('@/components/mapcompoent'), { ssr: false });
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  MapPin,
  Search,
  Calendar,
  Coffee,
  Sun,
  Cloud,
  Umbrella,
  Landmark,
  ShoppingBag,
  Globe,
  Clock,
  ChevronLeft,
  ChevronRight,
  Camera,
  Book,
  Music,
} from "lucide-react"

// Interfaces (unchanged)
export interface CityInfo {
  city: string
  country: string
  localTime: string
}

export interface EventInfo {
  id: number
  name: string
  date: string
  type: string
  lat: number
  lon: number
}

export interface PlaceInfo {
  id: number
  name: string
  description: string
  lat: number
  lon: number
}

export interface WeatherInfo {
  temp: number
  condition: string
}

export interface RecommendationInfo {
  id: number
  name: string
  type: string
}

export interface ShopInfo {
  id: number
  name: string
  type: string
  lat: number
  lon: number
}

export interface CarouselItem {
  id: number
  title: string
  description: string
  imageUrl: string
}

export interface CulturalArtifact {
  id: number
  name: string
  origin: string
  period: string
  description: string
  imageUrl: string
}

// API calls (unchanged except for fetchCulturalArtifacts)
const fetchLocationInfo = async (lat: number, lon: number): Promise<CityInfo> => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=3280c93af52a4f3488c2b322542e21e4`
  )
  const data = await response.json()
  const location = data.results[0].components
  return {
    city: location.city || location.state_district ||"Unknown City",
    country: location.state || "Unknown State",
    localTime: new Date().toLocaleTimeString(),
  }
}

const fetchLocalEvents = async (lat: number, lon: number): Promise<EventInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [
    {
      id: 1,
      name: "Traditional Food Festival",
      date: "2023-07-15",
      type: "Cultural Cuisine",
      lat: lat + 0.01,
      lon: lon - 0.01,
    },
    {
      id: 2,
      name: "Folk Music Concert",
      date: "2023-07-22",
      type: "Cultural Music",
      lat: lat - 0.005,
      lon: lon + 0.008,
    },
    {
      id: 3,
      name: "Heritage Art Exhibition",
      date: "2023-07-29",
      type: "Cultural Art",
      lat: lat + 0.007,
      lon: lon + 0.003,
    },
    {
      id: 4,
      name: "Historical Reenactment",
      date: "2023-08-05",
      type: "Living History",
      lat: lat - 0.003,
      lon: lon - 0.006,
    },
    {
      id: 5,
      name: "Traditional Crafts Market",
      date: "2023-08-12",
      type: "Cultural Crafts",
      lat: lat + 0.004,
      lon: lon - 0.002,
    },
  ]
}

const fetchHistoricalPlaces = async (lat: number, lon: number): Promise<PlaceInfo[]> => {
  const response = await fetch(`https://handsome-spontaneity-production.up.railway.app/culture?lat=${lat}&lng=${lon}`)
  const data = await response.json()
  return data.map((place: any): PlaceInfo => ({
    id: place.id,
    name: place.name,
    description: place.description,
    lat: place.latitude,
    lon: place.longitude,
  }))
}

const fetchWeather = async (lat: number, lon: number): Promise<WeatherInfo> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return { temp: 22, condition: "Sunny" }
}

const fetchRecommendations = async (city: string): Promise<RecommendationInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return [
    { id: 1, name: "Ancient Temple", type: "Historical Site" },
    { id: 2, name: "Traditional Tea House", type: "Cultural Experience" },
    { id: 3, name: "Local History Museum", type: "Educational" },
    { id: 4, name: "Ethnic Quarter", type: "Cultural Exploration" },
    { id: 5, name: "Heritage Walking Tour", type: "Guided Experience" },
  ]
}

const fetchLocalShops = async (lat: number, lon: number): Promise<ShopInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return [
    {
      id: 1,
      name: "Antique Bookstore",
      type: "Historical Literature",
      lat: lat + 0.002,
      lon: lon - 0.003,
    },
    {
      id: 2,
      name: "Traditional Clothing Boutique",
      type: "Cultural Attire",
      lat: lat - 0.004,
      lon: lon + 0.005,
    },
    {
      id: 3,
      name: "Local Artisan Workshop",
      type: "Traditional Crafts",
      lat: lat + 0.003,
      lon: lon - 0.006,
    },
    {
      id: 4,
      name: "Heritage Antique Shop",
      type: "Historical Artifacts",
      lat: lat - 0.002,
      lon: lon + 0.004,
    },
    {
      id: 5,
      name: "Cultural Spice Market",
      type: "Traditional Ingredients",
      lat: lat + 0.001,
      lon: lon - 0.002,
    },
  ]
}

const fetchCarouselItems = async (): Promise<CarouselItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: 1,
      title: "Ancient Traditions",
      description: "Discover the rich tapestry of local customs and rituals.",
      imageUrl: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      title: "Culinary Heritage",
      description: "Savor the flavors of traditional cuisine passed down through generations.",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 3,
      title: "Artistic Legacy",
      description: "Immerse yourself in the vibrant world of local arts and crafts.",
      imageUrl: "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ]
}

const fetchCulturalArtifacts = async (): Promise<CulturalArtifact[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return [
    {
      id: 1,
      name: "Ancient Pottery",
      origin: "Mesopotamia",
      period: "3000 BCE",
      description: "Intricately designed pottery from ancient Mesopotamian civilization.",
      imageUrl: "https://images.unsplash.com/photo-1590687755272-6a4e6a7a6c7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      name: "Renaissance Painting",
      origin: "Italy",
      period: "16th Century",
      description: "A masterpiece from the Italian Renaissance period.",
      imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      name: "Mayan Sculpture",
      origin: "Central America",
      period: "600-800 CE",
      description: "A stone sculpture depicting Mayan deities and rituals.",
      imageUrl: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      name: "Japanese Samurai Armor",
      origin: "Japan",
      period: "Edo Period (1603-1868)",
      description: "A complete set of traditional Japanese samurai armor.",
      imageUrl: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      name: "Egyptian Hieroglyphs",
      origin: "Egypt",
      period: "2000 BCE",
      description: "Ancient Egyptian writing system carved on stone.",
      imageUrl: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ]
}

export default function CulturalExplorer() {
  const [location, setLocation] = useState<CityInfo | null>(null)
  const [events, setEvents] = useState<EventInfo[]>([])
  const [historicalPlaces, setHistoricalPlaces] = useState<PlaceInfo[]>([])
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [recommendations, setRecommendations] = useState<RecommendationInfo[]>([])
  const [localShops, setLocalShops] = useState<ShopInfo[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  })
  const [selectedMarker, setSelectedMarker] = useState<EventInfo | PlaceInfo | ShopInfo | null>(null)
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([])
  const [culturalArtifacts, setCulturalArtifacts] = useState<CulturalArtifact[]>([])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setViewport({ latitude, longitude, zoom: 12 })

          const locationInfo = await fetchLocationInfo(latitude, longitude)
          setLocation(locationInfo)

          const localEvents = await fetchLocalEvents(latitude, longitude)
          setEvents(localEvents)

          const localHistoricalPlaces = await fetchHistoricalPlaces(latitude, longitude)
          setHistoricalPlaces(localHistoricalPlaces)

          const weatherInfo = await fetchWeather(latitude, longitude)
          setWeather(weatherInfo)

          const localRecommendations = await fetchRecommendations(locationInfo.city)
          setRecommendations(localRecommendations)

          const localShops = await fetchLocalShops(latitude, longitude)
          setLocalShops(localShops)

          const carouselData = await fetchCarouselItems()
          setCarouselItems(carouselData)

          const artifactsData = await fetchCulturalArtifacts()
          setCulturalArtifacts(artifactsData)
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-amber-100 shadow-md"
      >
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-4 text-amber-900">
            {location ? `Discover ${location.city}'s Heritage` : "Explore Cultural Treasures"}
          </h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for cultural sites, events, or local treasures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-white/50 border-amber-200 focus:border-amber-500"
            />
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              <Search className="mr-2 h-4 w-4" /> Explore
            </Button>
          </form>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-800">Cultural Highlights</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {carouselItems.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg h-96">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white">{item.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-0">
               <MapComponent 
                latitude={viewport.latitude}
                  longitude={viewport.longitude}
                  zoom={viewport.zoom}
                  events={events}
                  historicalPlaces={historicalPlaces}
                  localShops={localShops}
                  selectedMarker={selectedMarker}
                  setSelectedMarker={setSelectedMarker} />
              </CardContent>
            </Card>

            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-amber-100">
                <TabsTrigger value="events" className="data-[state=active]:bg-amber-200">Cultural Events</TabsTrigger>
                <TabsTrigger value="places" className="data-[state=active]:bg-amber-200">Historical Sites</TabsTrigger>
                <TabsTrigger value="shops" className="data-[state=active]:bg-amber-200">Local Treasures</TabsTrigger>
              </TabsList>
              <TabsContent value="events">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {events.map((event) => (
                      <Card key={event.id} className="bg-white/50 hover:bg-white transition-colors">
                        <CardHeader>
                          <CardTitle className="text-amber-800">{event.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="flex items-center text-amber-700">
                            <Calendar className="inline mr-2" />
                            {event.date}
                          </p>
                          <p className="flex items-center text-amber-700">
                            <Coffee className="inline mr-2" />
                            {event.type}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="places">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {historicalPlaces.map((place) => (
                      <Card key={place.id} className="bg-white/50 hover:bg-white transition-colors">
                        <CardHeader>
                          <CardTitle className="text-amber-800">{place.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="flex items-center text-amber-700">
                            <Landmark className="inline mr-2" />
                            {place.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="shops">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {localShops.map((shop) => (
                      <Card key={shop.id} className="bg-white/50 hover:bg-white transition-colors">
                        <CardHeader>
                          <CardTitle className="text-amber-800">{shop.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="flex items-center text-amber-700">
                            <ShoppingBag className="inline mr-2" />
                            {shop.type}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            <AnimatePresence>
              {weather && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-amber-100 to-amber-50">
                    <CardHeader>
                      <CardTitle className="text-amber-800">Local Atmosphere</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-bold text-amber-700">{weather.temp}°C</p>
                      <p className="flex items-center text-amber-600">
                        {weather.condition === "Sunny" ? (
                          <Sun className="mr-2" />
                        ) : weather.condition === "Cloudy" ? (
                          <Cloud className="mr-2" />
                        ) : (
                          <Umbrella className="mr-2" />
                        )}
                        {weather.condition}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <Card className="bg-gradient-to-br from-amber-100 to-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-800">Cultural Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.map((rec) => (
                    <li key={rec.id} className="flex items-center text-amber-700">
                      <Coffee className="mr-2" />
                      <span>
                        {rec.name} - <span className="text-amber-600">{rec.type}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <AnimatePresence>
              {location && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-amber-100 to-amber-50">
                    <CardHeader>
                      <CardTitle className="text-amber-800">Local Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="flex items-center text-amber-700 mb-2">
                        <Globe className="mr-2" /> <strong>Region:</strong> {location.city}
                      </p>
                      <p className="flex items-center text-amber-700 mb-2">
                        <MapPin className="mr-2" /> <strong>Country:</strong> {location.country}
                      </p>
                      <p className="flex items-center text-amber-700">
                        <Clock className="mr-2" /> <strong>Local Time:</strong> {location.localTime}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-800">Cultural Artifacts Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalArtifacts.map((artifact) => (
              <Card key={artifact.id} className="bg-white hover:shadow-lg transition-shadow">
                <img src={artifact.imageUrl} alt={artifact.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="text-amber-800">{artifact.name}</CardTitle>
                  <CardDescription>{artifact.origin} - {artifact.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700">{artifact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-800">Explore Cultural Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-red-100 to-red-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Camera className="mr-2" /> Photography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700">Capture the essence of cultural heritage through the lens.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-100 to-blue-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <Book className="mr-2" /> Literature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">Dive into the rich literary traditions of diverse cultures.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-100 to-green-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Music className="mr-2" /> Music
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Experience the rhythms and melodies of cultural expression.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  )
}