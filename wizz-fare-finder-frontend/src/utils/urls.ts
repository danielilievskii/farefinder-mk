import type {Flight} from "@/types/types.ts";
import {extractAirportCode, extractCity} from "@/utils/flights.ts";

export const buildBookingUrl = (flight: Flight): string => {
  const city = extractCity(flight.outbound.arrivalStation);

  const [depYear, depMonth, depDay] = flight.outbound.departureDate.split('-');
  const [retYear, retMonth, retDay] = flight.return.departureDate.split('-');

  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}&dest_type=city&checkin_year=${depYear}&checkin_month=${depMonth}&checkin_monthday=${depDay}&checkout_year=${retYear}&checkout_month=${retMonth}&checkout_monthday=${retDay}&group_adults=1&no_rooms=1&group_children=0`;
};

export const buildWizzAirTicketsUrl = (
  flight: Flight,
  type: "roundtrip" | "outbound" | "return" = "roundtrip"
): string => {
  const outboundDeparture = extractAirportCode(flight.outbound.departureStation);
  const outboundArrival = extractAirportCode(flight.outbound.arrivalStation);
  const returnDeparture = extractAirportCode(flight.return.departureStation);
  const returnArrival = extractAirportCode(flight.return.arrivalStation);

  const configs = {
    roundtrip: {
      departureAirport: outboundDeparture,
      arrivalAirport: outboundArrival,
      outboundDate: flight.outbound.departureDate,
      returnDate: flight.return.departureDate,
    },
    outbound: {
      departureAirport: outboundDeparture,
      arrivalAirport: outboundArrival,
      outboundDate: flight.outbound.departureDate,
      returnDate: "null",
    },
    return: {
      departureAirport: returnDeparture,
      arrivalAirport: returnArrival,
      outboundDate: flight.return.departureDate,
      returnDate: "null",
    },
  };

  const { departureAirport, arrivalAirport, outboundDate, returnDate } = configs[type];

  return `https://www.wizzair.com/en-gb/booking/select-flight/${departureAirport}/${arrivalAirport}/${outboundDate}/${returnDate}/1/0/0`;
};