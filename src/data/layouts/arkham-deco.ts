import { BASE_PATH, BOOSTY_LINK } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export enum ArkhamDecoDividerType {
  TAB = 'tab'
} 

export enum ArkhamDecoDividerSize {
  SMALL = 'small'
} 

export const common = {
  categoryId: "arkham-deco",
  title: "Arkham Deco",
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  pageOrientation: PageOrientation.PORTRAIT,
  maxCreditsGroupSize: 6,
  campaignOptions: {
    includeCampaignIcon: true,
    includeEncounterSize: false,
    includeScenarioSize: false
  },
  playerOptions: {
    displayNumericXP: false
  }
}

export const horizontal = {
  rowSize: 2,
  groupSize: 8,
  width: 94,
  height: 68.5,
  bleeds: {
    width: 98,
    height: 72.5,
    top: 2,
    left: 2
  }
}

export const horizontalDeckbox = {
  rowSize: 2,
  groupSize: 8,
  width: 94,
  height: 70,
  bleeds: {
    width: 98,
    height: 74,
    top: 2,
    left: 2
  },
  customParams: {
    type: 'gamegenic'
  }
}

export const horizontalSmall = {
  rowSize: 2,
  groupSize: 8,
  width: 94,
  height: 67,
  bleeds: {
    width: 98,
    height: 71,
    top: 2,
    left: 2
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
  bleeds: {
    width: 97,
    height: 72.5,
    top: 2,
    left: 2
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
    title: "UCS Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontalTab,
    title: "UCS50",
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
    title: "UCS50",
    id: "arkham-deco-tab-bw",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalSmall,
    id: "arkham-deco-small-bw",
    title: "UCS Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
]

export const arkhamDecoCategory: ILayoutCategory = {
  id: 'arkham-deco',
  name: 'Arkham Deco',
  info: '',
  author: {
    name: 'Vladimir Yazykov',
    image: BASE_PATH + '/images/neizerth.jpg',
    url: '',
    contacts: [
      {
        id: 'boosty',
        icon: 'link',
        url: BOOSTY_LINK
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