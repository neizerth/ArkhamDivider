import { XPCost, IXPCost } from "@/types/game";

export const fixedXPCosts: IXPCost[] = [
  XPCost.ZERO,
  XPCost.ONE,
  XPCost.TWO,
  XPCost.THREE,
  XPCost.FOUR,
  XPCost.FIVE
].map(level => ({
  value: level.toString(),
  level,
  is_fixed: true
}))
