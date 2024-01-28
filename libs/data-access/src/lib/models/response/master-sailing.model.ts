import { MasterSailingItinerary } from "./master-sailing-itinerary.model";

export interface MasterSailing {
    __typename: string;
    itinerary: MasterSailingItinerary;
}