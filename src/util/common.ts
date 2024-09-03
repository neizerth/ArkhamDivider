export const unique = <T>(data: T[]): T[] => Array.from(new Set(data));

export const splitIntoGroups = <T>(data: T[], groupSize: number): T[][] => {
  const groups: T[][] = [];
  for (let i = 0; i < data.length; i += groupSize) {
      groups.push(data.slice(i, i + groupSize));
  }
  return groups;
}

export const isEven = (x: number) => x % 2 === 0;

export const whereEquals = <C extends { [index: string]: unknown }>(criteria: C) => <T extends C>(item: T) => 
  Object.entries(criteria).every(([key, value]) => item[key] === value);