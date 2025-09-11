import { BASE_PATH } from '@/shared/config/app';
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from '@/shared/types/layouts';

const bleedSize = {
  top: 2,
  left: 2,
  right: 2,
  bottom: 2,
};

export const sarnetskyLayouts: ILayout[] = [
  {
    id: 'sarnetsky-horizontal',
    categoryId: 'sarnetsky',
    width: 89,
    height: 75,
    title: 'Made by @sarnetsky',
    types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    bleed: {
      width: 93,
      height: 79,
      ...bleedSize,
    },
    campaignOptions: {
      includeCampaignIcon: true,
      includeEncounterSize: false,
      includeScenarioSize: false,
    },
    playerOptions: {
      displaySideXP: true,
    },
  },
  {
    id: 'sarnetsky-vertical',
    categoryId: 'sarnetsky',
    width: 63,
    height: 105,
    title: 'Made by @sarnetsky',
    types: [LayoutType.SCENARIO],
    orientation: LayoutOrientation.VERTICAL,
    color: true,
    bleed: {
      width: 67,
      height: 109,
      ...bleedSize,
    },
    campaignOptions: {
      includeCampaignIcon: true,
      includeEncounterSize: false,
      includeScenarioSize: false,
    },
  },
];

export const sarnetskyLayoutCategory: ILayoutCategory = {
  id: 'sarnetsky',
  name: 'Eugene Sarnetsky',
  // unlisted: true,
  author: {
    name: 'Eugene Sarnetsky',
    image: `${BASE_PATH}images/authors/esarnetsky.jpg`,
    donationUrl: 'https://www.tinkoff.ru/cf/8OT6GkH6KwE',
    url: 'https://t.me/sarnetsky',
    contacts: [
      {
        id: 'telegram',
        icon: 'telegram',
        url: 'https://t.me/sarnetsky',
      },
      {
        id: 'email',
        icon: 'mail',
        url: 'mailto:sarnetsky@gmail.com',
      },
    ],
  },
};
