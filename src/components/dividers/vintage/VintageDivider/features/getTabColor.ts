import { isStandalone } from "@/store/features/stories/criteria";
import { IDivider } from "@/types/dividers";
import { Mapping } from "@/types/util";

export const storyColors: Mapping = {
  'core': '#554820',
  'dwl': '#1d2c1e',
  'ptc': '#421843',
  'tfa': '#133847',
  'tcu': '#66362d',
  'tde': '#645165',
  'tic': '#2b3a4e',
  'eoe': '#4c737b',
  'tsk': '#4c737b',

  'fhv': '#f36f32',
  'tdc': '#5C672B',
  'standalone': '#3d3820'
}

export const playerColors: Mapping = {
  'survivor': '#57101d',
  'mystic': '#41295f',
  'neutral': '#3c3d3c',
  'guardian': '#1a2e54',
  'rogue': '#083d20',
  'seeker': '#bd572e',
  'multiclass': '#b19229'
}

export const DEFAULT_COLOR = '#B2AAA2';


export const getTabColor = ({
  story,
  faction
}: IDivider) => {
  if (faction) {
    return playerColors[faction] || DEFAULT_COLOR;
  }
  if (story) {
    if (isStandalone(story)) {
      return storyColors.standalone;
    }
    return storyColors[story.return_to_code || story.code] || DEFAULT_COLOR;
  }

  return DEFAULT_COLOR;
}