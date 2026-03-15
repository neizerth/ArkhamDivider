import { createDividerCategory } from "@/modules/divider/shared/lib/logic/createDividerCategory";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { FFGCredits } from "@/shared/config";
import { invocation2018CategoryId } from "./common";
// import { classicCategoryId } from "./common";
import { invocation2018Layouts } from "./layouts";

export const invocation2018Category: DividerCategory = createDividerCategory({
	id: invocation2018CategoryId,
	type: "divider",
	authors: [FFGCredits],
	name: "Invocation 2018",
	image: "/images/divider/render/invocation-2018.avif",
	layouts: invocation2018Layouts,
});
