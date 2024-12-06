import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { SortDirection } from '@angular/material/sort';
import { getNextMonth } from '@shipy/utils';

import { Port } from './ports';
import { SearchParams } from './search-params';
import { DateRange } from './date-range';
import { NumberOfNights } from './number-of-nights';
import { Ship } from './ships';
import { SortBy } from './sort-by';
import { SortOrder } from './sort-order';

/**
 * Coerces a value to a valid SortDirection string.
 *
 * If the value is a SortOrder value, it will be converted to the corresponding
 * SortDirection string. If the value is already a valid SortDirection string, it will
 * be returned as is. Otherwise, an empty string will be returned.
 *
 * @param value The value to coerce.
 * @returns A valid SortDirection string, or an empty string if the input value is invalid.
 */
export function coerceSortDirection(value: unknown): SortDirection {
  // Handle if it's a SortOrder value
  if (SortOrder.guard(value)) {
    switch (value) {
      case 'ASC':
        return 'asc';
      case 'DESC':
        return 'desc';
      default:
        return '';
    }
  }

  // If it's already a valid SortDirection value
  if (value === 'asc' || value === 'desc' || value === '') {
    return value;
  }

  return '';
}

/**
 * Coerces a value to a SortOrder if it matches the guard or is undefined.
 * Handles Material SortDirection being lowercase.
 *
 * @param value the value to coerce
 * @returns the coerced value or undefined if it's not a string or doesn't match the guard
 */
export function coerceSortOrder(value: unknown): SortOrder | undefined {
  if (!value || typeof value !== 'string') {
    return undefined;
  }
  // Handles SortDirection from Material being lowercase
  const uppercaseValue = value.toUpperCase();
  if (SortOrder.guard(uppercaseValue)) {
    return uppercaseValue;
  }

  return undefined;
}

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
    // Number of Nights
    nights: paramMap.get('nights') || undefined,
    // Start Date
    startDate:
      paramMap.get('startDate') ??
      serializeDateRange({ start: new Date(), end: getNextMonth() }),
    // Count
    count: Number(paramMap.get('count') ?? 10),
    // Ship
    ship: paramMap.get('ship') || undefined,
    // Skip
    skip: Number(paramMap.get('skip') ?? 0),
    // Sort
    sortBy: paramMap.get('sortBy') ?? 'RECOMMENDED',
    sortOrder: paramMap.get('sortOrder') || undefined,
  };
}

export function deserializeNumberOfNights(
  paramValue?: string
): NumberOfNights[] {
  if (!paramValue) {
    return [];
  }
  const paramArray = paramValue.split(',');
  const numberOfNights: NumberOfNights[] = [];
  for (const param of paramArray) {
    if (NumberOfNights.guard(param)) {
      numberOfNights.push(param);
    }
  }
  return numberOfNights;
}

export function deserializeShip(paramValue?: string): Ship[] {
  if (!paramValue) {
    return [];
  }
  const paramArray = paramValue.split(',');
  const ships: Ship[] = [];
  for (const param of paramArray) {
    if (Ship.guard(param)) {
      ships.push(param);
    }
  }
  return ships;
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

export function deserializeSortBy(paramValue: string): SortBy {
  if (SortBy.guard(paramValue)) {
    return paramValue;
  }
  return 'RECOMMENDED';
}

export function deserializeSortOrder(
  paramValue: string | undefined
): SortOrder | undefined {
  if (SortOrder.guard(paramValue)) {
    return paramValue;
  }
  return undefined;
}

export function serializeNumberOfNights(
  numberOfNights: NumberOfNights[]
): string | undefined {
  return numberOfNights?.length ? numberOfNights.join(',') : undefined;
}

export function serializeShip(ships: Ship[]): string | undefined {
  return ships?.length ? ships.join(',') : undefined;
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
