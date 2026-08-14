import {
	selectIsDividerRendering,
	selectRenderType,
} from "@/modules/render/shared/lib";
import type { RenderType } from "@/modules/render/shared/model";
import { useAppSelector } from "@/shared/lib";

type Options = {
	dividerId: string;
	renderType?: RenderType;
};

export const useDividerRender = (options: Options) => {
	const { dividerId } = options;
	const isRendering = useAppSelector(selectIsDividerRendering(dividerId));
	const renderType = useAppSelector(selectRenderType);

	if (!options.renderType) {
		return isRendering;
	}

	return isRendering && renderType === options.renderType;
};
