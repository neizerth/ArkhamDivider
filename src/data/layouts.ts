import { BASE_PATH } from "@/constants/web";
import { DividerType } from "@/types/dividers";
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
    type: DividerType.HORIZONTAL,
    orientation: PageOrientation.PORTRAIT,
    image: BASE_PATH + "/images/dividers/horizontal/common/classic.png",
    color: true,
    is_default: true
  },
  {
    id: "classic_bw_horizontal",
    rowSize: 2,
    groupSize: 6,
    width: 88.9,
    height: 76.2,
    title: "Classic (B&W)",
    type: DividerType.HORIZONTAL,
    orientation: PageOrientation.PORTRAIT,
    color: false,
    image: BASE_PATH + "/images/dividers/horizontal/common/classic_bw.png"
  },
  {
    id: "classic_color_vertical",
    rowSize: 3,
    groupSize: 6,
    width: 88.9,
    height: 76.2,
    title: "Classic 76x89",
    type: DividerType.VERTICAL,
    orientation: PageOrientation.LANDSCAPE,
    color: true,
    image: BASE_PATH + "/images/dividers/vertical/common/classic.png"
  },
  {
    id: "classic_bw_vertical",
    rowSize: 3,
    groupSize: 6,
    height: 88.9,
    width: 76.2,
    title: "Classic 76x89",
    type: DividerType.VERTICAL,
    orientation: PageOrientation.LANDSCAPE,
    color: false,
    image: BASE_PATH + "/images/dividers/vertical/common/classic_bw.png"
  },
  {
    id: "classic_60_color_vertical",
    rowSize: 3,
    groupSize: 6,
    height: 100,
    width: 60,
    title: "Classic 60x100",
    type: DividerType.VERTICAL,
    orientation: PageOrientation.PORTRAIT,
    color: true,
    image: BASE_PATH + "/images/dividers/vertical/common/classic_60.png"
  },
  {
    id: "classic_60_bw_vertical",
    rowSize: 3,
    groupSize: 6,
    height: 100,
    width: 60,
    title: "Classic 60x100",
    type: DividerType.VERTICAL,
    orientation: PageOrientation.PORTRAIT,
    color: false,
    image: BASE_PATH + "/images/dividers/vertical/common/classic_60_bw.png"
  }
]