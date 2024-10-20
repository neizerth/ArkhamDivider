import { BASE_PATH } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export enum ArkhamDecoDividerType {
  TAB = 'tab'
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
  width: 93,
  height: 68.5,
  bleeds: {
    width: 97,
    height: 72.5,
    top: 2,
    left: 2
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
    ...horizontal,
    id: "arkham-deco-bw",
    title: "Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalTab,
    title: "Tab",
    id: "arkham-deco-tab-bw",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalTab,
    title: "Tab",
    id: "arkham-deco-tab",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
]

export const arkhamDecoCategory: ILayoutCategory = {
  unlisted: true,
  id: 'arkham-deco',
  name: 'Arkham Deco',
  info: '',
  author: {
    name: 'Vladimir Yazykov',
    image: BASE_PATH + '/images/ffg.png',
    url: 'https://www.fantasyflightgames.com/',
    contacts: []
  }
}