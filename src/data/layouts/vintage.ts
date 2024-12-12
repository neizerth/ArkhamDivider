import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";

export const vintageLayout: ILayout = {
  id: 'vintage',
  categoryId: 'vintage',
  width: 90,
  height: 71,
  title: 'Vintage Tabbed',
  types: [LayoutType.SCENARIO, LayoutType.PLAYER],
  orientation: LayoutOrientation.HORIZONTAL,
  color: true,
  bleed: {
    width: 96,
    height: 77,
    left: 3,
    right: 3,
    top: 3,
    bottom: 3
  }
}

export const vintageLayoutCategory: ILayoutCategory = {
  id: 'vintage',
  name: 'Vintage Tabbed',
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