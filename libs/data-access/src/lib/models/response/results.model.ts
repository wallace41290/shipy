import { Cruise } from "./cruise.model";

export interface Results {
  cruises: Cruise[];
  cruiseRecommendationId: string;
  total: number;
  __typeName: string;
}
