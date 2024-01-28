import { CruiseVariables } from './variables.model';

export interface CruiseSearchRequest {
  operationName: string;
  variables: CruiseVariables;
  query: string;
}
