import * as React from "react";
import AirportCheckbox from "@/components/filter-form/AirportCheckbox.tsx";

interface AirportSelectItemProps {
  label: string;
  isChecked: boolean;
  onClick: () => void;
  isBold?: boolean;
}

const AirportSelectItem: React.FC<AirportSelectItemProps> = ({
                                                         label,
                                                         isChecked,
                                                         onClick,
                                                         isBold = false
                                                       }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-[#e6f3ff] rounded-sm"
  >
    <AirportCheckbox isChecked={isChecked}/>
    <span className={`text-sm ${isBold ? 'font-semibold' : ''}`}>
      {label}
    </span>
  </div>
);

export default AirportSelectItem;