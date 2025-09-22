import { BASE_PATH } from '@/shared/config/app';
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from '@/shared/types/layouts';

const bleedSize = {
  top: 2,
  left: 5,
  right: 5,
  bottom: 2,
};

const campaignOptions = {
  includeEncounterSize: true,
  includeScenarioSize: true,
  includeCampaign: false,
};

export const sarnetskyBandLayouts: ILayout[] = [
  {
    id: 'sarnetsky-band_standart',
    categoryId: 'sarnetsky-band',
    width: 200,
    height: 25,
    title: 'Campaign',
    types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    bleed: {
      width: 210,
      height: 29,
      ...bleedSize,
    },
    campaignOptions,
  },
  {
    id: 'sarnetsky-band_standalone',
    categoryId: 'sarnetsky-band',
    width: 287,
    height: 25,
    title: 'Standalone',
    types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    bleed: {
      width: 297,
      height: 29,
      ...bleedSize,
    },
    campaignOptions,
  },
];

export const sarnetskyBandLayoutCategory: ILayoutCategory = {
  id: 'sarnetsky-band',
  name: 'Bands by @sarnetsky',
  info: 'Note: Use Standalone size for large card packs',
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
