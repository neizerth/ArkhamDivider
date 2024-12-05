export type GetSquareScaleOptions = {
  ratio: number,
  scaleFactor?: {
    common?: number
  }
}

export const getSquareScale = ({
  ratio,
  scaleFactor = {
    common: 1
  }
}: GetSquareScaleOptions) => {
  const scale = ratio > 1 ? 100 / ratio : 100;

  return scale * (scaleFactor.common || 1);
}