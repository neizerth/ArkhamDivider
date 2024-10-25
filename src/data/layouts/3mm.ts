import { BASE_PATH } from "@/constants/app";
import { ILayoutCategory } from "@/types/layouts";

export const arkhamStarter3mmLayoutCategory: ILayoutCategory = {
  id: '3mm',
  name: '3mm (arkham-starter.com)',
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