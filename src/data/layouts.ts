import { BASE_PATH } from "@/constants/web";
import { LayoutOrientation, LayoutType } from "@/types/layouts";
import { ILayout } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export const layouts: ILayout[] = [
  {
    id: "classic_color_horizontal",
    rowSize: 2,
    groupSize: 6,
    width: 88.9,
    height: 76.2,
    title: "Classic",
    types: [LayoutType.SCENARIO],
    orientation: LayoutOrientation.HORIZONTAL,
    pageOrientation: PageOrientation.PORTRAIT,
    image: BASE_PATH + "/images/dividers/horizontal/common/classic.png",
    color: true,
    is_default: true,
    tags: ['classic', 'color', 'horizontal']
  },
  {
    id: "classic_bw_horizontal",
    rowSize: 2,
    groupSize: 6,
    width: 88.9,
    height: 76.2,
    title: "Classic (B&W)",
    types: [LayoutType.SCENARIO],
    orientation: LayoutOrientation.HORIZONTAL,
    pageOrientation: PageOrientation.PORTRAIT,
    color: false,
    image: BASE_PATH + "/images/dividers/horizontal/common/classic_bw.png",
    tags: ['classic', 'bw', 'vertical']
  },
  {
    id: "classic_60_color_vertical",
    rowSize: 3,
    groupSize: 6,
    height: 100,
    width: 60,
    title: "Classic",
    types: [LayoutType.SCENARIO],
    orientation: LayoutOrientation.VERTICAL,
    pageOrientation: PageOrientation.PORTRAIT,
    color: true,
    image: BASE_PATH + "/images/dividers/vertical/common/classic_60.png",
    tags: ['classic', 'color', 'horizontal']
  },
  {
    id: "classic_60_bw_vertical",
    rowSize: 3,
    groupSize: 6,
    height: 100,
    width: 60,
    title: "Classic",
    types: [LayoutType.SCENARIO],
    orientation: LayoutOrientation.VERTICAL,
    pageOrientation: PageOrientation.PORTRAIT,
    color: false,
    image: BASE_PATH + "/images/dividers/vertical/common/classic_60_bw.png",
    tags: ['classic', 'bw', 'vertical']
  }
]