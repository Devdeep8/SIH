"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import Map, { Marker, Popup, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface CityInfo {
  city: string;
  country: string;
  localTime: string;
}

interface EventInfo {
  id: number;
  name: string;
  date: string;
  type: string;
  lat: number;
  lon: number;
}

interface PlaceInfo {
  id: number;
  name: string;
  description: string;
  lat: number;
  lon: number;
}

interface WeatherInfo {
  temp: number;
  condition: string;
}

interface RecommendationInfo {
  id: number;
  name: string;
  type: string;
}

interface ShopInfo {
    id: number;
    name: string;
    type: string; // or any other relevant field
    lat: number;
    lon: number;
  }
  

// Mock API calls (replace with actual API calls in a real application)
const fetchLocationInfo = async (
  lat: number,
  lon: number
): Promise<CityInfo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    city: "San Francisco",
    country: "United States",
    localTime: new Date().toLocaleTimeString(),
  };
};

const fetchLocalEvents = async (
  lat: number,
  lon: number
): Promise<EventInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      id: 1,
      name: "Local Food Festival",
      date: "2023-07-15",
      type: "food",
      lat: lat + 0.01,
      lon: lon - 0.01,
    },
    {
      id: 2,
      name: "Summer Music Concert",
      date: "2023-07-22",
      type: "music",
      lat: lat - 0.005,
      lon: lon + 0.008,
    },
    {
      id: 3,
      name: "Art Exhibition Opening",
      date: "2023-07-29",
      type: "art",
      lat: lat + 0.007,
      lon: lon + 0.003,
    },
    {
      id: 4,
      name: "Tech Meetup",
      date: "2023-08-05",
      type: "technology",
      lat: lat - 0.003,
      lon: lon - 0.006,
    },
    {
      id: 5,
      name: "Farmers Market",
      date: "2023-08-12",
      type: "food",
      lat: lat + 0.004,
      lon: lon - 0.002,
    },
  ];
};

const fetchHistoricalPlaces = async (
  lat: number,
  lon: number
): Promise<PlaceInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return [
    {
      id: 1,
      name: "Old City Hall",
      description: "Historic government building from 1915",
      lat: lat - 0.008,
      lon: lon + 0.005,
    },
    {
      id: 2,
      name: "Victorian House Museum",
      description: "Preserved 19th-century home",
      lat: lat + 0.006,
      lon: lon - 0.004,
    },
    {
      id: 3,
      name: "Fort Point",
      description: "Civil War-era fortress under the Golden Gate Bridge",
      lat: lat + 0.009,
      lon: lon + 0.007,
    },
    {
      id: 4,
      name: "Cable Car Museum",
      description: "Museum showcasing San Francisco's iconic transportation",
      lat: lat - 0.004,
      lon: lon - 0.003,
    },
    {
      id: 5,
      name: "Painted Ladies",
      description: "Row of colorful Victorian houses",
      lat: lat + 0.002,
      lon: lon + 0.001,
    },
  ];
};

const fetchWeather = async (lat: number, lon: number): Promise<WeatherInfo> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { temp: 22, condition: "Sunny" };
};

const fetchRecommendations = async (
  city: string
): Promise<RecommendationInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return [
    { id: 1, name: "Golden Gate Park", type: "attraction" },
    { id: 2, name: "Fisherman's Wharf", type: "food" },
    { id: 3, name: "SFMOMA", type: "culture" },
    { id: 4, name: "Chinatown", type: "culture" },
    { id: 5, name: "Alcatraz Island", type: "history" },
  ];
};

const fetchLocalShops = async (
  lat: number,
  lon: number
): Promise<ShopInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    {
      id: 1,
      name: "Heritage Bookstore",
      type: "bookstore",
      lat: lat + 0.002,
      lon: lon - 0.003,
    },
    {
      id: 2,
      name: "Vintage Clothing Co.",
      type: "clothing",
      lat: lat - 0.004,
      lon: lon + 0.005,
    },
    {
      id: 3,
      name: "Local Artisans",
      type: "crafts",
      lat: lat + 0.003,
      lon: lon - 0.006,
    },
    {
      id: 4,
      name: "Antique Shop",
      type: "antiques",
      lat: lat - 0.002,
      lon: lon + 0.004,
    },
    {
      id: 5,
      name: "Cultural Market",
      type: "market",
      lat: lat + 0.001,
      lon: lon - 0.002,
    },
  ];
};

