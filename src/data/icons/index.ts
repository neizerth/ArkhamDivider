import campaigns from './campaigns';
import custom from './custom';
import side from './side.json';
import player from './player.json';
import { IIconTransform } from '@/types/icons';

export const ICON_LAYOUT_HEIGHT = 89;
export const ICON_SIZE = 7.8;

export default [
  ...campaigns,
  ...custom,
  ...side,
  ...player
] as IIconTransform[]