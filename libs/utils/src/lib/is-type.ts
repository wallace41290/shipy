import { isObject } from './is-object';
import { isPresent } from './is-present';

/**
 * Typeguard to determine if something is type `T`.
 * This method will check for the existance of all the given fields
 * on the object. This is a dangerous method and can be used incorrectly,
 * writing a specific typeguard is usually the better solution than using this utility.
 *
 * @example
 * class Car extends Vehicle {
 *  headlights: 'incandescent' | 'led';
 *  color: string;
 * }
 * const v = {
 *  ...(Vehicle props),
 *  headlights: 'incandescent',
 *  color: 'red'
 * }
 *
 * if (isType<Car>(v, 'headlights', 'color')) {
 *  v.headlights = 'led';
 *  v.color = 'blue';
 * }
 *
 * @param t object to check if it is of type `T`
 * @param props all the properties to check if they exists as fields on `t`
 * @returns whether all `props` exist on `t` and assumes `t is T`
 */
export function isType<T>(t: unknown, ...props: Array<keyof T>): t is T {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return isObject(t) && props.every((prop) => prop in t && isPresent(t[prop as keyof object]));
}
