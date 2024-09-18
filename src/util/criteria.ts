import { curry, includes, isEmpty, pipe, prop } from "ramda";

export const propsEquals = <C extends { [index: string]: unknown }>(criteria: C) => <T extends C>(item: T) => 
  Object.entries(criteria).every(([key, value]) => item[key] === value);

export const isPropEmpty = pipe(
  prop,
  isEmpty
);

export const propIncludes = curry(
  <K extends keyof U, U>(data: U[K][], name: K, obj: U) => includes(
    prop(name, obj),
    data
  )
)