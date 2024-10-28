import { isChallenge, isSideContent } from "@/store/features/stories/criteria";
import { IDivider } from "@/types/dividers";
import { IRGBAColor } from "@/types/ui";
import { Mapping } from "@/types/util";
import { rgba256 } from "@/util/colors";

export const customStripColor: Mapping<IRGBAColor> = {
  'zaw': { r: 0.6509804, g: 0.48235294, b: 0.39607844, a: 1 },
  'zcf': { r: 0.6509804, g: 0.48235294, b: 0.39607844, a: 1 },
  'zdm': { r: 0.6509804, g: 0.48235294, b: 0.39607844, a: 1 }
}

export const standaloneStripColor: Mapping<IRGBAColor> = {
  'zbh': { r: 0.5943396, g: 0.46269932, b: 0.30558026, a: 1 },
  'coh': { r: 0.9150943, g: 0.87624604, b: 0.25467247, a: 1 },
  'cotr': { r: 0.5724902, g: 0.7830189, b: 0.6943752, a: 1 },
  'fof': { r: 0.30704877, g: 0.5660378, b: 0.35409427, a: 1 },
  'guardians': { r: 0.8584906, g: 0.6763332, b: 0.36040404, a: 1 },
  'mtt': { r: 0.15566039, g: 0.7525314, b: 1, a: 1 },
  'hotel': { r: 0.8396226, g: 0.22574759, b: 0.22574759, a: 1 },
  'blob': { r: 0.57508296, g: 0.7264151, b: 0.16789784, a: 1 },
  'lol': { r: 0.58348686, g: 0.54369885, b: 0.7735849, a: 1 },
  'the_midwinter_gala': { r: 0.8773585, g: 0.4399776, b: 0.19450872, a: 1 },
  'wog': { r: 0.45412073, g: 0.55796915, b: 0.6132076, a: 1 }
}

export const campaignStripColor: Mapping<IRGBAColor> = { 
  'core': { r: 0.36078432, g: 0.4, b: 0.5568628, a: 1 },
  'eoe':  { r: 0.2509804, g: 0.62352943, b: 0.7254902, a: 1 },
  'tcu': { r: 0.32941177, g: 0.25490198, b: 0.36862746, a: 1 },
  'tde': { r: 0.2784314, g: 0.25882354, b: 0.34901962, a: 1 },
  'tdc': { r: 0.39607844, g: 0.44313726, b: 0.26666668, a: 1 },
  'dwl': { r: 0.3019608, g: 0.45490196, b: 0.4, a: 1 },
  'fhv': { r: 0.8301887, g: 0.45730525, b: 0.09789959, a: 1 },
  'tfa': { r: 0.58431375, g: 0.22352941, b: 0.3372549, a: 1 },
  'tic': { r: 0.20784314, g: 0.4627451, b: 0.42352942, a: 1 },
  'ptc': { r: 0.42352942, g: 0.33333334, b: 0.5647059, a: 1 },
  'tsk': { r: 0.6132076, g: 0.12437701, b: 0.14499569, a: 1 },
}

export const stripColor: Mapping<IRGBAColor> = {
  'empty': { r: 0.90588236, g: 0.77254903, b: 0.5882353, a: 1 },
  'challenge': { r: 0.6509804, g: 0.48235294, b: 0.39607844, a: 1 },
  'standalone': { r: 0.3490566, g: 0.3490566, b: 0.3490566, a: 1 },
  'custom': { r: 0, g: 0, b: 0, a: 1 },
  ...campaignStripColor,
  ...standaloneStripColor,
  ...customStripColor
}

export const getStripColor = (divider: IDivider) => {
  const color = getChannelStripColor(divider) as IRGBAColor;
  return rgba256(color);
}

export const getSecondaryStripColor = (divider: IDivider) => {
  const color = getChannelSecondaryStripColor(divider);
  return color && rgba256(color);
}

export const getChannelSecondaryStripColor = ({
  story
}: IDivider) => {
  return void story;
  // if (!story?.custom_content) {
  //   return;
  // }
  // return stripColor['custom'];
}

export const getChannelStripColor = ({
  story
}: IDivider) => {
  if (!story) {
    return stripColor.empty;
  }

  const { code, return_to_code } = story;

  if (stripColor[code]) {
    return stripColor[code];
  }

  if (return_to_code && stripColor[return_to_code]) {
    return stripColor[return_to_code];
  }

  if (isChallenge(story)) {
    return stripColor.challenge;
  }

  if (isSideContent(story)) {
    return stripColor.standalone;
  }

  return stripColor.empty;
}