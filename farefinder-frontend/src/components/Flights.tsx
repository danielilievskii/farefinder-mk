import * as React from "react";
import {Flight} from "@/types/types.ts";
import {groupFlightsByDestination} from "@/utils/flights.ts";
import DestinationCard from "@/components/DestinationCard.tsx";

interface FlightsProps {
  flights: Flight[];
  getAirportCountry: (code: string) => string;
  expandedDestinations: Set<string>;
  onToggleDestination: (destination: string) => void;
}

const Flights: React.FC<FlightsProps> = ({flights, getAirportCountry, expandedDestinations, onToggleDestination}) => {
  if (flights.length === 0) return <></>;

  const groupedFlights = groupFlightsByDestination(flights);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Flight Results ({flights.length})</h2>
      <div className="space-y-4">
        {Object.entries(groupedFlights).map(([destination, destinationFlights]) => (
          <DestinationCard
            key={destination}
            destination={destination}
            flights={destinationFlights}
            getAirportCountry={getAirportCountry}
            isExpanded={expandedDestinations.has(destination)}
            onToggle={() => onToggleDestination(destination)}
          />
        ))}
      </div>
    </div>
  );
};

export default Flights