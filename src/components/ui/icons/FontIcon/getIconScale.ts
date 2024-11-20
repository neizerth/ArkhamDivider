import { IconScale } from "@/types/icons";

export const getIconScale = ({
  scale,
  ratio,
  circled = false
}: {
  scale: IconScale, 
  ratio?: number,
  circled?: boolean,
}) => {
  if (!ratio) {
    return 100;
  }
  if (scale === 'circle') {
    return getCircleScale({
      ratio,
      circled
    });
  }

  return getSquareScale(ratio);
}

export const getSquareScale = (ratio: number) => {
  return ratio > 1 ? 100 / ratio : 100;
}

export const getCircleScale = ({
  ratio,
  circled = false
}: {
  ratio: number,
  circled?: boolean
}) => {
  if (circled) {
    return 90;
  }
  const angle = Math.atan(ratio);
  const height = Math.cos(angle);
  return height * 100;
}