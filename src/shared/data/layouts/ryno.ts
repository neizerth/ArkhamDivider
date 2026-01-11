import { BASE_PATH } from '@/shared/config/app';
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from '@/shared/types/layouts';

export const common = {
  categoryId: 'ryno',
  title: 'Ryno',
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  color: true,
  campaignOptions: {
    includeCampaignIcon: true,
    includeEncounterSize: false,
    includeScenarioSize: false,
  },
  playerOptions: {
    storySupported: true,
  },
};

const bleedSize = {
  top: 3,
  left: 3,
  right: 3,
  bottom: 3,
};

export const horizontal = {
  width: 89,
  height: 76,
  bleed: {
    width: 95,
    height: 82,
    ...bleedSize,
  },
};

export const vertical = {
  width: 63.7,
  height: 101.8,
  bleed: {
    width: 69.7,
    height: 107.8,
    ...bleedSize,
  },
};

export const verticalXL = {
  width: 75.8,
  height: 100.8,
  bleed: {
    width: 81.8,
    height: 106.8,
    ...bleedSize,
  },
};

export const rynoLayouts: ILayout[] = [
  {
    ...common,
    ...horizontal,
    id: 'ryno-horizontal',
    title: 'Horizontal',
    orientation: LayoutOrientation.HORIZONTAL,
    isDefault: true,
    customParams: {
      type: 'horizontal',
    },
  },
  {
    ...common,
    ...vertical,
    id: 'ryno-vertical',
    title: 'Vertical',
    orientation: LayoutOrientation.VERTICAL,
    color: true,
    customParams: {
      type: 'vertical',
    },
  },
  {
    ...common,
    ...verticalXL,
    id: 'classic-vertical-xl',
    title: 'XL',
    orientation: LayoutOrientation.VERTICAL,
    customParams: {
      type: 'verticalXL',
    },
  },
];

export const rynoLayoutCategory: ILayoutCategory = {
  id: 'ryno',
  name: 'Ryno',
  info: 'Ryno Style Dividers',
  author: {
    name: 'Ryno',
    url: 'https://boardgamegeek.com/profile/ryno80',
    image: `${BASE_PATH}images/ryno.png`,
    contacts: [
      {
        id: 'bgg',
        icon: 'bgg',
        url: 'https://boardgamegeek.com/profile/ryno80',
      },
      {
        id: 'etsy',
        icon: 'link',
        url: 'https://boardGameGoodies.shop',
      },
      {
        id: 'facebook',
        icon: 'facebook',
        url: 'https://www.facebook.com/ryansmessick',
      },
      {
        id: 'email',
        icon: 'mail',
        url: 'mailto:Rmessick@gmail.com',
      },
    ],
  },
};
