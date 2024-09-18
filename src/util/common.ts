import { isNil } from "ramda";

export const splitIntoGroups = <T>(data: T[], groupSize: number): T[][] => {
  const groups: T[][] = [];
  for (let i = 0; i < data.length; i += groupSize) {
      groups.push(data.slice(i, i + groupSize));
  }
  return groups;
}

export const arrayIf = <T>(condition: boolean, data: T[]): T[] => condition ? data : [];

export const toArrayIfExists = <T>(item: T | undefined) => isNil(item) ? [] : [item];