import { convertToParamMap, ParamMap, Params } from '@angular/router';

import { Port } from './ports';
import { SearchParams } from './search-params';

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

export function deserializePorts(paramValue: string): Port[] {
  const paramArray = paramValue.split(',');
  const ports: Port[] = [];
  for (const param of paramArray) {
    if (Port.guard(param)) {
      ports.push(param);
    }
  }
  return ports;
}

export function serializePorts(ports: Port[]): string {
  return ports.join(',');
}
