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
    width: 97,
    height: 84,
    top: 3.2,
    left: 4,
    right: 4.1,
    bottom: 4.6,
  }
}

export const vertical = {
  rowSize: 3,
  groupSize: 6,
  height: 100,
  width: 63,
  bleeds: {
    width: 71,
    height: 107,
    top: 3.2,
    left: 4.6,
    right: 3.4,
    bottom: 3.8
  },
}

export const verticalForSleeves = {
  rowSize: 3,
  groupSize: 6,
  height: 100,
  width: 65,
  bleeds: {
    width: 71,
    height: 107,
    top: 3.2,
    left: 3.3,
    right: 4.7,
    bottom: 3.8
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
    title: "63x100",
    orientation: LayoutOrientation.VERTICAL,
    color: true,
  },
  {
    ...common,
    ...vertical,
    id: "classic-vertical-bw",
    title: "63x100",
    orientation: LayoutOrientation.VERTICAL,
    color: false,
  },
  {
    ...common,
    ...verticalForSleeves,
    id: "classic-vertical-sleeves",
    title: "65x100",
    orientation: LayoutOrientation.VERTICAL,
    color: true,
  },
  {
    ...common,
    ...verticalForSleeves,
    id: "classic-vertical-sleeves-bw",
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