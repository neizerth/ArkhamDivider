import type Vips from "wasm-vips";
import type { DPI } from "@/modules/print/shared/model";
import type { VipsTransform } from "../../model";
import {
	setColorspace,
	setICCProfile,
	setImageDPI,
	stripICCProfile,
} from "./process";

type Options = {
	image: Vips.Image;
	dpi: DPI;
	transform: VipsTransform;
};

export const applyVipsTransform = async ({
	image,
	dpi,
	transform,
}: Options) => {
	switch (transform.type) {
		case "colorspace": {
			return setColorspace(image, transform.value);
		}
		case "set-icc": {
			return await setICCProfile({
				image,
				iccProfile: transform.icc,
				transformOptions: transform.transformOptions,
			});
		}
		case "cast": {
			if (image.format === transform.value) {
				return image;
			}
			return image.cast(transform.value);
		}
		case "strip-icc": {
			return await stripICCProfile({
				image,
				options: transform.options,
			});
		}
		case "set-dpi": {
			return await setImageDPI({
				image,
				dpi,
				options: transform.options,
			});
		}
	}
};
