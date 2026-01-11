import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from '@/shared/types/layouts';

const vintageBleed = {
  left: 3,
  right: 3,
  top: 3,
  bottom: 3,
};

const vintageLayoutCommon = {
  categoryId: 'vintage',

  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  orientation: LayoutOrientation.HORIZONTAL,
  color: true,
  campaignOptions: {
    includeScenarioSize: false,
    includeEncounterSize: false,
    includeCampaignIcon: true,
  },
  playerOptions: {
    displaySideXP: true,
  },
};

export const vintageLayouts: ILayout[] = [
  {
    ...vintageLayoutCommon,
    id: 'vintage',
    width: 90,
    height: 72,
    title: 'Standart',
    bleed: {
      ...vintageBleed,
      width: 96,
      height: 78,
    },
  },
  {
    ...vintageLayoutCommon,
    id: 'vintage-large',
    width: 90,
    height: 77,
    title: 'Large',
    bleed: {
      ...vintageBleed,
      width: 96,
      height: 83,
    },
    customParams: {
      size: 'large',
    },
  },
  {
    ...vintageLayoutCommon,
    id: 'vintage-vertical',
    orientation: LayoutOrientation.VERTICAL,
    width: 66,
    height: 107.3,
    title: 'Vertical',
    bleed: {
      ...vintageBleed,
      width: 72,
      height: 113.3,
    },
    customParams: {
      type: 'vertical',
    },
  },
];

export const vintageLayoutCategory: ILayoutCategory = {
  id: 'vintage',
  name: 'Vintage (Tabbed)',
  info: 'Tabbed Vintage Dividers',
  author: {
    name: 'Bob Lafouine',
    contacts: [
      {
        id: 'bgg',
        icon: 'bgg',
        title: 'BGG',
        url: 'https://boardgamegeek.com/user/boblafouine',
      },
      {
        id: 'email',
        icon: 'mail',
        title: 'E-mail',
        url: 'mailto:29wxcvbn29@gmail.com',
      },
    ],
  },
};
