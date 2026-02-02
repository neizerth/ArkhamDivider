export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30 * DAY;
export const YEAR = 365 * DAY;

export const seconds = (seconds: number) => seconds * SECOND;
export const minutes = (minutes: number) => minutes * MINUTE;
export const hours = (hours: number) => hours * HOUR;
export const days = (days: number) => days * DAY;
export const weeks = (weeks: number) => weeks * WEEK;
export const months = (months: number) => months * MONTH;
export const years = (years: number) => years * YEAR;
