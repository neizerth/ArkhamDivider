import { LayoutOrientation } from '@/shared/types/layouts';

import horizontalBgColor from './images/horizontal.png';
import horizontalBgGrayscale from './images/horizontal_bw.png';
import horizontalBgColorHQ from './images/horizontal_hq.png';

import verticalBgColor from './images/vertical.png';
import verticalBgGrayscale from './images/vertical_bw.png';

export const backgrounds = [
  {
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    src: horizontalBgColor,
    hq: false,
  },
  {
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    src: horizontalBgColorHQ,
    hq: true,
  },
  {
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
    src: horizontalBgGrayscale,
    hq: false,
  },
  {
    orientation: LayoutOrientation.VERTICAL,
    color: true,
    src: verticalBgColor,
    hq: false,
  },
  {
    orientation: LayoutOrientation.VERTICAL,
    color: false,
    src: verticalBgGrayscale,
    hq: false,
  },
];
