import {Airport, Flight, SearchFormData} from "@/types/types.ts";
import {apiClient} from "@/api/client.ts";

export const fetchAirports = async () => {
  return apiClient<Airport[]>('/airports');
};

export const searchFlights = async (searchParams: SearchFormData) => {
  return apiClient<Flight[]>('/search-flights', {
    params: {
      destination_codes: searchParams.destinationCodes,
      duration: searchParams.duration,
      budget: searchParams.budget,
    }
  });
};