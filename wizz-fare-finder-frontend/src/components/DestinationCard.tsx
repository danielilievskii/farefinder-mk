import * as React from "react";
import {ChevronUp, ChevronDown} from "lucide-react";
import {getCityImage} from "@/utils/flights.ts";
import {formatPrice} from "@/utils/format.ts";
import {Flight} from "@/types/types";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import FlightCard from "@/components/FlightCard.tsx";


interface DestinationGroupProps {
  destination: string;
  flights: Flight[];
  getAirportCountry: (code: string) => string;
  isExpanded: boolean;
  onToggle: () => void;
}

const DestinationCard: React.FC<DestinationGroupProps> = ({
                                                            destination,
                                                            flights,
                                                            getAirportCountry,
                                                            isExpanded,
                                                            onToggle,
                                                          }) => {

  const minPrice = Math.min(...flights.map((f) => f.total_discount_price));

  const airportCode = flights[0].outbound.arrivalStation.split("-")[1].trim()
  const airportCountry = getAirportCountry(airportCode);
  const fullDestination = `${destination}, ${airportCountry}`;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <Card className="bg-gradient-card shadow-card hover:shadow-flight transition-shadow duration-300">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="hover:bg-muted/10 transition-colors">
            <div className="flex items-center gap-4">
              <div
                className="w-64 h-32 flex-shrink-0 rounded-md bg-cover bg-center"
                style={{backgroundImage: `url(${getCityImage(destination)})`}}
              />

              <div className="flex flex-1 items-center justify-between">
                <div className="text-left">
                  <CardTitle className="text-lg">{fullDestination}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {flights.length} flight{flights.length !== 1 ? 's' : ''} available
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-lg font-bold text-primary">{formatPrice(minPrice)}</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5"/>
                  ) : (
                    <ChevronDown className="w-5 h-5"/>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {flights.map((flight, index) => (
                <FlightCard key={index} flight={flight}/>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default DestinationCard