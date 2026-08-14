import { selectIsRendering } from "@/modules/render/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { DEFAULT_CORNER_RADIUS } from "../../config";
import { selectShowCornerRadius } from "../store";

export const useCornerRadius = () => {
	const isRendering = useAppSelector(selectIsRendering);
	const cornerRadiusEnabled = useAppSelector(selectShowCornerRadius);

	if (cornerRadiusEnabled && !isRendering) {
		return DEFAULT_CORNER_RADIUS;
	}
	return 0;
};
