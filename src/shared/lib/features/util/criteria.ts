import { curry, includes, isEmpty, isNil, pipe, prop } from 'ramda';

export const propsEquals =
  <C extends { [index: string]: unknown }>(criteria: C) =>
  <T extends Partial<C>>(item: T) =>
    Object.entries(criteria).every(([key, value]) => item[key] === value);

export const isPropEmpty = pipe(prop, isEmpty);

export const propIncludes =
  <K extends keyof U, U>(data: U[K][], name: K) =>
  (obj: U) =>
    includes(prop(name, obj), data);

export const propNotIncludes =
  <K extends keyof U, U>(data: U[K][], name: K) =>
  (obj: U) =>
    includes(prop(name, obj), data);

export const inArray = curry(<T>(data: T[], value: T) => data.includes(value));
// export const safePropEq = curry(
//   <K extends keyof U, U>(name: K | undefined, obj: U) => isNil(prop) propEq(name, obj)
// );

export const safePropEq = curry(<T, K extends PropertyKey>(val: T, name: K, obj: Record<K, T>) => {
  const value = prop(name, obj);
  if (isNil(value)) {
    return false;
  }
  return value === val;
});

// isNil(prop) propEq(name, obj)
