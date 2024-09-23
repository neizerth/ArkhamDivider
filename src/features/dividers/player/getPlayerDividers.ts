import { AddPlayerDividersOptions } from '@/store/features/addDividers/addDividers';
import { IDivider } from '@/types/dividers';
import { CardType, IFaction } from '@/types/game';
import { uniqId } from '@/util/common';

export const getPlayerDividers = (options: AddPlayerDividersOptions) => {
  return [
    ...getBasicWeaknessDividers(options),
    ...getUpgradingDividers(options),
    ...getPlayerCardDividers(options),
    ...getFactionIdDividers(options),
    ...getBondedDividers(options)
  ]
}

export const getPlayerCardDividers = (options: AddPlayerDividersOptions) => {
  const {
    xpCosts,
    factions
  } = options;

  const types = [
    ...options.types,
    ...getAllyType(options)
  ]

  return factions.map(faction => {
    return xpCosts.map(xpCost => {
      return types.map((type): IDivider => {
        return {
          id: uniqId(),
          name: type.name,
          icon: type.icon || faction.icon,
          previewIcon: faction.icon,
          cardType: type.type,
          type: 'player',
          xpCost
        }
      });
    })
    .flat()
  })
  .flat()
}

export const getAllyType = ({
  includeAllies
}: {
  includeAllies: boolean
}) => {
  if (!includeAllies) {
    return []
  }

  return [
    {
      id: 'ally',
      icon: 'ally_inverted',
      type: CardType.ASSET,
      name: 'Ally'
    }
  ]
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

export const getBondedDividers = ({
  factions,
  includeBonded
}: {
  factions: IFaction[]
  includeBonded: boolean
}) => {
  if (!includeBonded) {
    return [];
  }
  return factions.map((faction): IDivider => ({
    id: uniqId(),
    name: 'Bonded',
    icon: faction.icon,
    type: 'player'
  }))
}

export const getFactionIdDividers = ({
  factions,
  includeFactionId
}: {
  factions: IFaction[]
  includeFactionId: boolean
}) => {
  if (!includeFactionId) {
    return [];
  }
  return factions.map((faction): IDivider => ({
    id: uniqId(),
    name: faction.name,
    icon: faction.icon,
    type: 'player'
  }))
}


export const getBasicWeaknessDividers = ({
  includeBasicWeakness
}: AddPlayerDividersOptions) => {
  if (!includeBasicWeakness) {
    return []
  }

  return [
    {
      id: uniqId(),
      name: 'Basic Weakness',
      icon: 'weakness',
      type: 'player'
    }
  ]
}
