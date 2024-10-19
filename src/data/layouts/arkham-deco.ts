import { BASE_PATH } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

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
    height: 73,
    top: 2,
    left: 2
  }
}

export const horizontalMedium = {
  rowSize: 2,
  groupSize: 8,
  width: 93,
  height: 67,
  bleeds: {
    width: 97,
    height: 73,
    top: 2,
    left: 2
  },
  customParams: {
    size: 'medium'
  }
}

export const arkhamDecoLayouts: ILayout[] = [
  {
    ...common,
    ...horizontal,
    id: "arkham-deco",
    title: "Standart 68.5x93",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontal,
    id: "arkham-deco-bw",
    title: "Standart 68.5x93",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalMedium,
    title: "Medium 67x93",
    id: "arkham-deco-medium-bw",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalMedium,
    title: "Medium 67x93",
    id: "arkham-deco-medium",
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