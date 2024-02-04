import { convertToParamMap, ParamMap, Params } from '@angular/router';

import { Port } from './ports';
import { SearchParams } from './search-params';
import { DateRange } from './date-range';

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

export function deserializeDateRange(paramValue: string): DateRange {
  const [startDateString, endDateString] = paramValue.split('~');
  const startYear = Number(startDateString.substring(0, 4));
  const startMonth = Number(startDateString.substring(5, 7)) - 1;
  const startDay = Number(startDateString.substring(8, 10));
  const endYear = Number(endDateString.substring(0, 4));
  const endMonth = Number(endDateString.substring(5, 7)) - 1;
  const endDay = Number(endDateString.substring(8, 10));
  return {
    start: new Date(startYear, startMonth, startDay),
    end: new Date(endYear, endMonth, endDay),
  };
}

export function serializeDateRange(dateRange: DateRange): string {
  const [startMonth, startDay, startYear] = [
    `0${dateRange.start.getMonth() + 1}`.slice(-2),
    `0${dateRange.start.getDate()}`.slice(-2),
    dateRange.start.getFullYear(),
  ];
  const [endMonth, endDay, endYear] = [
    `0${dateRange.end.getMonth() + 1}`.slice(-2),
    `0${dateRange.end.getDate()}`.slice(-2),
    dateRange.end.getFullYear(),
  ];
  return `${startYear}-${startMonth}-${startDay}~${endYear}-${endMonth}-${endDay}`;
}
