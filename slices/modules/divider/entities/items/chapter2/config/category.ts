import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { FFGCredits } from "@/shared/config";
import { chapter2CategoryId } from "./common";
import { chapter2Layouts } from "./layouts";

export const chapter2Category: DividerCategory = createDividerCategory({
	id: chapter2CategoryId,
	type: "divider",
	name: "divider.chapter2.name",
	image: "/images/divider/render/chapter2.avif",
	layouts: chapter2Layouts,
	authors: [FFGCredits],
});
