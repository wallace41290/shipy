/**
 * Typeguards whether a value is present (not null or undefined)
 * @param t value to check for existence
 */
export function isPresent<T>(t: T | null | undefined | void): t is T {
  return t !== null && t !== undefined;
}
