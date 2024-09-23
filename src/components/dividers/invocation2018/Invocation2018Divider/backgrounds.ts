import mystic from './images/mystic.png';
import neutral from './images/neutral.png';
import guardian from './images/guardian.png';
import rogue from './images/rogue.png';
import survivor from './images/survivor.png';
import seeker from './images/seeker.png';

import mysticXP from './images/mystic_xp.png';
import neutralXP from './images/neutral_xp.png';
import guardianXP from './images/guardian_xp.png';
import rogueXP from './images/rogue_xp.png';
import survivorXP from './images/survivor_xp.png';
import seekerXP from './images/seeker_xp.png';


export const baseBackgrounds = [
  {
    faction: 'mystic',
    src: mystic,
    xp: false
  },
  {
    faction: 'neutral',
    src: neutral,
    xp: false
  },
  {
    faction: 'guardian',
    src: guardian,
    xp: false
  },
  {
    faction: 'rogue',
    src: rogue,
    xp: false
  },
  {
    faction: 'survivor',
    src: survivor,
    xp: false
  },
  {
    faction: 'seeker',
    src: seeker,
    xp: false
  }
]

export const xpBackgrounds = [
  {
    faction: 'mystic',
    src: mysticXP,
    xp: true
  },
  {
    faction: 'neutral',
    src: neutralXP,
    xp: true
  },
  {
    faction: 'guardian',
    src: guardianXP,
    xp: true
  },
  {
    faction: 'rogue',
    src: rogueXP,
    xp: true
  },
  {
    faction: 'survivor',
    src: survivorXP,
    xp: true
  },
  {
    faction: 'seeker',
    src: seekerXP,
    xp: true
  }
]

export const backgrounds = [
  ...baseBackgrounds,
  ...xpBackgrounds
];

// export const experienceBackgrounds = 