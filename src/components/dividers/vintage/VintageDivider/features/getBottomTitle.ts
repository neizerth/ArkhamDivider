import { UseStoryTranslateFunction } from "@/hooks/useStoryTranslation";
import { DividerSubtype, DividerType, IDivider } from "@/types/dividers";
import { CardType } from "@/types/game";
import factions from '@/data/factions.json';
import { propEq } from "ramda";

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
    name = ''
  } = divider;

  if (type === DividerType.PLAYER && cardType && faction) {
    if (subtype !== DividerSubtype.CARD) {
      return translate(name);
    }
    const factionName = factions.find(
      propEq(faction, 'id')
    )?.name || '';
    if (cardType) {
      return translate(
        cardType === CardType.ALL ? factionName : name
      );
    }
    
    return translate(factionName);
  }

  if (type === DividerType.CAMPAIGN && story) {
    return translate(story.name)
  }

  if (type === DividerType.SCENARIO && scenario) {
    return translate(scenario.scenario_name);
  }
  
  return name ? translate(name) : '';
}