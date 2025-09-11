import styled, { css } from 'styled-components';
import { DividerCornerRadius } from '../../common/DividerCornerRadius/DividerCornerRadius';
import { TabPosition } from '../VintageDivider/features/tabPosition';

const TAB_WIDTH = 30;

const createPolygon = (expressions: string[]) => {
  const data = expressions.join(', ');

  return `polygon(${data})`;
};

const cornerRadiusClipPath: Record<TabPosition, string> = {
  left: createPolygon([
    '0% 100%',
    `0% 4mm`,
    `4mm 4mm`,
    `4mm 2px`,
    `${TAB_WIDTH}mm 2px`,
    `100% 0%`,
    '100% 100%',
  ]),
  right: createPolygon([
    '0% 100%',
    `0% 0%`,
    `${TAB_WIDTH * 2}mm 0`,
    `${TAB_WIDTH * 2}mm 4mm`,
    `100% 4mm`,
    '100% 100%',
  ]),
  center: createPolygon([
    '0% 100%',
    `0% 0%`,
    `${TAB_WIDTH}mm 0`,
    `${TAB_WIDTH}mm 2px`,
    `calc(${TAB_WIDTH * 2}mm + 2px) 2px`,
    `calc(${TAB_WIDTH * 2}mm + 2px) 0`,
    `100% 0%`,
    '100% 100%',
  ]),
};

export const VintageDividerCornerRadius = styled(DividerCornerRadius)<{
  $tabPosition: TabPosition;
}>`
  z-index: 4;
  top: calc(13.29mm - 1px);
  border-color: rgba(255, 255, 255, 0.5);
  border-radius: 0 0 4mm 4mm;
  ${({ $tabPosition }) => css`
    clip-path: ${cornerRadiusClipPath[$tabPosition]};
  `}
`;
