import {useState} from "react";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";

interface MonthMultiSelectProps {
  selectedMonths: number[];
  onSelectedMonthsChange: (months: number[]) => void;
  display?: "mobile" | "desktop" | "all";
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MonthMultiSelect = ({
  selectedMonths,
  onSelectedMonthsChange,
  display = "all",
}: MonthMultiSelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const areAllMonthsSelected = selectedMonths.length === MONTHS.length;

  const toggleAllMonths = () => {
    onSelectedMonthsChange(
      areAllMonthsSelected ? [] : MONTHS.map((_, index) => index + 1)
    );
  };

  const toggleMonth = (month: number) => {
    const nextMonths = selectedMonths.includes(month)
      ? selectedMonths.filter((selectedMonth) => selectedMonth !== month)
      : [...selectedMonths, month].sort((a, b) => a - b);

    onSelectedMonthsChange(nextMonths);
  };

  const selectionLabel = selectedMonths.length === 0
    ? "Select months"
    : selectedMonths.length === 1
      ? MONTHS[selectedMonths[0] - 1]
      : areAllMonthsSelected
        ? "All months"
        : selectedMonths.map((month) => MONTHS[month - 1].slice(0, 3)).join(", ");

  return (
    <section className="space-y-3">
      {display !== "mobile" && (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold">Travel months</h3>


            </div>

            <div className="hidden items-center gap-2 text-xs font-medium lg:flex">
              <button
                type="button"
                onClick={() => onSelectedMonthsChange([])}
                className={cn(
                  "rounded-full border px-3 py-1.5 transition-colors",
                  selectedMonths.length === 0
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={toggleAllMonths}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                All months
              </button>
            </div>
          </div>

          <div className="hidden gap-2 lg:grid lg:grid-cols-6 xl:grid-cols-12">
            {MONTHS.map((monthName, index) => {
              const month = index + 1;
              const isSelected = selectedMonths.includes(month);

              return (
                <button
                  key={monthName}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleMonth(month)}
                  className={cn(
                    "group relative min-h-12 overflow-hidden rounded-lg border px-2.5 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isSelected
                      ? "border-primary/40 bg-primary/10 text-primary shadow-sm shadow-primary/10 backdrop-blur-sm"
                      : "border-border bg-background/80 text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
                  )}
                >
                  <span className={cn(
                    "block text-[10px] font-semibold uppercase tracking-[0.18em]",
                    isSelected ? "text-primary/70" : "text-muted-foreground"
                  )}>
                    {monthName.slice(0, 3)}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold">{monthName}</span>
                  <span className={cn(
                    "absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-sm border transition-all",
                    isSelected
                      ? "scale-100 border-primary/25 bg-primary/15 text-primary opacity-100"
                      : "scale-75 border-border bg-background opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  )}>
                    {isSelected && <Check className="h-2.5 w-2.5" />}
                  </span>
                </button>
              );
            })}
          </div>


        </>
      )}

      {display !== "desktop" && (
        <div className="relative w-full lg:hidden">
          <button
            type="button"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-expanded={isSelectOpen}
          >
            <span className="truncate">{selectionLabel}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>

          {isSelectOpen && (
            <>
              <div
                className="fixed inset-0 z-40 animate-in fade-in duration-200"
                onClick={() => setIsSelectOpen(false)}
              />
              <div className="absolute bottom-full z-50 mb-1 max-h-96 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
                <div className="p-2">
                  <button
                    type="button"
                    onClick={toggleAllMonths}
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left hover:bg-[#e6f3ff]"
                  >
                    <span className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border",
                      areAllMonthsSelected ? "border-primary bg-primary text-primary-foreground" : "border-input"
                    )}>
                      {areAllMonthsSelected && <Check className="h-2.5 w-2.5" />}
                    </span>
                    <span className="text-sm font-semibold">All months</span>
                  </button>

                  <div className="my-2 h-px bg-border" />

                  {MONTHS.map((monthName, index) => {
                    const month = index + 1;
                    const isSelected = selectedMonths.includes(month);

                    return (
                      <button
                        key={monthName}
                        type="button"
                        onClick={() => toggleMonth(month)}
                        className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left hover:bg-[#e6f3ff]"
                      >
                        <span className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-input"
                        )}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </span>
                        <span className="text-sm">{monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};