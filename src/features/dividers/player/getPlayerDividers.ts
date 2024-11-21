import { AddPlayerDividersOptions } from '@/store/features/addDividers/addDividers';
import { DividerType, IDivider } from '@/types/dividers';
import { CardType, IFaction } from '@/types/game';
import { uniqId } from '@/util/common';

export const getPlayerDividers = (options: AddPlayerDividersOptions) => {
  const { story } = options; 
  const dividers = [
    ...getBasicWeaknessDividers(options),
    ...getUpgradingDividers(options),
    ...getCustomizationsDividers(options),
    ...getPlayerCardDividers(options),
    ...getFactionIdDividers(options),
    ...getBondedDividers(options)
  ];

  // console.log(story);
  return dividers.map(divider => ({
    ...divider,
    story,
    campaignIcon: story?.icon
  }))
}

export const getPlayerCardDividers = (options: AddPlayerDividersOptions) => {
  const {
    xpCosts,
    factions,
    displaySideXP,
    displayNumericXP
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
          faction: faction.id,
          cardType: type.type,
          type: DividerType.PLAYER,
          displaySideXP,
          displayNumericXP,
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
  includeUpgrading
}: {
  factions: IFaction[]
  includeUpgrading: boolean
}) => {
  if (!includeUpgrading) {
    return [];
  }
  return factions.map((faction): IDivider => ({
    id: uniqId(),
    name: 'Upgrading',
    icon: faction.icon,
    specialIcon: 'upgrade',
    faction: faction.id,
    type: DividerType.PLAYER
  }))
}

export const getCustomizationsDividers = ({
  factions,
  includeCustomizations
}: {
  factions: IFaction[]
  includeCustomizations: boolean
}) => {
  if (!includeCustomizations) {
    return [];
  }
  return factions.map((faction): IDivider => ({
    id: uniqId(),
    name: 'Customizations',
    tags: ['customizations'],
    icon: faction.icon,
    specialIcon: 'list',
    faction: faction.id,
    type: DividerType.PLAYER
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
    specialIcon: 'link',
    icon: faction.icon,
    faction: faction.id,
    type: DividerType.PLAYER
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
    faction: faction.id,
    type: DividerType.PLAYER
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
      type: DividerType.PLAYER
    }
  ]
}
