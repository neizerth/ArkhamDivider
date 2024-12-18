import { DividerType, IDivider } from "@/types/dividers";
import { prop, propEq } from "ramda";

export type TabPosition = 'left' | 'right' | 'center';

const TAB_POSITION: TabPosition[] = ['left', 'center', 'right'];

export type GetTabPositionOptions = {
  currentPosition?: TabPosition
  current: IDivider
  dividers: IDivider[]
}

export const getTabPosition = ({
  currentPosition,
  current,
  dividers
}: GetTabPositionOptions): TabPosition => {
  const {
    id,
    backId,
    type
  } = current;
  
  if (currentPosition && backId) {
    const index = TAB_POSITION.indexOf(currentPosition);
    const sideIndex = 2 - index;
    return TAB_POSITION[sideIndex] as TabPosition;
  }
  if (currentPosition) {
    return currentPosition;
  }

  const typeIndexes = dividers
    .filter(propEq(type, 'type'))
    .map(prop('id'));
  
  if (type === DividerType.CAMPAIGN) {
    return 'center';
  }

  const frontIndex = typeIndexes.indexOf(backId || id);
  const tabIndex = frontIndex % 3;
  const sideIndex = backId ? 2 - tabIndex : tabIndex;
  return TAB_POSITION[sideIndex] as TabPosition;
}

export const getNextTabPosition = (currentPosition: TabPosition) => {
  return currentPosition === 'center' ? 'right' : 'center';
}

export const getPrevTabPosition = (currentPosition: TabPosition) => {
  return currentPosition === 'center' ? 'left' : 'center';
}