import { CardType } from '@/shared/types/game';

export const playerCardTypes = [
  {
    id: 'all',
    name: '—',
    type: CardType.ALL,
  },
  {
    id: 'asset',
    name: 'Asset',
    type: CardType.ASSET,
  },
  {
    id: 'event',
    name: 'Event',
    type: CardType.EVENT,
  },
  {
    id: 'skill',
    name: 'Skill',
    type: CardType.SKILL,
  },
];
