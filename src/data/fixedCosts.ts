import { Cost, ICost } from "@/types/game";

export const fixedCosts: ICost[] = [
  Cost.ZERO,
  Cost.ONE,
  Cost.TWO,
  Cost.THREE,
  Cost.FOUR,
  Cost.FIVE
].map(value => ({
  value,
  level: Number(value),
  is_fixed: true
}))
