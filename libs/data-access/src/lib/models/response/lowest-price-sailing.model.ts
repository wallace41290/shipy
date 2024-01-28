import { LowestPriceSailingTaxesAndFees } from './lowest-price-sailing-taxes-and-fees.model';
import { LowestStateroomClassPrice } from './lowest-stateroom-class-price.model';

export interface LowestPriceSailing {
  __typename: string;
  bookingLink: string;
  endDate: string;
  id: string;
  lowestStateroomClassPrice: LowestStateroomClassPrice;
  sailDate: string;
  startDate: string;
  taxesAndFees: LowestPriceSailingTaxesAndFees;
  taxesAndFeesIncluded: boolean;
}
