import { CruisePagination } from './pagination.model';
import { CruiseSort } from './sort.model';

export interface CruiseVariables {
  filters: string;
  sort: CruiseSort;
  pagination: CruisePagination;
}
