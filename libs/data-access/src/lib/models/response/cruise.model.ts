import { Sailing } from "./sailing.model";
import { LowestPriceSailing } from "./lowest-price-sailing.model";
import { MasterSailing } from "./master-sailing.model";

export interface Cruise {
    __typename: string;
    id: string;
    lowestPriceSailing: LowestPriceSailing;
    masterSailing: MasterSailing;
    productViewLink: string;
    sailings: Sailing[];
}