export default function ModernExplorePage() {
  const [location, setLocation] = useState<CityInfo | null>(null);
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [historicalPlaces, setHistoricalPlaces] = useState<PlaceInfo[]>([]);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationInfo[]>(
    []
  );
  const [localShops, setLocalShops] = useState<ShopInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });
  const [selectedMarker, setSelectedMarker] = useState<EventInfo | PlaceInfo | ShopInfo | null>(null);


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
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

        const localRecommendations = await fetchRecommendations(
          locationInfo.city
        );
        setRecommendations(localRecommendations);

        const localShops = await fetchLocalShops(latitude, longitude);
        setLocalShops(localShops);
      });
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md"
      >
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-4">
            {location ? `Explore ${location.city}` : "Explore Your City"}
          </h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for places, events, or recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="mb-8">
              <CardContent className="p-0">
                <Map
                  {...viewport}
                  onMove={(evt: ViewStateChangeEvent) =>
                    setViewport(evt.viewState)
                  }
                  style={{ width: "100%", height: "400px" }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN_HERE"
                >
                  {location && (
                    <Marker
                      longitude={viewport.longitude}
                      latitude={viewport.latitude}
                      anchor="bottom"
                    >
                      <MapPin className="text-blue-500" size={32} />
                    </Marker>
                  )}
                  {events.map((event) => (
                    <Marker
                      key={event.id}
                      longitude={event.lon}
                      latitude={event.lat}
                      anchor="bottom"
                    >
                      <Coffee
                        className="text-red-500 cursor-pointer"
                        size={24}
                        onClick={() =>
                          setSelectedMarker({ ...event, type: "event" })
                        }
                      />
                    </Marker>
                  ))}
                  {historicalPlaces.map((place) => (
                    <Marker
                      key={place.id}
                      longitude={place.lon}
                      latitude={place.lat}
                      anchor="bottom"
                    >
                      <Landmark
                        className="text-green-500 cursor-pointer"
                        size={24}
                        onClick={() =>
                          setSelectedMarker({ ...place, type: "historical" })
                        }
                      />
                    </Marker>
                  ))}
                  {localShops.map((shop) => (
                    <Marker
                      key={shop.id}
                      longitude={shop.lon}
                      latitude={shop.lat}
                      anchor="bottom"
                    >
                      <ShoppingBag
                        className="text-yellow-500 cursor-pointer"
                        size={24}
                        onClick={() => setSelectedMarker({ ...shop, type: "shop" as const })
                        }
                      />
                    </Marker>
                  ))}
                  {selectedMarker && (
                    <Popup
                      longitude={
                        (selectedMarker as EventInfo | PlaceInfo | ShopInfo).lon
                      }
                      latitude={
                        (selectedMarker as EventInfo | PlaceInfo | ShopInfo).lat
                      }
                      anchor="bottom"
                      onClose={() => setSelectedMarker(null)}
                    >
                      <div>
                        <h3 className="font-bold">
                          {
                            (selectedMarker as EventInfo | PlaceInfo | ShopInfo)
                              .name
                          }
                        </h3>
                        {"type" in selectedMarker && (
                          <>
                            {selectedMarker.type === "event" && (
                              <p>
                                {(selectedMarker as EventInfo).date} -{" "}
                                {selectedMarker.type}
                              </p>
                            )}
                            {selectedMarker.type === "historical" && (
                              <p>
                                {
                                  ((selectedMarker as unknown) as PlaceInfo)
                                    .description
                                }
                              </p>
                            )}
                            {selectedMarker.type === "shop" && (
                              <p>
                                <ShoppingBag className="inline mr-2" />
                                {(selectedMarker as ShopInfo).type}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </Popup>
                  )}
                </Map>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <Calendar className="inline mr-2" />
                        {event.date}
                      </p>
                      <p>
                        <Coffee className="inline mr-2" />
                        {event.type}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-semibold mb-4">Historical Places</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {historicalPlaces.map((place) => (
                  <Card key={place.id}>
                    <CardHeader>
                      <CardTitle>{place.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <Landmark className="inline mr-2" />
                        {place.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-semibold mb-4">Nearby Shops</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {localShops.map((shop) => (
                  <Card key={shop.id}>
                    <CardHeader>
                      <CardTitle>{shop.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <ShoppingBag className="inline mr-2" />
                        {shop.type}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {weather && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Weather</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{weather.temp}°C</p>
                  <p className="flex items-center">
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
            )}

            <Card>
              <CardHeader>
                <CardTitle>Local Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.map((rec) => (
                    <li key={rec.id} className="flex items-center">
                      <Coffee className="mr-2" />
                      <span>
                        {rec.name} - {rec.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {location && (
              <Card>
                <CardHeader>
                  <CardTitle>Local Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>City:</strong> {location.city}
                  </p>
                  <p>
                    <strong>Country:</strong> {location.country}
                  </p>
                  <p>
                    <strong>Local Time:</strong> {location.localTime}
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
