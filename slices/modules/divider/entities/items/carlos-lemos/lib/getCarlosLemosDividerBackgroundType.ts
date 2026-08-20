import type { DividerType } from "@/modules/divider/shared/model";

export function getCarlosLemosDividerBackgroundType(
	type: DividerType,
): "scenario" | "encounter" {
	if (type === "encounter") {
		return "encounter";
	}

	return "scenario";
}
