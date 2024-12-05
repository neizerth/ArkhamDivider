import { IconScaleFactor } from "@/types/icons";

export type GetCircleScaleOptions = {
  ratio: number,
  circled?: boolean,
  scaleFactor?: IconScaleFactor
}

export const getCircleScale = ({
  ratio,
  scaleFactor = {
    common: 1,
    circled: 1
  },
  circled = false
}: GetCircleScaleOptions) => {
  if (circled) {
    return 100 * (scaleFactor?.circled || 1);
  }
  const angle = Math.atan(ratio);
  const height = Math.cos(angle);
  const commonScale = 100 * (scaleFactor?.common || 1);
  return Math.min(height * commonScale, commonScale);
}