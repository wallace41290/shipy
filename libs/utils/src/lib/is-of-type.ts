/* eslint-disable @typescript-eslint/ban-types */
import { isObject } from './is-object';
import { isPresent } from './is-present';

/**
 * Typeguards whether an object is of type T.
 * If at least one property is present on the object, it will return true.
 *
 * @param t object to typeguard
 * @param props key of obj to check for existence
 * @example
 * class Car extends Vehicle {
 * headlights: 'incandescent' | 'led'
 * }
 * const v = {
 * ...(Vehicle props),
 * headlights: 'incandescent'
 * }
 *
 * if (isOfType<Car>(v, 'headlights')) {
 * v.headlights = 'led';
 * }
 */
export function isOfType<T>(t: unknown, ...props: Array<keyof T>): t is T {
  return (
    isObject(t) &&
    props.some((prop) => prop in t && isPresent(t[prop as keyof object]))
  );
}
