import { IDivider } from "@/types/dividers";
import { CardType } from "@/types/game";

export const getDefaultIcon = ({
  icon,
  specialIcon,
  cardType
}: IDivider) => {
  if (cardType === CardType.ASSET) {
    return 'clue';
  }
  if (cardType === CardType.EVENT) {
    return 'stopwatch';
  }
  if (cardType === CardType.SKILL) {
    return 'skill_wild';
  }
  return specialIcon || icon;
}