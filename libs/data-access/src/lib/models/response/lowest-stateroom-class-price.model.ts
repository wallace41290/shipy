import { LowestStateroomClassPricePrice } from './lowest-stateroom-class-price-price.model';
import { LowestStateroomClassPriceStateroomClass } from './lowest-stateroom-class-price-stateroom-class.model';

export interface LowestStateroomClassPrice {
  __typename: string;
  price: LowestStateroomClassPricePrice;
  stateroomClass: LowestStateroomClassPriceStateroomClass;
}
