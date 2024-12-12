import { DividerType, IDivider } from "@/types/dividers";
import { prop, propEq } from "ramda";

export type TabPosition = 'left' | 'right' | 'center';

const TAB_POSITION: Record<number, TabPosition> = {
  0: 'left',
  1: 'center',
  2: 'right'
}

export type GetTabPositionOptions = {
  current: IDivider
  dividers: IDivider[]
}

export const getTabPosition = ({
  current,
  dividers
}: GetTabPositionOptions): TabPosition => {
  const {
    id,
    backId,
    type
  } = current;

  const typeIndexes = dividers
    .filter(propEq(type, 'type'))
    .map(prop('id'));
  
  if (type === DividerType.CAMPAIGN) {
    return 'center';
  }

  const frontIndex = typeIndexes.indexOf(id);
  const tabIndex = frontIndex % 3;
  const sideIndex = backId ? 2 - tabIndex : tabIndex;
  return TAB_POSITION[sideIndex];
}
