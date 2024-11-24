import { BASE_PATH } from '@/constants/app';
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from '@/types/layouts';
import { PageOrientation } from '@/types/print';

const arkhamesqueClassicLayoutBase = {
  types: [LayoutType.SCENARIO, LayoutType.PLAYER],
  orientation: LayoutOrientation.HORIZONTAL,
  pageOrientation: PageOrientation.PORTRAIT,
  color: true,
  rowSize: 2,
  groupSize: 6,
  campaignOptions: {
    includeCampaignIcon: true,
    includeScenarioSize: false,
    includeEncounterSize: false
  },
  playerOptions: {
    displaySideXP: false
  }
}

export const arkhamesqueClassicLayouts: ILayout[] = [
  {
    ...arkhamesqueClassicLayoutBase,
    id: 'arkhamesque-classic',
    categoryId: "arkhamesque-classic",
    title: 'Large 3.25"',
    width: 89,
    height: 80,
    bleeds: {
      width: 95,
      height: 86,
      left: 3,
      top: 3,
      right: 3,
      bottom: 3
    }
  },
  {
    ...arkhamesqueClassicLayoutBase,
    id: 'arkhamesque-classic-3',
    categoryId: "arkhamesque-classic",
    title: 'Medium 3"',
    width: 89,
    height: 77,
    bleeds: {
      width: 95,
      height: 86,
      left: 3,
      top: 3,
      right: 3,
      bottom: 6
    }
  }
]

export const arkhamesqueCategory: ILayoutCategory = {
  unlisted: true,
  id: "arkhamesque-classic",
  name: "Arkhamesque Classic",
  info: "Arkhamesque Classic Horizontal Dividers",
  url: 'https://boardgamegeek.com/filepage/197199/arkhamesque-classic-horizontal-dividers',
  author: {
    name: 'Troy',
    image: BASE_PATH + '/images/authors/troy.png',
    donationUrl: 'http://www.patreon.com/smallville247',
    contacts: [
      {
        id: 'patreon',
        title: 'Patreon',
        icon: 'patreon',
        url: 'https://www.patreon.com/smallville247'
      },
      {
        id: 'etsy',
        title: 'TheArtisanMeeple',
        icon: 'meeple',
        url: 'https://etsy.com/shop/TheArtisanMeeple'
      },
      {
        id: 'bgg',
        title: 'BGG',
        icon: 'bgg',
        url: 'https://boardgamegeek.com/user/smallville247'
      }
    ]
  }
}