import { IDividerType } from "@/types/dividers";
import { ILayout } from "@/types/layouts";

export const layouts: ILayout[] = [
  {
    id: "classic_color_horizontal",
    rowSize: 2,
    groupSize: 6,
    width: 88.9,
    height: 76.2,
    title: "Classic",
    type: IDividerType.HORIZONTAL,
    image: "/images/dividers/horizontal/common/classic.png",
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
    type: IDividerType.HORIZONTAL,
    color: false,
    image: "/images/dividers/horizontal/common/classic_bw.png"
  },
  {
    id: "classic_color_vertical",
    rowSize: 3,
    groupSize: 6,
    width: 88.9,
    height: 76.2,
    title: "Classic 76x89",
    type: IDividerType.VERTICAL,
    color: true,
    image: "/images/dividers/vertical/common/classic.png"
  },
  {
    id: "classic_bw_vertical",
    rowSize: 3,
    groupSize: 6,
    height: 88.9,
    width: 76.2,
    title: "Classic 76x89",
    type: IDividerType.VERTICAL,
    color: false,
    image: "/images/dividers/vertical/common/classic_bw.png"
  },
  {
    id: "classic_60_color_vertical",
    rowSize: 3,
    groupSize: 6,
    height: 100,
    width: 60,
    title: "Classic 60x100",
    type: IDividerType.VERTICAL,
    color: true,
    image: "/images/dividers/vertical/common/classic_60.png"
  },
  {
    id: "classic_60_bw_vertical",
    rowSize: 3,
    groupSize: 6,
    height: 100,
    width: 60,
    title: "Classic 60x100",
    type: IDividerType.VERTICAL,
    color: false,
    image: "/images/dividers/vertical/common/classic_60_bw.png"
  }
]