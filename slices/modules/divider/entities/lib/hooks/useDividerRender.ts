import {
	selectDividerRenderId,
	selectRenderType,
} from "@/modules/render/shared/lib";
import type { RenderType } from "@/modules/render/shared/model";
import { useAppSelector } from "@/shared/lib";

type Options = {
	dividerId: string;
	renderType?: RenderType;
};

export const useDividerRender = (options: Options) => {
	const renderId = useAppSelector(selectDividerRenderId);
	const renderType = useAppSelector(selectRenderType);
	const { dividerId } = options;

	if (!options.renderType) {
		return renderId === dividerId;
	}

	return renderId === dividerId && renderType === options.renderType;
};
