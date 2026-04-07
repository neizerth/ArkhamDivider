import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerType } from "@/modules/divider/shared/model";

type Options = {
	type: DividerType;
	iconId: string;
	icon?: Icon | null;
	campaignIcon?: string;
};
export const getSarnetskyDefaultDividerIcon = ({
	type,
	iconId,
	icon,
	campaignIcon,
}: Options) => {
	if (type === "campaign" || iconId === "encounter-right") {
		return campaignIcon;
	}
	return icon;
};
