/** @returns whether something is an `object` */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isObject(something: unknown): something is object {
  return (
    something !== null &&
    something !== undefined &&
    typeof something === 'object'
  );
}
