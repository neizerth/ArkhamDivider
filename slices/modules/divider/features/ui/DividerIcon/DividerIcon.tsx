import {
	IconCorrection,
	type IconCorrectionProps,
} from "@/modules/core/icon/entities/ui";
import { selectHideIconNodes } from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerIconProps = IconCorrectionProps;

export function DividerIcon(props: DividerIconProps) {
	const hide = useAppSelector(selectHideIconNodes);
	if (hide) {
		return null;
	}
	return <IconCorrection {...props} />;
}
