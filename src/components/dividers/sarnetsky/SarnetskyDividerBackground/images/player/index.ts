import { DividerType } from '@/shared/types/dividers';
import { LayoutOrientation } from '@/shared/types/layouts';
import customizations from './customizations.jpg';
import guardian from './guardian.jpg';
import multiclass from './multiclass.jpg';
import mystic from './mystic.jpg';
import neutral from './neutral.jpg';
import rogue from './rogue.jpg';
import seeker from './seeker.jpg';
import survivor from './survivor.jpg';
import weakness from './weakness.jpg';

export const playerImages = [
  {
    id: 'guardian',
    faction: 'guardian',
    background: guardian,
  },
  {
    id: 'multiclass',
    faction: 'multiclass',
    background: multiclass,
  },
  {
    id: 'mystic',
    faction: 'mystic',
    background: mystic,
  },
  {
    id: 'neutral',
    faction: 'neutral',
    background: neutral,
  },
  {
    id: 'rogue',
    faction: 'rogue',
    background: rogue,
  },
  {
    id: 'seeker',
    faction: 'seeker',
    background: seeker,
  },
  {
    id: 'survivor',
    faction: 'survivor',
    background: survivor,
  },
  {
    id: 'customizations',
    background: customizations,
  },
  {
    id: 'weakness',
    background: weakness,
  },
].map((item) => ({
  ...item,
  type: DividerType.PLAYER,
  orientation: LayoutOrientation.HORIZONTAL,
}));
