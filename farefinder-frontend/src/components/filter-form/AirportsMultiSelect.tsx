import * as React from "react";
import {useState, useMemo} from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';
import {Airport} from "@/types/types.ts";
import AirportSelectItem from "@/components/filter-form/AirportSelectItem.tsx";
import AirportGroup from "@/components/filter-form/AirportGroup.tsx";

interface AirportsMultiSelectProps {
  airports: Airport[];
  selectedAirportCodes: string[];
  onSelectedAirportsChange: (codes: string[]) => void;
}

export const AirportsMultiSelect: React.FC<AirportsMultiSelectProps> = ({
                                                                         airports,
                                                                         selectedAirportCodes,
                                                                         onSelectedAirportsChange,
                                                                       }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const airportsByCountry = useMemo(() => {
    const groupedAirports: Record<string, Airport[]> = {};

    airports.forEach(airport => {
      const country = airport.country || 'Other';
      if (!groupedAirports[country]) {
        groupedAirports[country] = [];
      }
      groupedAirports[country].push(airport);
    });

    return groupedAirports;
  }, [airports]);

  const allAirportCodes = useMemo(() => airports.map(a => a.code), [airports]);

  const areAllAirportsSelected = selectedAirportCodes.length === allAirportCodes.length

  const handleSelectAllAirports = () => {
    onSelectedAirportsChange(areAllAirportsSelected ? [] : [...allAirportCodes]);
  };

  const handleSelectAirport = (airportCode: string) => {
    const updatedCodes = selectedAirportCodes.includes(airportCode)
      ? selectedAirportCodes.filter(code => code !== airportCode)
      : [...selectedAirportCodes, airportCode];

    onSelectedAirportsChange(updatedCodes);
  };

  const destinationText = useMemo(() => {
    if (selectedAirportCodes.length === 0) return 'Select destinations';

    if (selectedAirportCodes.length === 1) {
      const airport = airports.find(a => a.code === selectedAirportCodes[0]);
      return `${airport.name} (${airport.code})`;
    }

    if (areAllAirportsSelected) return 'All Destinations';

    return `${selectedAirportCodes.length} destinations selected`;
  }, [selectedAirportCodes]);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <span className="truncate">{destinationText}</span>
        <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0 ml-2"/>
      </button>

      {isSelectOpen && (
        <>
          <div
            className="fixed inset-0 z-40 animate-in fade-in duration-200"
            onClick={() => setIsSelectOpen(false)}
          />
          <div className="absolute z-50 bottom-full mb-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md max-h-96 overflow-auto">
            <div className="p-2">
              <AirportSelectItem
                label="All Destinations"
                isChecked={areAllAirportsSelected}
                onClick={handleSelectAllAirports}
                isBold
              />

              <div className="my-2 h-px bg-border"/>

              {Object.entries(airportsByCountry).map(([country, countryAirports]) => (
                <AirportGroup
                  key={country}
                  country={country}
                  airports={countryAirports}
                  selectedAirportCodes={selectedAirportCodes}
                  onAirportSelect={handleSelectAirport}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};