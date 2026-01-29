import * as React from "react";
import {PlaneTakeoff, PlaneLanding} from 'lucide-react';
import {formatPrice, formatDate} from "@/utils/format.ts";
import { FlightLeg } from "@/types/types.ts";

interface FlightLegDisplayProps {
  leg: FlightLeg;
  type: 'outbound' | 'return';
}

const FlightLegDisplay: React.FC<FlightLegDisplayProps> = ({ leg, type }) => {
  const isOutbound = type === 'outbound';
  const Icon = isOutbound ? PlaneTakeoff : PlaneLanding;
  const colorClass = isOutbound ? 'text-primary' : 'text-accent';

  return (
    <div className="space-y-2">
      <div className={`flex gap-2 items-center ${colorClass}`}>
        <Icon className="w-5 h-5" />
        <h4 className="font-semibold text-sm">{isOutbound ? 'Outbound' : 'Return'}</h4>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">{leg.departureStation}</p>
        <p className="text-xs text-muted-foreground">to {leg.arrivalStation}</p>
        <p className="text-sm font-medium">
          {formatDate(leg.departureDate)} at {leg.departureTime}
        </p>
        <div className="flex items-center gap-2">
          <span className={`font-bold ${colorClass}`}>{formatPrice(leg.discountPrice)}</span>
          {leg.originalPrice > leg.discountPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(leg.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightLegDisplay;