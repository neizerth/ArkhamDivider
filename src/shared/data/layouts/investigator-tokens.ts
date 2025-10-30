import { BASE_PATH, BOOSTY_LINK, PATREON_LINK, PAYPAL_LINK, T_LINK } from '@/shared/config/app';
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from '@/shared/types/layouts';

const bleed = {
  left: 3,
  right: 3,
  top: 3,
  bottom: 3,
};

const investigatorTokensLayoutCommon = {
  categoryId: 'investigator-tokens',

  types: [LayoutType.INVESTIGATOR],
  orientation: LayoutOrientation.HORIZONTAL,
  color: true,
};

export const investigatorTokensDoubleLayout: ILayout = {
  ...investigatorTokensLayoutCommon,
  id: 'investigator-tokens',
  width: 25,
  height: 25,
  title: 'Color + B&W',
  bleed: {
    ...bleed,
    width: 31,
    height: 31,
  },
  investigatorOptions: {
    doubleSided: true,
    duplicateCodes: {
      '04244': 4,
      '10661': 4,
    },
  },
};

export const investigatorTokensSingleLayout: ILayout = {
  ...investigatorTokensDoubleLayout,
  id: 'investigator-tokens-color',
  title: 'Color',
  investigatorOptions: {
    duplicateCodes: {
      '04244': 4,
      '10661': 4,
    },
  },
};

export const investigatorTokensLayouts = [
  investigatorTokensDoubleLayout,
  investigatorTokensSingleLayout,
];

export const investigatorTokensLayoutCategory: ILayoutCategory = {
  id: 'investigator-tokens',
  name: 'Investigator Tokens',
  info: 'Investigator Tokens',
  author: {
    name: 'Vladimir Yazykov',
    image: `${BASE_PATH}images/neizerth.jpg`,
    url: 'https://github.com/neizerth',
    donationUrl: PATREON_LINK,
    contacts: [
      {
        id: 'patreon',
        icon: 'patreon',
        url: PATREON_LINK,
      },
      {
        id: 'paypal',
        icon: 'paypal',
        url: PAYPAL_LINK,
      },
      {
        id: 'boosty',
        icon: 'boosty',
        url: BOOSTY_LINK,
      },
      {
        id: 't_bank',
        icon: 't_bank',
        url: T_LINK,
      },
      {
        id: 'github',
        icon: 'github',
        url: 'https://github.com/neizerth',
      },
      {
        id: 'mail',
        icon: 'mail',
        url: 'mailto:neizerth@gmail.com',
      },
      {
        id: 'telegram',
        icon: 'telegram',
        url: 'https://t.me/neizerth',
      },
    ],
  },
};
