import { isObject } from './is-object';

/**
 * Typeguard to check if something is a `Date`
 * @param something some value to check if it is a `Date`
 * @returns whether something is a `Date`
 */
export function isDate(something: unknown): something is Date {
  return (
    isObject(something) &&
    Object.prototype.toString.call(something) === '[object Date]'
  );
}
