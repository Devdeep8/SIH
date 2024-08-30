// app/location.tsx
import { getPreciseLocation } from '@/app/lib/getLocation';

interface LocationData {
  address: {
    city?: string;
    county?: string;
    country?: string;
    state?: string;
    road?: string;
    house_number?: string;
  };
}

export async function LocationInfo({ lat, lon }: { lat: string; lon: string }) {
  const locationData: LocationData | null = await getPreciseLocation(lat, lon);

  return (
    <div>
      {locationData ? (
        <div>
          <h1>Your Precise Location Information</h1>
          <p>City: {locationData.address.city}</p>
          <p>State: {locationData.address.state}</p>
          <p>Country: {locationData.address.country}</p>
          <p>Road: {locationData.address.road}</p>
          <p>House Number: {locationData.address.house_number}</p>
        </div>
      ) : (
        <p>Unable to fetch precise location information.</p>
      )}
    </div>
  );
}
