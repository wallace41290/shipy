import { convertToParamMap, ParamMap, Params } from '@angular/router';

import { SearchParams } from '../models';

/**
 * Deserialize angular router query parameters into a search param object.
 */
export function deserializeSearchParams(
  params: ParamMap | Params
): SearchParams {
  const paramMap = convertToParamMap(params);
  return {
    // Departure Port
    departurePort: paramMap.get('departurePort') ?? 'PCN',
    // Start Date
    startDate: paramMap.get('startDate') ?? '2024-10-01~2024-10-31',
    // Count
    count: Number(paramMap.get('count') ?? 10),
    // Count
    skip: Number(paramMap.get('skip') ?? 0),
  };
}
