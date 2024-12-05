import { ILayoutBleed } from "@/types/layouts"
import { toPrintSize } from "@/util/units"

export type GetAreaSizeOptions = {
  bleed: ILayoutBleed
  offsetX: number
  offsetY: number
};

export const getAreaSize = ({
  bleed,
  offsetX,
  offsetY
}: GetAreaSizeOptions) => {
  const width = Math.ceil(toPrintSize(bleed.width)) + offsetX * 2;
  const height = Math.ceil(toPrintSize(bleed.height)) + offsetY * 2;

  return { width, height };
}

export const getEntryArea = (options: GetAreaSizeOptions & {
  scale: number
}) => {
  const { scale } = options;

  const area = getAreaSize(options);

  return {
    width: Math.ceil(area.width * scale),
    height: Math.ceil(area.height * scale)
  };
}
