import { IconScaleType } from "@/types/icons";

export const getIconScale = ({
  scale,
  scaleBy,
  ratio,
  circled = false
}: {
  scale: IconScaleType, 
  ratio?: number,
  circled?: boolean,
  scaleFactor?: number
}) => {
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

  return getSquareScale(ratio);
}

export const getSquareScale = (ratio: number) => {
  return ratio > 1 ? 100 / ratio : 100;
}

export const getCircleScale = ({
  ratio,
  scaleFactor = 1,
  circled = false
}: {
  ratio: number
  circled?: boolean
  scaleFactor?: number
}) => {
  if (circled) {
    return 100;
  }
  const angle = Math.atan(ratio);
  const height = Math.cos(angle);
  return Math.min(height * scaleFactor * 100, 95);
}