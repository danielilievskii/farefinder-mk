import * as React from "react";
import {buildWizzAirTicketsUrl, buildBookingUrl} from "@/utils/urls.ts";
import {formatPrice} from "@/utils/format.ts";
import { Flight } from "@/types/types.ts";
import FlightLegDisplay from "@/components/FlightLeg.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import BookingButton from "@/components/custom/BookingButton.tsx";
import {extractAirportCode} from "@/utils/flights.ts";

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const bookingUrl = buildBookingUrl(flight);

  const outboundArrival = extractAirportCode(flight.outbound.arrivalStation);
  const returnDeparture = extractAirportCode(flight.return.departureStation);
  const isSameAirport = outboundArrival === returnDeparture;

  const savings = flight.total_original_price - flight.total_discount_price;

  return (
    <Card className="bg-muted/20 border-muted">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <FlightLegDisplay leg={flight.outbound} type="outbound" />
          <FlightLegDisplay leg={flight.return} type="return" />

          <div className="space-y-2 lg:text-right">
            <h4 className="font-semibold text-sm">Total Price</h4>
            <div className="space-y-1">
              <div className="text-xl font-bold text-primary">
                {formatPrice(flight.total_discount_price)}
              </div>
              {savings > 0 && (
                <>
                  <div className="text-sm text-muted-foreground line-through">
                    {formatPrice(flight.total_original_price)}
                  </div>
                  <div className="text-xs text-accent font-medium">Save {formatPrice(savings)}</div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-end mt-4">
          {isSameAirport ? (
            <BookingButton
              href={buildWizzAirTicketsUrl(flight, "roundtrip")}
              label="Buy Tickets"
              provider="WizzAir.com"
              variant="primary"
            />
          ) : (
            <>
              <BookingButton
                href={buildWizzAirTicketsUrl(flight, "outbound")}
                label="Buy Outbound Tickets"
                provider="WizzAir.com"
                variant="primary"
              />
              <BookingButton
                href={buildWizzAirTicketsUrl(flight, "return")}
                label="Buy Return Tickets"
                provider="WizzAir.com"
                variant="primary"
              />
            </>
          )}
          <BookingButton
            href={bookingUrl}
            label="Book Hotel"
            provider="Booking.com"
            variant="booking"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;