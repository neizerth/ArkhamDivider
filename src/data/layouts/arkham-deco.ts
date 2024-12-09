import { BASE_PATH, BOOSTY_LINK, PAYPAL_LINK, T_LINK } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";

export enum ArkhamDecoDividerType {
  TAB = 'tab'
} 

export enum ArkhamDecoDividerSize {
  SMALL = 'small'
} 

const bleedSize = {
  top: 3,
  bottom: 3,
  left: 3,
  right: 3
}

export const common = {
  categoryId: "arkham-deco",
  title: "Arkham Deco",
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  maxCreditsGroupSize: 6,
  campaignOptions: {
    includeCampaignIcon: true
  },
  playerOptions: {
    displayNumericXP: false,
    storySupported: true
  }
}

export const horizontal = {
  width: 94,
  height: 68.5,
  bleed: {
    width: 100,
    height: 74.5,
    ...bleedSize
  }
}

export const vertical = {
  width: 62,
  height: 96,
  bleed: {
    width: 68,
    height: 102,
    ...bleedSize
  },
  customParams: {
    type: 'tab'
  },
}

export const horizontalDeckbox = {
  width: 94,
  height: 70,
  bleed: {
    width: 100,
    height: 76,
    ...bleedSize
  },
  customParams: {
    type: 'deckbox'
  }
}

export const horizontalSmall = {
  width: 94,
  height: 67,
  bleed: {
    width: 100,
    height: 73,
    ...bleedSize
  },
  customParams: {
    type: 'tab',
    size: 'small'
  }
}

export const horizontalTab = {
  ...horizontal,
  width: 93.5,
  height: 68.5,
  bleed: {
    width: 99,
    height: 74.5,
    ...bleedSize
  },
  customParams: {
    type: 'tab'
  }
}

export const arkhamDecoLayouts: ILayout[] = [
  {
    ...common,
    ...horizontal,
    id: "arkham-deco",
    title: "Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontalDeckbox,
    id: "arkham-deco-large",
    title: "Deck Box",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontalSmall,
    id: "arkham-deco-small",
    title: "UCF Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontalTab,
    title: "UCF50",
    id: "arkham-deco-tab",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontal,
    id: "arkham-deco-bw",
    title: "Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalDeckbox,
    id: "arkham-deco-large-bw",
    title: "Deck Box",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalTab,
    title: "UCF50",
    id: "arkham-deco-tab-bw",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalSmall,
    id: "arkham-deco-small-bw",
    title: "UCF Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...vertical,
    title: "UC Quartz",
    id: "arkham-deco-vertical",
    orientation: LayoutOrientation.VERTICAL,
    color: true,
  },
  {
    ...common,
    ...vertical,
    id: "arkham-deco-vertical-bw",
    title: "UC Quartz",
    orientation: LayoutOrientation.VERTICAL,
    color: false,
  },
]

export const arkhamDecoCategory: ILayoutCategory = {
  id: 'arkham-deco',
  name: 'Arkham Deco',
  info: 'Compact Dividers',
  author: {
    name: 'Vladimir Yazykov',
    image: BASE_PATH + 'images/neizerth.jpg',
    url: 'https://github.com/neizerth',
    donationUrl: BOOSTY_LINK,
    contacts: [
      {
        id: 'boosty',
        icon: 'link',
        url: BOOSTY_LINK
      },
      {
        id: 'paypal',
        icon: 'paypal',
        url: PAYPAL_LINK
      },
      {
        id: 't_bank',
        icon: 't_bank',
        url: T_LINK
      },
      {
        id: 'github',
        icon: 'github',
        url: 'https://github.com/neizerth'
      },
      {
        id: 'mail',
        icon: 'mail',
        url: 'mailto:neizerth@gmail.com'
      },
      {
        id: 'telegram',
        icon: 'telegram',
        url: 'https://t.me/neizerth'
      },
    ]
  }
}