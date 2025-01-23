import { curry, isNil, prop } from "ramda";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const splitIntoGroups = <T>(data: T[], groupSize: number): T[][] => {
  const groups: T[][] = [];
  for (let i = 0; i < data.length; i += groupSize) {
      groups.push(data.slice(i, i + groupSize));
  }
  return groups;
}

export const arrayIf = <T>(condition: boolean, data: T[]): T[] => condition ? data : [];

export const arrayIfFn = <T>(condition: () => boolean, getData: () => T[]): T[] => condition() ? getData() : [];

export const toArrayIf = <T>(condition: boolean, item: T): T[] => condition ? [item] : [];

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

export const strIfDefined = (value: string) =>  value || '';

export const pxToNumber = (x: string) => +x.replace('px', '');

export const numberBetween = (min: number, max: number) => (x: number) => x >= min && x < max;

export const minmax = (min: number, max: number) => 
  (value: number) => Math.max(
    min,
    Math.min(value, max)
  )

export const isDefined = <T>(value: T | undefined): value is T => value !== undefined; 

export const capitalize = (value: string) => value[0].toUpperCase() + value.substring(1);

export const firstLetter = (value: string) => value[0];