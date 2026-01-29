export interface Airport {
  code: string;
  name: string;
  country: string;
}

export interface FlightLeg {
  departureStation: string;
  arrivalStation: string;
  discountPrice: number;
  originalPrice: number;
  departureDate: string;
  departureTime: string;
}

export interface Flight {
  outbound: FlightLeg;
  return: FlightLeg;
  total_discount_price: number;
  total_original_price: number;
}

export interface SearchFormData {
  destinationCodes: string[];
  duration: number;
  budget: number;
}