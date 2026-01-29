import * as React from "react";
import {Search} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {formatPrice} from "@/utils/format.ts";
import {Airport, SearchFormData} from "@/types/types.ts";
import {useServerHealth} from "@/hooks/useServerHealth.ts";
import {AirportsMultiSelect} from "@/components/filter-form/AirportsMultiSelect.tsx";
import SearchButton from "@/components/custom/SearchButton.tsx";

interface SearchFormProps {
  airports: Airport[];
  searchParams: SearchFormData;
  onSearchFormDataChange: (params: Partial<SearchFormData>) => void;
  onSearch: () => void;
  isSearching: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
                                                 airports,
                                                 searchParams,
                                                 onSearchFormDataChange,
                                                 onSearch,
                                                 isSearching,
                                               }) => {

  const {isOnline, isChecking} = useServerHealth();
  const isSearchButtonDisabled = !isOnline || isChecking || isSearching

  return (
    <div className="container mx-auto px-4 -mt-20 relative z-20">
      <Card className="bg-gradient-card shadow-hero animate-slide-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5"/>
            Search Flights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <AirportsMultiSelect
                airports={airports}
                selectedAirportCodes={searchParams.destinationCodes}
                onSelectedAirportsChange={(airportCodes) => onSearchFormDataChange({destinationCodes: airportCodes})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Duration: {searchParams.duration} {searchParams.duration === 1 ? 'day' : 'days'}
              </label>
              <Slider
                value={[searchParams.duration]}
                onValueChange={(value) => onSearchFormDataChange({duration: value[0]})}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Budget: {formatPrice(searchParams.budget)}
              </label>
              <Slider
                value={[searchParams.budget]}
                onValueChange={(value) => onSearchFormDataChange({budget: value[0]})}
                max={20000}
                min={1000}
                step={100}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="search-button" className="hidden">
                Search
              </label>
              <SearchButton
                onClick={onSearch}
                isSearching={isSearching}
                isDisabled={isSearchButtonDisabled}
                searchingText="Searching..."
                idleText="Search"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SearchForm;