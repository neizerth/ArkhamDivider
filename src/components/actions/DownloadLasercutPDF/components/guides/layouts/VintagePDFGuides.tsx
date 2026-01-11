import { Path } from '@react-pdf/renderer';
import { propEq } from 'ramda';
import {
  getTabPosition,
  TabPosition,
} from '@/components/dividers/vintage/VintageDivider/features/tabPosition';
import { toPrintSize } from '@/shared/lib/features/util/units';
import { IDivider } from '@/shared/types/dividers';
import { BLEED_GAP } from '../../../constants';
import { ILayout, LayoutOrientation } from '@/shared/types/layouts';

const TAB_HEIGHT = 10.3;

export const VintagePDFGuides = ({
  divider,
  dividers,
  x,
  y,
  width,
  height,
  radius,
  topCornerRadius = 0,
  bleedSize,
  layout,
}: {
  x: number;
  y: number;
  radius: number;
  topCornerRadius?: number;
  width: number;
  height: number;
  divider: IDivider;
  dividers: IDivider[];
  bleedSize: number;
  layout: ILayout;
}) => {
  const vertical = layout.orientation === LayoutOrientation.VERTICAL;
  const tabWidth = vertical ? 22 : 30;
  const TAB_WIDTH = tabWidth + BLEED_GAP * 2;

  const { backId } = divider;

  const useBleed = bleedSize > 0;

  const bleedShift = useBleed ? bleedSize : 3;

  const TAB_RECTS: Record<TabPosition, number> = {
    left: 0,
    center: TAB_WIDTH - BLEED_GAP * 2 + bleedShift,
    right: TAB_WIDTH * 2 - BLEED_GAP * 4 + bleedShift * 1.5,
  };

  const tabProps = backId ? dividers.find(propEq(backId, 'id')) : divider;
  const currentPosition = tabProps?.customParams?.tabPosition as TabPosition;

  const tabPosition = getTabPosition({
    currentPosition,
    current: divider,
    dividers,
  });

  const tabLeft = Math.round(toPrintSize(TAB_RECTS[tabPosition]));

  const tab = {
    width: Math.round(toPrintSize(TAB_WIDTH)),
    height: Math.round(toPrintSize(TAB_HEIGHT)),
    x: tabLeft,
  };

  const topBodyLeftCorner =
    topCornerRadius > 0 && tabPosition !== 'left'
      ? [
          ['M', x, y + tab.height + topCornerRadius],
          ['Q', [x, y + tab.height].join(', '), [x + topCornerRadius, y + tab.height].join(', ')],
        ]
      : [['M', x, y + tab.height]];

  const tabStart = tab.x > 0 ? [['L', x + tab.x, y + tab.height]] : [];

  const tabLeftCorner =
    radius > 0
      ? [
          ['L', x + tab.x, y + radius],
          ['Q', [x + tab.x, y].join(', '), [x + tab.x + radius, y].join(', ')],
        ]
      : [['L', x + tab.x, y]];

  const tabRightCorner =
    radius > 0
      ? [
          ['L', x + tab.x + tab.width - radius, y],
          [
            'Q',
            [x + tab.x + tab.width, y].join(', '),
            [x + tab.x + tab.width, y + radius].join(', '),
          ],
        ]
      : [['L', x + tab.x + tab.width, y]];

  const tabPaths = [
    ...tabStart,
    ...tabLeftCorner,
    ...tabRightCorner,
    ['L', x + tab.x + tab.width, y + tab.height],
  ];

  const moveToTab = [['L', x + tab.x, y + tab.height]];

  const moveFromTab =
    topCornerRadius > 0
      ? [
          ['L', x + width - topCornerRadius, y + tab.height],
          [
            'Q',
            [x + width, y + tab.height].join(', '),
            [x + width, y + tab.height + topCornerRadius].join(', '),
          ],
        ]
      : [['L', x + width, y + tab.height]];

  const bottomRightCorner =
    radius > 0
      ? [
          ['L', x + width, y + height - radius],
          ['Q', [x + width, y + height].join(', '), [x + width - radius, y + height].join(', ')],
        ]
      : [['L', x + width, y + height]];

  const bottomLeftCorner =
    radius > 0
      ? [
          ['L', x + radius, y + height],
          ['Q', [x, y + height].join(', '), [x, y + height - radius].join(', ')],
        ]
      : [['L', x, y + height]];

  const closePath =
    radius > 0 && tabPosition !== 'left'
      ? [['L', x, y + tab.height + topCornerRadius]]
      : [['L', x, y + tab.height]];

  const paths = [
    ...topBodyLeftCorner,
    ...(tabPosition !== 'left' ? moveToTab : []),
    ...tabPaths,
    ...(tabPosition !== 'right' ? moveFromTab : []),
    ...bottomRightCorner,
    ...bottomLeftCorner,
    ...closePath,
  ];

  const d = paths.map((path) => path.join(' ')).join(' ');

  return <Path d={d} stroke='red' strokeWidth={1} />;
};
