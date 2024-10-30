import { ILayoutBleeds } from "@/types/layouts";

export const getSimilarBleeds = ({
  top,
  left,
  right,
  bottom,
  width,
  height
}: ILayoutBleeds) => {
  const min = Math.min(top, left, right, bottom);
  const size = Math.min(min, 3); // 3mm from each side
  
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