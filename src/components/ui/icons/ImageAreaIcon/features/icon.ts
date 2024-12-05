import { IIcon } from "@/types/api"
import { ImageAreaSize } from "../ImageAreaIcon"

export const getIconPosition = () => {

}

export const getIconSize = (options: ImageAreaSize & {
  entry: IIcon
}) => {
  const { entry } = options;

  if ('width' in options) {
    return {
      width: options.width,
      height: options.height,
    }
  }

  const { size } = options;

  if (entry.height > size) {
    return {
      height: entry.height,
      width: entry.width
    }
  }
  const k = size * entry.height;
  const width = entry.width * k;
  
  return {
    height: size,
    width
  }
}