import { SailingTaxesAndFees } from './sailing-taxes-and-fees.model';
import { StateroomClassPricing } from './stateroom-class-pricing.model';
import { SailingItinerary } from './sailing-itinerary.model';

export interface Sailing {
  __typename: string;
  bookingLink: string;
  endDate: string;
  id: string;
  itinerary: SailingItinerary;
  sailDate: string;
  startDate: string;
  stateroomClassPricing: StateroomClassPricing[];
  taxesAndFees: SailingTaxesAndFees;
  taxesAndFeesIncluded: boolean;
}
