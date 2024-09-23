
import { LayoutOrientation } from '@/types/layouts';

import horizontalBgColor from './images/horizontal.png'
import horizontalBgGrayscale from './images/horizontal_bw.png'

import verticalBgColor from './images/horizontal.png'
import verticalBgGrayscale from './images/horizontal.png'

export const backgrounds = [
  {
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    src: horizontalBgColor
  },
  {
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
    src: horizontalBgGrayscale
  },
  {
    orientation: LayoutOrientation.VERTICAL,
    color: true,
    src: verticalBgColor
  },
  {
    orientation: LayoutOrientation.VERTICAL,
    color: false,
    src: verticalBgGrayscale
  },
]