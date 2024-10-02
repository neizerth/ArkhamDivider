import { ILayout, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export const sarnetskyLayouts: ILayout[] = [
  {
    id: "sarnetsky-v",
    categoryId: "sarnetsky",
    rowSize: 3,
    groupSize: 6,
    width: 63,
    height: 105,
    title: "Made by @sarnetsky",
    types: [LayoutType.SCENARIO],
    orientation: LayoutOrientation.VERTICAL,
    pageOrientation: PageOrientation.PORTRAIT,
    color: true,
    bleeds: {
      width: 67,
      height: 109,
      top: 2,
      left: 2
    },
    campaignOptions: {
      includeCampaignIcon: true,
      includeEncounterSize: false,
      includeScenarioSize: false
    }
  },
  {
    id: "sarnetsky-h",
    categoryId: "sarnetsky",
    rowSize: 2,
    groupSize: 6,
    width: 89,
    height: 75,
    title: "Made by @sarnetsky",
    types: [LayoutType.SCENARIO, LayoutType.PLAYER],
    orientation: LayoutOrientation.HORIZONTAL,
    pageOrientation: PageOrientation.PORTRAIT,
    color: true,
    bleeds: {
      width: 93,
      height: 79,
      top: 2,
      left: 2
    },
    campaignOptions: {
      includeCampaignIcon: true,
      includeEncounterSize: false,
      includeScenarioSize: false
    }
  },
]