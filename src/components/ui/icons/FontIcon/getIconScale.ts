import { IconScaleFactor, IconScaleType } from '@/shared/types/icons';

export const getIconScale = ({
  scaleType = 'square',
  scaleFactor = {
    all: 1,
    circled: 1,
    regular: 1,
  },
  ratio,
  circled = false,
}: {
  scaleType?: IconScaleType;
  ratio?: number;
  circled?: boolean;
  scaleFactor?: IconScaleFactor;
}) => {
  if (!ratio) {
    return 100;
  }
  if (scaleType === 'circle') {
    return getCircleScale({
      ratio,
      circled,
      scaleFactor,
    });
  }

  return getSquareScale({
    ratio,
    scaleFactor,
  });
};

export const getSquareScale = ({
  ratio,
  scaleFactor,
}: {
  ratio: number;
  scaleFactor: IconScaleFactor;
}) => {
  const scale = scaleFactor.regular || scaleFactor.all || 1;
  const fullSize = 100 * scale;
  return ratio > 1 ? fullSize / ratio : fullSize;
};

export const getCircleScale = ({
  ratio,
  scaleFactor,
  circled = false,
}: {
  ratio: number;
  circled?: boolean;
  scaleFactor: IconScaleFactor;
}) => {
  if (circled) {
    const scale = scaleFactor.circled || scaleFactor.all || 1;
    return 100 * scale;
  }

  const scale = scaleFactor.regular || scaleFactor.all || 1;
  const angle = Math.atan(ratio);
  const height = Math.cos(angle);
  return 100 * Math.min(height, 1) * scale;
};
