import { UseStoryTranslateFunction } from "@/hooks/useStoryTranslation";
import { DividerType, IDivider } from "@/types/dividers";
import { CardType } from "@/types/game";

export const getTopTitle = ({
  story,
  faction,
  name,
  type
}: IDivider) => {
  if (type === DividerType.PLAYER && faction) {
    return faction;
  }

  if (type === DividerType.CAMPAIGN && story) {
    return story.name
  }

  return name;
}

export const getBottomTitle = (options: {
  divider: IDivider,
  translate: UseStoryTranslateFunction
}) => {
  const { divider, translate } = options;
  const {
    type,
    faction,
    cardType,
    subtype,
    story,
    scenario,
    name
  } = divider;

  if (type === DividerType.PLAYER && cardType && faction) {
    if (subtype) {
      return translate(subtype);
    }
    if (cardType) {
      return translate(
        cardType === CardType.ALL ? faction : cardType
      );
    }
    return translate(faction);
  }

  if (type === DividerType.CAMPAIGN && story) {
    return translate(story.name)
  }

  if (type === DividerType.SCENARIO && scenario) {
    const name = translate(scenario.scenario_name);
    const { number } = scenario;

    return number ? `${number}. ${name}` : name;
  }
  
  return name ? translate(name) : '';
}