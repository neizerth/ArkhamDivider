import { BASE_PATH } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";

export const arkhamStarter3mmLayout: ILayout = {
  id: "3mm",
  categoryId: "3mm",
  title: "3mm",
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  orientation: LayoutOrientation.HORIZONTAL,
  maxCreditsGroupSize: 6,
  color: true,
  width: 93,
  height: 67,
  bleed: {
    width: 100,
    height: 74,
    top: 3.5,
    left: 3.5,
    right: 3.5,
    bottom: 3.5
  },
  playerOptions: {
    displaySideXP: false,
    storySupported: true
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
        title: 'Personal website',
        url: 'https://www.5argon.info/'
      },
      {
        id: 'www2',
        icon: 'skill_intellect',
        title: 'Arkham Starter project',
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
        title: 'Thai, tweets nonsense',
        url: 'http://twitter.com/5argon'
      },
      {
        id: 'twitter2',
        icon: 'twitter',
        title: '日本語, tweets music games',
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