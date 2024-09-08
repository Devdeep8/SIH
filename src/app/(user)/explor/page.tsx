"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
const MapComponent = dynamic(() => import("@/components/mapcompoent"), {
  ssr: false,
});
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  Utensils,
  Palette,
} from "lucide-react";

// Interfaces
export interface CityInfo {
  city: string;
  country: string;
  localTime: string;
}

export interface EventInfo {
  id: number;
  name: string;
  date: string;
  type: string;
  lat: number;
  lon: number;
  description: string;
}

export interface PlaceInfo {
  id: number;
  name: string;
  description: string;
  lat: number;
  lon: number;
  imageUrl: string;
}

export interface WeatherInfo {
  temp: number;
  condition: string;
  icon: string;
}

export interface RecommendationInfo {
  id: number;
  name: string;
  type: string;
}

export interface ShopInfo {
  id: number;
  name: string;
  type: string;
  lat: number;
  lon: number;
}

// API calls
const fetchLocationInfo = async (
  lat: number,
  lon: number
): Promise<CityInfo> => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=3280c93af52a4f3488c2b322542e21e4`
  );
  const data = await response.json();
  const location = data.results[0].components;
  return {
    city: location.city || location.state_district || "Unknown City",
    country: location.country || "Unknown Country",
    localTime: new Date().toLocaleTimeString(),
  };
};

const fetchLocalEvents = async (
  lat: number,
  lon: number
): Promise<EventInfo[]> => {
  const response = await fetch(
    `https://handsome-spontaneity-production.up.railway.app/event?lat=${lat}&lng=${lon}`
  );
  const data = await response.json();
  console.log(data);
  return data.map(
    (event: any): EventInfo => ({
      id: event.id,
      name: event.name,
      date: event.date,
      description: event.description,
      type: event.type,
      lat: event.latitude,
      lon: event.longitude,
    })
  );
};

const fetchHistoricalPlaces = async (
  lat: number,
  lon: number
): Promise<PlaceInfo[]> => {
  const response = await fetch(
    `https://handsome-spontaneity-production.up.railway.app/culture?lat=${lat}&lng=${lon}`
  );
  const data = await response.json();
  console.log(data);
  return data.map(
    (place: any): PlaceInfo => ({
      id: place.id,
      name: place.name,
      description: place.description,
      lat: place.latitude,
      lon: place.longitude,
      imageUrl:
        place.imageUrl ||
        "https://drive.google.com/uc?export=view&id=1-0dxI69Ke6HYH2nZKvXk5PfZbTzogbIm",
    })
  );
};

const fetchWeather = async (lat: number, lon: number): Promise<WeatherInfo> => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=49e10b559fdc5b8ba5e67efd9ca67a75
&units=metric`);
  const data = await response.json();
  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
  };
};

// const fetchRecommendations = async (city: string): Promise<RecommendationInfo[]> => {
//   const response = await fetch(`https://handsome-spontaneity-production.up.railway.app/recommendations?city=${encodeURIComponent(city)}`)
//   const data = await response.json()
//   return data.map((rec: any): RecommendationInfo => ({
//     id: rec.id,
//     name: rec.name,
//     type: rec.type,
//   }))
// }

const fetchRecommendations = async (
  city: string
): Promise<RecommendationInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return [
    { id: 1, name: "Ancient Temple", type: "Historical Site" },
    { id: 2, name: "Traditional Tea House", type: "Cultural Experience" },
    { id: 3, name: "Local History Museum", type: "Educational" },
    { id: 4, name: "Ethnic Quarter", type: "Cultural Exploration" },
    { id: 5, name: "Heritage Walking Tour", type: "Guided Experience" },
  ];
};

// const fetchLocalShops = async (lat: number, lon: number): Promise<ShopInfo[]> => {
//   const response = await fetch(`https://handsome-spontaneity-production.up.railway.app/shops?lat=${lat}&lng=${lon}`)
//   const data = await response.json()
//   return data.map((shop: any): ShopInfo => ({
//     id: shop.id,
//     name: shop.name,
//     type: shop.type,
//     lat: shop.latitude,
//     lon: shop.longitude,
//   }))
// }

