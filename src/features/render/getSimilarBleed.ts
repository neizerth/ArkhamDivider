import { ILayoutBleed } from "@/types/layouts";
import { MIN_BLEED_SIZE } from "@/util/units";

export const getSimilarBleed = ({
  top,
  left,
  right,
  bottom,
  width,
  height
}: ILayoutBleed) => {
  const min = Math.min(top, left, right, bottom);
  const size = Math.min(min, MIN_BLEED_SIZE); // 3mm from each side
  
  const crop = {
    size,
    top: top - size,
    left: left - size,
    right: right - size,
    bottom: bottom - size,
  }

  return {
    ...crop,
    width: width - crop.left - crop.right,
    height: height - crop.top - crop.bottom
  }
}