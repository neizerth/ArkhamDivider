import { IconScale, IconScaleFactor } from "@/types/icons";
import { getCircleScale } from "./getCircleScale";
import { getSquareScale } from "./getSqureScale";

export type ScaleOptions = {
  scale: IconScale,
  ratio?: number,
  circled?: boolean,
  scaleFactor?: IconScaleFactor
}

export const getIconScale = ({
  scale,
  scaleFactor,
  ratio,
  circled = false
}: ScaleOptions) => {
  if (!ratio) {
    return 100;
  }
  if (scale === 'circle') {
    return getCircleScale({
      ratio,
      circled,
      scaleFactor
    });
  }

  return getSquareScale({
    ratio,
    scaleFactor
  });
}