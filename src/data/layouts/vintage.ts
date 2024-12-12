import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";

export const vintageLayout: ILayout = {
  id: 'vintage',
  categoryId: 'vintage',
  width: 90,
  height: 72,
  title: 'Vintage',
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  orientation: LayoutOrientation.HORIZONTAL,
  color: true,
  bleed: {
    width: 96,
    height: 78,
    left: 3,
    right: 3,
    top: 3,
    bottom: 3
  },
  playerOptions: {
    displaySideXP: true
  }
}

export const vintageLayoutCategory: ILayoutCategory = {
  id: 'vintage',
  name: 'Vintage (Tabbed)',
  info: 'Tabbed Vintage Dividers',
  author: {
    name: 'Bob Lafouine',
    contacts: [
      {
        id: 'email',
        icon: 'mail',
        title: 'E-mail',
        url: 'mailto:29wxcvbn29@gmail.com'
      }
    ]
  }
}