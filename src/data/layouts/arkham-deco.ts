import { BASE_PATH } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export const common = {
  categoryId: "arkham-deco",
  title: "Arkham Deco",
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  pageOrientation: PageOrientation.PORTRAIT,
}

export const horizontal = {
  rowSize: 2,
  groupSize: 8,
  width: 94,
  height: 68.5,
  bleeds: {
    width: 97,
    height: 73,
    top: 2,
    left: 2
  }
}

export const arkhamDecoLayouts: ILayout[] = [
  {
    ...common,
    ...horizontal,
    id: "arkham-deco",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    campaignOptions: {
      includeCampaignIcon: true
    }
  },
]

export const arkhamDecoCategory: ILayoutCategory = {
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