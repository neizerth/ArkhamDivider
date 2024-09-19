import { always, curry, equals, ifElse, isNil, prop } from "ramda";

export const splitIntoGroups = <T>(data: T[], groupSize: number): T[][] => {
  const groups: T[][] = [];
  for (let i = 0; i < data.length; i += groupSize) {
      groups.push(data.slice(i, i + groupSize));
  }
  return groups;
}

export const arrayIf = <T>(condition: boolean, data: T[]): T[] => condition ? data : [];

export const toArrayIfExists = <T>(item: T | undefined) => isNil(item) ? [] : [item];

export const safeProp = curry(
  <T, K extends PropertyKey>(name: K, defaultValue: T, obj: Record<K, T>) => {
    const value = prop(name, obj);
    if (isNil(value)) {
      return defaultValue;
    }
    return value;
  }
);

export const upperFirst = (str: string) => str[0].toUpperCase() + str.slice(1);

export const uniqId = () => Math.random().toString(36).slice(2);

export const definedIf = <T>(value: T, condition: boolean) => {
  if (condition) {
    return value
  }
}