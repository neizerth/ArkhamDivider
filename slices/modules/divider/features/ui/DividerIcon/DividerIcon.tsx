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
	dividerId: string;
};

export function DividerIcon({ dividerId, ...props }: DividerIconProps) {
	const hide = useAppSelector(selectHideIconNodes);
	const renderId = useAppSelector(selectDividerRenderId);
	if (hide && renderId === dividerId) {
		return null;
	}
	return <IconCorrection {...props} />;
}
