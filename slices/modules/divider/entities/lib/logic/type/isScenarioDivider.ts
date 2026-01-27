import type {
	Divider,
	DividerType,
	ScenarioDividerData,
} from "@/modules/divider/shared/model";

export const isScenarioDivider = (
	divider: Divider,
): divider is Divider & ScenarioDividerData => {
	const types: DividerType[] = ["scenario", "encounter", "campaign"];
	return types.includes(divider.type);
};
