import type {Flight} from "../types/types.ts";
import {CITY_IMAGES} from "../constants/cityImages";

export const getCityImage = (destination: string): string => {
  const cityName = destination.toLowerCase();

  for (const [key, image] of Object.entries(CITY_IMAGES)) {
    if (cityName.includes(key)) return image;
  }

  return null;
};

export const groupFlightsByDestination = (flights: Flight[]): Record<string, Flight[]> => {

  return flights.reduce((acc, flight) => {
    const destination = flight.outbound.arrivalStation;

    if (!acc[destination]) {
      acc[destination] = [];
    }

    acc[destination].push(flight);
    return acc;
  }, {} as Record<string, Flight[]>);
};

export const extractAirportCode = (station: string): string => {
  // "Skopje (Macedonia) - SKP"
  const parts = station.split('-');
  return parts[1].trim() || '';
};

export const extractCity = (station: string) => {
  // "Skopje (Macedonia) - SKP"
  const parts = station.split('(')
  return parts[0].trim() || '';
};


