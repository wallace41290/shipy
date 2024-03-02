/**
 * Utility function to define string literal union types and helper methods.
 * @param values an array of strings to create a string literal type from.
 * @returns A utility object describing the generated type, a type guard, and run-time check method, and the array of original values.
 *
 * @example
 * ```ts
 * const Race = StringUnion(
 *   "orc",
 *   "human",
 *   "night elf",
 *   "undead",
 * );
 *
 * type Race = typeof Race.type;
 *
 * let r: Race;
 * const zerg = "zerg";
 *
 * // Compile-time error:
 * // error TS2322: Type '"zerg"' is not assignable to type '"orc" | "human" | "night elf" | "undead"'.
 * r = zerg;
 *
 * // Run-time error:
 * // TypeError: Value '"zerg"' is not assignable to type '"orc" | "human" | "night elf" | "undead"'.
 * r = Race.check(zerg);
 *
 * // Not executed:
 * if (Race.guard(zerg)) {
 *   r = zerg;
 * }
 * ```
 */
export const StringUnion = <UnionType extends string>(
  ...values: UnionType[]
): Readonly<{
  check: (value: unknown) => UnionType;
  guard: (value: unknown) => value is UnionType;
  values: UnionType[];
  type: UnionType;
}> => {
  Object.freeze(values);
  const valueSet: Set<string> = new Set(values);

  const guard = (value: unknown): value is UnionType => {
    return typeof value === 'string' && valueSet.has(value);
  };

  const check = (value: unknown): UnionType => {
    if (!guard(value)) {
      const actual = JSON.stringify(value);
      const expected = values.map((s) => JSON.stringify(s)).join(' | ');
      throw new TypeError(
        `Value '${actual}' is not assignable to type '${expected}'.`
      );
    }
    return value;
  };

  const unionNamespace = { check, guard, values };
  return Object.freeze(
    unionNamespace as typeof unionNamespace & { type: UnionType }
  );
};
