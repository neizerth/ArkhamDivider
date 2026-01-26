import type {
	Divider,
	ScenarioDividerData,
} from "@/modules/divider/shared/model";

export const isScenarioDivider = (
	divider: Divider,
): divider is Divider & ScenarioDividerData => {
	return ["scenario", "encounter"].includes(divider.type);
};
