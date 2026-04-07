import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { FFGCredits } from "@/shared/config";
import { <FTName | camelcase>CategoryId } from "./common";
import { <FTName | camelcase>Layouts } from "./layouts";

export const <FTName | camelcase>Category: DividerCategory = createDividerCategory({
  id: <FTName | camelcase>CategoryId,
  type: "divider",
  name: "divider.<FTName>.name",
  image: "/images/divider/render/<FTName>.avif",
  layouts: <FTName | camelcase>Layouts,
  authors: [FFGCredits],
})