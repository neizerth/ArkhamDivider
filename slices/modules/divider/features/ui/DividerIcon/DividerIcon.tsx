import {
	IconCorrection,
	type IconCorrectionProps,
} from "@/modules/core/icon/entities/ui";
import {
	selectHideIconNodes,
	selectIsDividerRendering,
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
	const isRendering = useAppSelector(selectIsDividerRendering(dividerId));

	const shouldHide = !visible && hide && isRendering;
	if (shouldHide) {
		return null;
	}
	return <IconCorrection {...props} />;
}
