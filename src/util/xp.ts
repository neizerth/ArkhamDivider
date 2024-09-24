import { MAX_XP } from "@/constants/xp";

export const getXPDisplayValue = (from: number, to: number): string => {
  if (to === MAX_XP) {
    return `${from}+`
  }
  return `${from} - ${to}`;
}