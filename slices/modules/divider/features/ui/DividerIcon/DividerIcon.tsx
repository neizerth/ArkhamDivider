import {
	IconCorrection,
	type IconCorrectionProps,
} from "@/modules/core/icon/entities/ui";
import {
	selectDividerRenderId,
	selectHideIconNodes,
} from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerIconProps = IconCorrectionProps & {
	dividerId?: string;
	visible?: boolean;
};

export function DividerIcon({
	dividerId,
	visible = false,
	...props
}: DividerIconProps) {
	const hide = useAppSelector(selectHideIconNodes);
	const renderId = useAppSelector(selectDividerRenderId);

	const shouldHide = !visible && hide && renderId === dividerId;
	if (shouldHide) {
		return null;
	}
	return <IconCorrection {...props} />;
}
