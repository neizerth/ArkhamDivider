import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { <FTName | camelcase>CategoryId } from "./common";

const layout: DividerLayout = {
  id: "<FTName>",
  types: ["scenario", "player", "investigator"],
  categoryId: <FTName | camelcase>CategoryId,
  groupId: "<FTName | camelcase>",
  name: "<FTName | capitalcase>",
  orientation: "horizontal",
  color: true,
  size: createSize(89, 76),
  printSize: {
    300: {
      size: createSize(89, 76),
      bleedSize: createSize(96, 83),
    },
  },
  bleed: 3,
  sleeves: [],
  iconParams: ["icon"],
}

export const <FTName | camelcase>Layouts: DividerLayout[] = [layout]