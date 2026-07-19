import * as React from "react";
import {Search} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {formatPrice} from "@/utils/format.ts";
import {Airport, SearchFormData} from "@/types/types.ts";
import {useServerHealth} from "@/hooks/useServerHealth.ts";
import {AirportsMultiSelect} from "@/components/filter-form/AirportsMultiSelect.tsx";
import SearchButton from "@/components/custom/SearchButton.tsx";
import {MonthMultiSelect} from "@/components/filter-form/MonthMultiSelect.tsx";

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
  const isSearchButtonDisabled = !isOnline || isChecking || isSearching;


  return (
    <div className="container relative z-20 mx-auto -mt-20 px-4">
      <Card className="overflow-visible border-white/70 bg-gradient-card shadow-hero animate-slide-in">
        <CardHeader className="border-b border-border/60 bg-white/30 px-5 py-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Search className="h-5 w-5 text-primary" />
            Search flights
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4 p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2 rounded-lg border border-border/70 bg-background/60 p-3">
              <label className="text-sm font-medium">Destination</label>
              <AirportsMultiSelect
                airports={airports}
                selectedAirportCodes={searchParams.destinationCodes}
                onSelectedAirportsChange={(airportCodes) =>
                  onSearchFormDataChange({destinationCodes: airportCodes})
                }
              />
            </div>

            <div className="space-y-3 rounded-lg border border-border/70 bg-background/60 p-3">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium">Trip duration</label>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {searchParams.duration} {searchParams.duration === 1 ? "day" : "days"}
                </span>
              </div>
              <Slider
                value={[searchParams.duration]}
                onValueChange={(value) => onSearchFormDataChange({duration: value[0]})}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />

            </div>

            <div className="space-y-3 rounded-lg border border-border/70 bg-background/60 p-3 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium">Total budget</label>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {formatPrice(searchParams.budget)}
                </span>
              </div>
              <Slider
                value={[searchParams.budget]}
                onValueChange={(value) => onSearchFormDataChange({budget: value[0]})}
                max={20000}
                min={1000}
                step={100}
                className="w-full"
              />

            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-border/70 bg-background/60 p-3 lg:hidden">
            <label className="text-sm font-medium">Travel months</label>
            <MonthMultiSelect
              display="mobile"
              selectedMonths={searchParams.months}
              onSelectedMonthsChange={(months) => onSearchFormDataChange({months})}
            />
          </div>

          <div className="hidden border-t border-border/70 pt-4 lg:block">
            <MonthMultiSelect
              display="desktop"
              selectedMonths={searchParams.months}
              onSelectedMonthsChange={(months) => onSearchFormDataChange({months})}
            />
          </div>

          <div className="flex justify-end border-t border-border/70 pt-4">

            <div className="w-full sm:w-52">
              <SearchButton
                onClick={onSearch}
                isSearching={isSearching}
                isDisabled={isSearchButtonDisabled}
                searchingText="Searching..."
                idleText="Search flights"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchForm;