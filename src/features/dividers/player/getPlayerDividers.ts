import { AddPlayerDividersOptions } from '@/store/features/addDividers/addDividers';
import { IDivider } from '@/types/dividers';
import { IFaction } from '@/types/game';
import { uniqId } from '@/util/common';

export const getPlayerDividers = (options: AddPlayerDividersOptions) => {
  return [
    ...getPlayerCardDividers(options),
    ...getUpgradingDividers(options)
  ]
}

export const getPlayerCardDividers = (options: AddPlayerDividersOptions) => {
  const {
    factions,
    costs,
    types
  } = options;
  return factions.map(faction => {
    return costs.map(cost => {
      return types.map((type): IDivider => {
        return {
          id: uniqId(),
          name: type.name,
          icon: faction.icon,
          type: 'player',
          cost: {
            text: cost.value,
            fixed: cost.is_fixed,
          }
        }
      });
    })
    .flat()
  })
  .flat()
}

export const getUpgradingDividers = ({
  factions,
  useUpgrading
}: {
  factions: IFaction[]
  useUpgrading: boolean
}) => {
  if (!useUpgrading) {
    return [];
  }
  return factions.map((faction): IDivider => ({
    id: uniqId(),
    name: 'Upgrading',
    icon: faction.icon,
    type: 'player'
  }))
}