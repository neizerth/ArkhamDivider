import type Vips from "wasm-vips";
import type { DPI } from "@/modules/print/shared/model";
import type { VipsTransform } from "../../model";
import { applyVipsTransform } from "./applyVipsTransform";
import { transformVipsStep as step } from "./process";

type Options = {
	image: Vips.Image;
	dpi: DPI;
	transforms: VipsTransform[];
};

export const applyMultipleVipsTransforms = async ({
	image,
	dpi,
	transforms,
}: Options) => {
	for (const transform of transforms) {
		image = await step(image, async (image) => {
			return applyVipsTransform({
				image,
				dpi,
				transform,
			});
		});
	}

	return image;
};
