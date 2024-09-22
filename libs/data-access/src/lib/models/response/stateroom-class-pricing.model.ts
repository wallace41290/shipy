import { StateroomClassPricingStateroomClass } from './stateroom-class-pricing-stateroom-class.model';
import { StateroomClassPricingPrice } from './stateroom-class-pricing-price.model';

export interface StateroomClassPricing {
  __typename: string;
  price: StateroomClassPricingPrice;
  stateroomClass: StateroomClassPricingStateroomClass;
}
