import { DividerProps } from '../../common/Divider/Divider';
import { isChallenge, isSideContent } from '@/shared/store/features/stories/criteria';

const campaigns: Record<string, number> = {
  core: 218,
  dwl: 114,
  ptc: 267,
  tfa: 330,
  tcu: 316,
  tde: 252,
  tic: 205,
  eoe: 210,
  tsk: 0,
  fhv: 42,
  tdc: 94,

  empty: 37,
  challenge: 23,
  standalone: Infinity, // Серый цвет - hue не определен, hue-rotate не применяется
};

const standalone: Record<string, number> = {
  zbh: 35,
  coh: 59,
  cotr: 157,
  fof: 133,
  guardians: 41,
  mtt: 200,
  hotel: 3,
  blob: 79,
  lol: 253,
  the_midwinter_gala: 24,
  wog: 203,
};

const factions: Record<string, number> = {
  guardian: 214,
  seeker: 37,
  rogue: 110,
  neutral: 59,
  mystic: 264,
  survivor: 359,
  multiclass: 49,
};

export const getHeaderFilter = (props: DividerProps) => {
  const hueRotation = getHueRotation(props);

  if (hueRotation === Infinity) {
    return 'grayscale(1)';
  }

  return `hue-rotate(${hueRotation}deg)`;
};

const getHueRotation = (props: DividerProps): number => {
  const { story, faction } = props;

  if (story) {
    const code = story.return_to_code || story.code;
    const campaignRotation = campaigns[code];

    if (campaignRotation !== undefined) {
      return campaignRotation;
    }

    const standaloneRotation = standalone[code];
    if (standaloneRotation !== undefined) {
      return standaloneRotation;
    }

    if (isChallenge(story)) {
      return campaigns.challenge;
    }

    if (isSideContent(story)) {
      return campaigns.standalone;
    }
  }

  if (faction) {
    return factions[faction] ?? factions.neutral;
  }

  return Infinity;
};
