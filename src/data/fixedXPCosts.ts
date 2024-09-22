import { XPCost, IXPCost } from "@/types/game";

export const fixedXPCosts: IXPCost[] = [
  XPCost.ZERO,
  XPCost.ONE,
  XPCost.TWO,
  XPCost.THREE,
  XPCost.FOUR,
  XPCost.FIVE
].map(value => ({
  value,
  level: Number(value),
  is_fixed: true
}))
