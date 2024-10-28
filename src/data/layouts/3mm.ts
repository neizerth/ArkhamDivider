import { BASE_PATH } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export const arkhamStarter3mmLayout: ILayout = {
  id: "3mm",
  categoryId: "3mm",
  title: "3mm",
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  pageOrientation: PageOrientation.PORTRAIT,
  orientation: LayoutOrientation.HORIZONTAL,
  maxCreditsGroupSize: 6,
  color: true,
  rowSize: 2,
  groupSize: 8,
  width: 93,
  height: 67,
  bleeds: {
    width: 100,
    height: 74,
    top: 3.5,
    left: 3.5
  },
  playerOptions: {
    displaySideXP: false
  }
} 

export const arkhamStarter3mmLayoutCategory: ILayoutCategory = {
  id: '3mm',
  name: '3mm',
  info: 'The smallest required headroom in the world',
  author: {
    name: '5argon',
    image: BASE_PATH + '/images/authors/5argon.png',
    url: 'https://5argon.info/',
    contacts: [
      {
        id: 'www',
        icon: 'link',
        url: 'https://www.5argon.info/'
      },
      {
        id: 'www2',
        icon: 'link',
        url: 'https://www.arkham-starter.com/'
      },
      {
        id: 'facebook',
        icon: 'facebook',
        url: 'http://facebook.com/555argon'
      },
      {
        id: 'twitter',
        icon: 'twitter',
        url: 'http://twitter.com/5argon'
      },
      {
        id: 'twitter2',
        icon: 'twitter',
        url: 'https://twitter.com/5argondesu'
      },
      {
        id: 'soundcloud',
        icon: 'soundcloud',
        url: 'https://soundcloud.com/5argon'
      }
    ]
  }
}