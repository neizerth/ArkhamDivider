import frameVertical from './scenario__frame_vertical.png'
import frameHorizontal from './scenario__frame_horizontal.png'

import colorVertical from './scenario__color_vertical.png';
import colorHorizontal from './scenario__color_horizontal.png'

import vertical from './scenario__vertical.png';
import horizontal from './scenario__horizontal.png';
import { LayoutOrientation } from '@/types/layouts';

const images = [
  {
    orientation: LayoutOrientation.VERTICAL,
    frame: frameVertical,
    color: colorVertical,
    background: vertical
  },
  {
    orientation: LayoutOrientation.HORIZONTAL,
    frame: frameHorizontal,
    
  }
]

