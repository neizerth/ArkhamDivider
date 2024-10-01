import { ILayout, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export const common = {
  categoryId: "classic",
  title: "Classic",
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  pageOrientation: PageOrientation.PORTRAIT,
}

export const horizontal = {
  rowSize: 2,
  groupSize: 6,
  width: 88.9,
  height: 76.2,
  bleeds: {
    width: 95,
    height: 82,
    top: 2.2,
    left: 2.8
  }
}

export const vertical = {
  rowSize: 3,
  groupSize: 6,
  height: 100,
  width: 64,
  bleeds: {
    width: 69,
    height: 105,
    top: 2.2,
    left: 3
  }
}

export const classicLayouts: ILayout[] = [
  {
    ...common,
    ...horizontal,
    id: "classic_h",
    title: "Classic",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
    is_default: true,
  },
  {
    ...common,
    ...horizontal,
    id: "classic_h-bw",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...vertical,
    id: "classic_v",
    orientation: LayoutOrientation.VERTICAL,
    color: true,
  },
  {
    ...common,
    ...vertical,
    id: "classic_v-bw",
    orientation: LayoutOrientation.VERTICAL,
    color: false,
  },
] 