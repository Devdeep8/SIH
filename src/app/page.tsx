"use client";
import { useState, useEffect } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
}

interface Address {
  residential?: string;
  city?: string;
  town?: string;
  village?: string;
  suburb?: string;
  country?: string;
}

export default function Home() {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null , accuracy : null });
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log(position);
          const { latitude, longitude , accuracy } = position.coords;
          setLocation({ latitude, longitude , accuracy });
          
          // Fetch address based on latitude and longitude
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              setAddress(data.address); // Get the address object
            })
            .catch((err) => {
              setError('Failed to fetch address');
            });
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not available on this browser');
    }
  }, []);

  console.log(address);
  return (
    <div className="container">
      <h1>Geolocation in Next.js</h1>
      {location.latitude && location.longitude ? (
        <p>
          Your location: Latitude: {location.latitude}, Longitude: {location.longitude} , Accuracy : {location.accuracy} 
        </p>
      ) : (
        <p>Getting location...</p>
      )}
      
      {address ? (
        <p>
          You are in: {address.city} , {address.residential }, {address.country}
        </p>
      ) : (
        location.latitude && <p>Fetching address...</p>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
}
