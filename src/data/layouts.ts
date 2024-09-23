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
    color: true,
    is_default: true,
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
  }
]