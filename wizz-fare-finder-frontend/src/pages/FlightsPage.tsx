import * as React from "react";
import {useState, useEffect} from "react";
import HeroSection from "@/components/HeroSection.tsx";
import SearchForm from "@/components/filter-form/SearchForm.tsx";
import Flights from "@/components/Flights.tsx";
import {Airport, Flight, SearchFormData} from "@/types/types.ts";
import {fetchAirports, searchFlights} from "@/api/flights.ts";
import {ServerStatusBanner} from "@/components/ServerStatusBanner.tsx";

const FlightsPage: React.FC = () => {
  const [airportsByCode, setAirportsByCode] = useState<Map<string, Airport>>(new Map());

  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [expandedDestinations, setExpandedDestinations] = useState<Set<string>>(new Set());

  const [searchFormData, setSearchFormData] = useState<SearchFormData>({
    destinationCodes: [],
    duration: 1,
    budget: 4000,
  });

  useEffect(() => {
    handleFetchAirports();
  }, []);

  const handleFetchAirports = async () => {
    try {
      const data = await fetchAirports();
      const airportsMap = new Map(data.map(airport => [airport.code, airport]))

      setAirportsByCode(airportsMap);
    } catch (error) {
      console.error('Failed to fetch airports:', error);
    }
  };

  const handleSearchFlights = async () => {
    setIsLoading(true);
    try {
      const data = await searchFlights(searchFormData);
      setFlights(data);
    } catch (error) {
      console.error('Failed to search flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchParamsChange = (params: Partial<SearchFormData>) => {
    setSearchFormData((prev) => ({ ...prev, ...params }));
  };

  const toggleDestination = (destination: string) => {
    setExpandedDestinations((prev) => {
      const newExpandedDestinations = new Set(prev);
      if (newExpandedDestinations.has(destination)) {
        newExpandedDestinations.delete(destination);
      } else {
        newExpandedDestinations.add(destination);
      }
      return newExpandedDestinations;
    });
  };

  const getAirportCountry = (code: string): string => {
    return airportsByCode.get(code)?.country || "Unknown";
  }

  return (
    <div className="bg-background">
      <ServerStatusBanner />
      <HeroSection />
      <SearchForm
        airports={[...airportsByCode.values()]}
        searchParams={searchFormData}
        onSearchFormDataChange={handleSearchParamsChange}
        onSearch={handleSearchFlights}
        isSearching={isLoading}
      />
      <Flights
        getAirportCountry={getAirportCountry}
        flights={flights}
        expandedDestinations={expandedDestinations}
        onToggleDestination={toggleDestination}
      />
    </div>
  );
};

export default FlightsPage;
