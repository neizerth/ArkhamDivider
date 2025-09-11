import { BASE_PATH } from '@/shared/config/app';
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from '@/shared/types/layouts';

const arkhamesqueClassicLayoutBase = {
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  orientation: LayoutOrientation.HORIZONTAL,
  color: true,
  async: true,
  campaignOptions: {
    includeCampaignIcon: true,
    includeScenarioSize: false,
    includeEncounterSize: false,
  },
  playerOptions: {
    displaySideXP: false,
  },
};

export const arkhamesqueClassicLayouts: ILayout[] = [
  {
    ...arkhamesqueClassicLayoutBase,
    id: 'arkhamesque-classic',
    categoryId: 'arkhamesque-classic',
    title: 'Large 3.25"',
    width: 89,
    height: 80,
    bleed: {
      width: 95,
      height: 86,
      left: 3,
      top: 3,
      right: 3,
      bottom: 3,
    },
  },
  {
    ...arkhamesqueClassicLayoutBase,
    id: 'arkhamesque-classic-3',
    categoryId: 'arkhamesque-classic',
    title: 'Medium 3"',
    width: 89,
    height: 77,
    bleed: {
      width: 95,
      height: 86,
      left: 3,
      top: 3,
      right: 3,
      bottom: 6,
    },
  },
];

export const arkhamesqueCategory: ILayoutCategory = {
  id: 'arkhamesque-classic',
  name: 'Arkhamesque Classic',
  info: 'Arkhamesque Classic Horizontal Dividers',
  url: 'https://boardgamegeek.com/filepage/197199/arkhamesque-classic-horizontal-dividers',
  author: {
    name: 'smallville247',
    image: `${BASE_PATH}images/authors/troy.png`,
    donationUrl: 'http://www.patreon.com/smallville247',
    contacts: [
      {
        id: 'patreon',
        title: 'Patreon',
        icon: 'patreon',
        url: 'https://www.patreon.com/smallville247',
      },
      {
        id: 'bgg',
        title: 'BGG',
        icon: 'bgg',
        url: 'https://boardgamegeek.com/user/smallville247',
      },
    ],
  },
};
