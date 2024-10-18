import { Day } from './day.model';
import { DeparturePort } from './departure-port.model';
import { Destination } from './destination.model';
import { ItineraryMedia } from './itinerary-media.model';
import { Ship } from './ship.model';

export interface MasterSailingItinerary {
  __typename: string;
  code: string;
  days: Day[];
  departurePort: DeparturePort;
  destination: Destination;
  media: ItineraryMedia;
  name: string;
  portSequence: string;
  postTour: null;
  preTour: null;
  sailingNights: number;
  ship: Ship;
  totalNights: number;
  type: string;
}
