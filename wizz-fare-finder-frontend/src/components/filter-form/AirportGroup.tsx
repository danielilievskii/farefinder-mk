import * as React from "react";
import {Airport} from "@/types/types.ts";
import AirportSelectItem from "@/components/filter-form/AirportSelectItem.tsx";

interface AirportGroupProps {
  country: string;
  airports: Airport[];
  selectedAirportCodes: string[];
  onAirportSelect: (code: string) => void;
}

const AirportGroup: React.FC<AirportGroupProps> = ({
                                                     country,
                                                     airports,
                                                     selectedAirportCodes,
                                                     onAirportSelect
                                                   }) => (
  <div className="mb-3">
    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
      {country}
    </div>
    {airports.map((airport) => (
      <AirportSelectItem
        key={airport.code}
        label={`${airport.name} (${airport.code})`}
        isChecked={selectedAirportCodes.includes(airport.code)}
        onClick={() => onAirportSelect(airport.code)}
      />
    ))}
  </div>
);

export default AirportGroup;