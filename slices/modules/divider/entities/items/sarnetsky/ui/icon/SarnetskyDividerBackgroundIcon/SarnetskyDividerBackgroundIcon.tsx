import type { BoxProps } from "@mui/material";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import type { SarnetskyDividerProps } from "../../../model";

type SarnetskyDividerBackgroundIconProps = BoxProps & {
	divider: SarnetskyDividerProps;
};
export function SarnetskyDividerBackgroundIcon({
	divider,
	...props
}: SarnetskyDividerBackgroundIconProps) {
	const { id, icon } = divider;
	const getDividerIcon = useDividerIcon({
		dividerId: id,
	});

	const [backgroundIcon, selectBackgroundIcon] = getDividerIcon({
		param: "background",
		defaultIcon: icon,
	});

	return (
		<Icon
			{...props}
			dividerId={id}
			icon={backgroundIcon}
			onClick={selectBackgroundIcon}
			disableCorrection
		/>
	);
}
