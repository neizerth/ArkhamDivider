import type {
	Divider,
	DividerType,
	ScenarioDividerData,
} from "@/modules/divider/shared/model";

export const isScenarioDivider = <T = void>(
	divider: Divider<T>,
): divider is Divider<T> & ScenarioDividerData => {
	const types: DividerType[] = ["scenario", "encounter", "campaign"];
	return types.includes(divider.type);
};
