import { DividerSubtype } from "@/types/dividers";
import { GetDividerDataOptions } from "./getDividerData";
import { getDividerImage } from "./getDividerImage";
import { descend, prop, propEq } from "ramda";
import { Single } from "@/types/util";
import { propsEquals } from "@/util/criteria";

const COMMON_SUBTYPES = [
  DividerSubtype.BONDED,
  DividerSubtype.CUSTOMIZATIONS,
  DividerSubtype.UPGRADE,
  DividerSubtype.WEAKNESS,
  DividerSubtype.BASIC_WEAKNESS
];

export const getPlayerDividerData = ({
  data,
  divider
}: GetDividerDataOptions) => {
  const { prefix } = data;
  const {
    subtype,
    xpCost,
    cardType,
    faction
  } = divider;
  
  const items = data.player.map(
    ({ prefix, data }) => data.map(item => ({
      prefix,
      ...item,
    }))
  ).flat();

  const sendItem = (item: Single<typeof items>) => ({
    ...item,
    image: getDividerImage([
      prefix,
      item.prefix,
      item.name
    ])
  });

  if (!subtype) {
    return;
  }

  if (COMMON_SUBTYPES.includes(subtype)) {
    const item = items.find(
      propEq(subtype.toString(), 'type')
    );

    return item && sendItem(item);
  }

  if (!faction) {
    return;
  }

  if (subtype === DividerSubtype.FACTION) {
    const type = subtype.toString();
    const xp = xpCost?.level;
    const item = items.find(propsEquals({
      faction,
      xp,
      type
    }));
    
    return item && sendItem(item);
  }

  if (subtype === DividerSubtype.INVESTIGATORS) {
    const type = subtype.toString();
    const item = items.find(propsEquals({
      faction,
      type
    }));
    
    return item && sendItem(item);
  }

  if (cardType) {
    const type = cardType.toString();
    const level = xpCost?.level;
    const found = items
      .filter(propsEquals({
        faction,
        type
      }))
      .toSorted(descend(({ xp = Infinity }) => xp));

    const item = level !== undefined ? 
      found.find(
        ({ xp }) => xp !== undefined && xp <= level
      ) || found[0] :
      found[0];
    
    return item && sendItem(item);
  }
}