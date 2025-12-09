import * as React from "react";
import {Check} from "lucide-react";

interface AirportCheckboxProps {
  isChecked: boolean;
}

const AirportCheckbox: React.FC<AirportCheckboxProps> = ({isChecked}) => (
  <div
    className={`h-4 w-4 rounded flex items-center justify-center border ${
      isChecked ? "bg-primary border-primary" : "bg-transparent border-primary"
    }`}
  >
    {isChecked && <Check className="h-3 w-3 text-white stroke-[3]"/>}
  </div>
);

export default AirportCheckbox;