const fetchLocalShops = async (
  lat: number,
  lon: number
): Promise<ShopInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
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
  ];
};
export default function CulturalExplorer() {
  const [location, setLocation] = useState<CityInfo | null>(null);
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [historicalPlaces, setHistoricalPlaces] = useState<PlaceInfo[]>([]);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationInfo[]>(
    []
  );
  const [localShops, setLocalShops] = useState<ShopInfo[]>([]);
  const [viewport, setViewport] = useState({
    latitude: 22.6558916,
    longitude: 75.8230987,
    zoom: 12,
  });
  const [selectedMarker, setSelectedMarker] = useState<
    EventInfo | PlaceInfo | ShopInfo | null
  >(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setViewport({ latitude, longitude, zoom: 12 });

          const locationInfo = await fetchLocationInfo(latitude, longitude);
          setLocation(locationInfo);

          const localEvents = await fetchLocalEvents(latitude, longitude);
          setEvents(localEvents);

          const localHistoricalPlaces = await fetchHistoricalPlaces(
            latitude,
            longitude
          );
          setHistoricalPlaces(localHistoricalPlaces);

          const weatherInfo = await fetchWeather(latitude, longitude);
          setWeather(weatherInfo);

          const localShops = await fetchLocalShops(latitude, longitude);
          setLocalShops(localShops);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  // Combine recommendations from events, historical places, and shops
  const combinedRecommendations = [
    ...events.slice(0, 2).map((event) => ({
      id: event.id,
      name: event.name,
      type: "Event",
      description: event.description,
    })),
    ...historicalPlaces.slice(0, 2).map((place) => ({
      id: place.id,
      name: place.name,
      type: "Historical Site",
      description: place.description,
    })),
    ...localShops.slice(0, 2).map((shop) => ({
      id: shop.id,
      name: shop.name,
      type: "Shop",
      description: shop.type,
    })),
  ];

 
  
  

  
  const imageUrls = [
    "/Annapurna-Temple.jpg",
    "/Rajwada-Palace.jpeg",
    "/Lalbagh-Palace.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-amber-100 shadow-md"
      >
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-amber-900 flex items-center">
            {process.env.APP_NAME || "HeriTech"}
          </h1>
          <h2 className="text-2xl font-semibold text-amber-800">
            {location
              ? `Discover ${location.city}'s Heritage`
              : "Explore Cultural Treasures"}
          </h2>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-800">
            Cultural Highlights
          </h2>
          <Carousel className="w-full h-[600px]">
            <CarouselContent>
              {historicalPlaces.slice(0, 3).map((item, index) => (
                <CarouselItem key={item.id}>
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[500px]">
                    {/* Use the image URL from the array */}
                    <img
                      src={imageUrls[index] || ""}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-white text-lg">{item.description}</p>
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
                  setSelectedMarker={setSelectedMarker}
                />
              </CardContent>
            </Card>

            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-amber-100">
                <TabsTrigger
                  value="events"
                  className="data-[state=active]:bg-amber-200"
                >
                  Cultural Events
                </TabsTrigger>
                <TabsTrigger
                  value="places"
                  className="data-[state=active]:bg-amber-200"
                >
                  Historical Sites
                </TabsTrigger>
                <TabsTrigger
                  value="shops"
                  className="data-[state=active]:bg-amber-200"
                >
                  Local Treasures
                </TabsTrigger>
              </TabsList>
              <TabsContent value="events">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {events.map((event) => (
                      <Card
                        key={event.id}
                        className="bg-white/50 hover:bg-white transition-colors"
                      >
                        <CardHeader>
                          <CardTitle className="text-amber-800">
                            {event.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="flex items-center text-amber-700">
                            <Calendar className="inline mr-2" />
                            {event.description}
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
                      <Card
                        key={place.id}
                        className="bg-white/50 hover:bg-white transition-colors"
                      >
                        <CardHeader>
                          <CardTitle className="text-amber-800">
                            {place.name}
                          </CardTitle>
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
                      <Card
                        key={shop.id}
                        className="bg-white/50 hover:bg-white transition-colors"
                      >
                        <CardHeader>
                          <CardTitle className="text-amber-800">
                            {shop.name}
                          </CardTitle>
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
                      <CardTitle className="text-amber-800">
                        Local Atmosphere
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div>
                        <p className="text-4xl font-bold text-amber-700">
                          {weather.temp}°C
                        </p>
                        <p className="text-amber-600">{weather.condition}</p>
                      </div>
                      <img
                        src={weather.icon}
                        alt={weather.condition}
                        className="w-16 h-16"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <Card className="bg-gradient-to-br from-amber-100 to-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-800">
                  Cultural Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {combinedRecommendations.map((rec) => (
                    <li
                      key={rec.id}
                      className="flex items-center text-amber-700"
                    >
                      {rec.type === "Event" && (
                        <Calendar className="mr-2" />
                      )}
                      {rec.type === "Historical Site" && (
                        <Landmark className="mr-2" />
                      )}
                      {rec.type === "Shop" && (
                        <ShoppingBag className="mr-2" />
                      )}
                      <span>
                        {rec.name} -{" "}
                        <span className="text-amber-600">{rec.type}</span>
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
                      <CardTitle className="text-amber-800">
                        Local Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="flex items-center text-amber-700 mb-2">
                        <Globe className="mr-2" /> <strong>Region:</strong>{" "}
                        {location.city}
                      </p>
                      <p className="flex items-center text-amber-700 mb-2">
                        <MapPin className="mr-2" /> <strong>Country:</strong>{" "}
                        {location.country}
                      </p>
                      <p className="flex items-center text-amber-700">
                        <Clock className="mr-2" /> <strong>Local Time:</strong>{" "}
                        {location.localTime}
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-800">
            Explore Cultural Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-red-100 to-red-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Camera className="mr-2" /> Photography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700">
                  Capture the essence of cultural heritage through the lens.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-100 to-blue-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <Utensils className="mr-2" /> Culinary Arts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  Savor the flavors of traditional and modern local cuisine.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-100 to-green-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Palette className="mr-2" /> Visual Arts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">
                  Explore the rich tapestry of local and historical artworks.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
