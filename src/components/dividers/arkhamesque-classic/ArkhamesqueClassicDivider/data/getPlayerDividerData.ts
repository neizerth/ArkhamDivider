import { descend, propEq } from 'ramda';
import { propsEquals } from '@/shared/lib/features/util/criteria';
import { DividerSubtype } from '@/shared/types/dividers';
import { CardType, XPCost } from '@/shared/types/game';
import { Single } from '@/shared/types/util';
import { GetDividerDataOptions } from './getDividerData';
import { getDividerImage } from './getDividerImage';

const COMMON_SUBTYPES = [
  DividerSubtype.BONDED,
  DividerSubtype.CUSTOMIZATIONS,
  DividerSubtype.UPGRADE,
  DividerSubtype.WEAKNESS,
  DividerSubtype.BASIC_WEAKNESS,
];

export const getPlayerDividerData = ({ data, divider }: GetDividerDataOptions) => {
  const { prefix } = data;
  const { subtype, xpCost, cardType, faction } = divider;

  const items = data.player.flatMap(({ prefix, data }) =>
    data.map((item) => ({
      prefix,
      ...item,
    }))
  );

  const sendItem = (item?: Single<typeof items>) =>
    item && {
      ...item,
      image: getDividerImage([prefix, item.prefix, item.name]),
    };

  if (!subtype) {
    return;
  }

  if (COMMON_SUBTYPES.includes(subtype)) {
    const item = items.find(propEq(subtype.toString(), 'type'));

    return sendItem(item);
  }

  if (!faction) {
    return;
  }

  if (subtype === DividerSubtype.FACTION) {
    const xp = xpCost?.level;
    const item = items.find(
      (item) =>
        item.faction === faction &&
        (xp === XPCost.NO_COST || item.xp === xp) &&
        item.type === subtype
    );

    return sendItem(item);
  }

  if (subtype === DividerSubtype.INVESTIGATORS) {
    const type = subtype.toString();
    const item = items.find(
      propsEquals({
        faction,
        type,
      })
    );

    return item && sendItem(item);
  }

  if (cardType) {
    const level = xpCost?.level;

    const found = items
      .filter((item) => {
        if (item.faction !== faction) {
          return false;
        }
        return cardType === CardType.ALL || item.type === cardType;
      })
      .toSorted(descend(({ xp = Infinity }) => xp));

    if (level === undefined || level === XPCost.NO_COST) {
      return sendItem(found[0]);
    }

    const withXP = found.find(({ xp }) => typeof xp === 'number' && xp <= level);

    if (withXP) {
      return sendItem(withXP);
    }

    // const fallbackItem = items.find(propsEquals({
    //   faction,
    //   type: 'faction',
    //   xp: level
    // }));

    const fallbackItem = items.find(
      (item) => item.faction === faction && item.xp === level && item.type === 'faction'
    );

    return sendItem(fallbackItem);
  }
};
