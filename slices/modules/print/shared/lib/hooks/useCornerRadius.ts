import { selectDividerRenderId } from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { DEFAULT_CORNER_RADIUS } from "../../config";
import { selectShowCornerRadius } from "../store";

export const useCornerRadius = () => {
	const renderId = useAppSelector(selectDividerRenderId);
	const cornerRadiusEnabled = useAppSelector(selectShowCornerRadius);

	if (cornerRadiusEnabled && !renderId) {
		return DEFAULT_CORNER_RADIUS;
	}
	return 0;
};
