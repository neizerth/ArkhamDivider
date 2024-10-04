import { BASE_PATH } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export const common = {
  categoryId: "classic",
  title: "Classic",
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  pageOrientation: PageOrientation.PORTRAIT,
}

export const horizontal = {
  rowSize: 2,
  groupSize: 6,
  width: 88.9,
  height: 76.2,
  bleeds: {
    width: 95,
    height: 82,
    top: 2.2,
    left: 2.8
  }
}

export const vertical = {
  rowSize: 3,
  groupSize: 6,
  height: 100,
  width: 64,
  bleeds: {
    width: 69,
    height: 105,
    top: 2.2,
    left: 2.8
  }
}

export const verticalUCF = {
  rowSize: 3,
  groupSize: 6,
  height: 100,
  width: 65,
  bleeds: {
    width: 69,
    height: 105,
    top: 2.2,
    left: 2.3
  }
}

export const classicLayouts: ILayout[] = [
  {
    ...common,
    ...horizontal,
    id: "classic-horizontal",
    title: "Classic",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    isDefault: true,
  },
  {
    ...common,
    ...horizontal,
    id: "classic-horizontal-bw",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...vertical,
    id: "classic-vertical",
    title: "64x100",
    orientation: LayoutOrientation.VERTICAL,
    color: true,
  },
  {
    ...common,
    ...vertical,
    id: "classic-vertical-bw",
    title: "64x100",
    orientation: LayoutOrientation.VERTICAL,
    color: false,
  },
  {
    ...common,
    ...verticalUCF,
    id: "classic-vertical-ucf",
    title: "65x100",
    orientation: LayoutOrientation.VERTICAL,
    color: true,
  },
  {
    ...common,
    ...verticalUCF,
    id: "classic-vertical-ucf-bw",
    title: "65x100",
    orientation: LayoutOrientation.VERTICAL,
    color: false,
  },
]

export const classicLayoutCategory: ILayoutCategory = {
  id: 'classic',
  name: 'Classic',
  info: 'Classic Return To... Dividers',
  author: {
    name: 'Fantasy Flight Games',
    image: BASE_PATH + '/images/ffg.png',
    url: 'https://www.fantasyflightgames.com/',
    contacts: [
      {
        id: 'www',
        icon: 'link',
        url: 'https://www.fantasyflightgames.com/'
      },
      {
        id: 'facebook',
        icon: 'facebook',
        url: 'http://www.facebook.com/FantasyFlightGames'
      },
      {
        id: 'twitter',
        icon: 'twitter',
        url: 'http://www.twitter.com/ffgames'
      },
      {
        id: 'instagram',
        icon: 'instagram',
        url: 'https://www.instagram.com/fantasyflightgames/'
      },
      {
        id: 'youtube',
        icon: 'youtube',
        url: 'https://www.youtube.com/user/FantasyFlightStudio'
      }
    ]
  }
}