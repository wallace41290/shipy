import { isPresent } from './is-present';

/**
 * Determines whether something is null or undefined. If 2+
 * parameters are provided, returns true if one is null
 * @param objs REST array of values to check
 * @example
 * const isThisNull = isNullOrUndefined(a);
 * const atLeastOneNull = isNullOrUndefined(b, c, d, e);
 */
export function isNullOrUndefined(...objs: unknown[]): boolean {
  return !objs.every(isPresent);
}
