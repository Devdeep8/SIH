// lib/getPreciseLocation.ts
import axios from 'axios';

const API_KEY = '62ac97fccdmshe8e71fd8903b982p169d56jsn46747a655bb5'; // Replace with your API key

export async function getPreciseLocation(lat: string, lon: string) {
  try {
    const response = await axios.get('https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse', {
      params: {
        lat,
        lon,
        zoom: '10',
        addressdetails: '1',
        format: 'json'
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching precise location:', error);
    return null;
  }
}
