/**
 * Determines if a string is a key of an object, & typecasts it.
 * @param obj Object to check for a property
 * @param k potential key of an object
 * @returns whether a string is a property of an object
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isKey<T extends object | null | undefined>(obj: T, k: string): k is string & keyof T {
  return !!obj && !!k && k in obj;
}
