import {
	domToBlob,
	type Options as ModernScreenshotOptions,
} from "modern-screenshot";
import type { Interpretation } from "wasm-vips";
import type { DPI } from "@/modules/print/shared/model";
import type { BoxSize } from "@/shared/model";
import type { ICCProfile, ImageFormat } from "../../model";
import { getVips } from "../getVips";
import { setJpegExifResolution } from "../logic/setJpegExifResolution";
import { setColourspace, setICCProfile, setResolution } from "../vips";
import { getDividerNodeById } from "./getDividerNodeById";

type Colourspace = keyof typeof Interpretation;

type Options = {
	dividerId: string;
	dpi: DPI;
	imageFormat: ImageFormat;
	renderOptions?: ModernScreenshotOptions;
	iccProfile?: ICCProfile;
	colourspace?: Colourspace;
	size?: BoxSize;
	quality?: number;
	stripIccProfile?: boolean;
};

export const renderCMYKDivider = async ({
	dividerId,
	dpi,
	imageFormat,
	renderOptions,
	iccProfile = "cmyk",
	colourspace,
	size,
	quality,
	stripIccProfile = false,
}: Options) => {
	const node = getDividerNodeById(dividerId);
	const scale = dpi / 96;
	const options = {
		...renderOptions,
		scale,
	};

	const blob = await domToBlob(node, options);

	const arrayBuffer = await blob.arrayBuffer();

	const vips = await getVips();
	let image = vips.Image.newFromBuffer(arrayBuffer);

	if (size) {
		const scale = size.width / image.width;
		image = image.resize(scale);
	}

	// JPEG needs 8 bit depth
	if (imageFormat === "jpeg" && image.format !== "uchar") {
		image = image.cast("uchar");
	}

	if (!stripIccProfile) {
		image = await setICCProfile(image, iccProfile);
	}

	// Convert to color space
	if (colourspace) {
		image = setColourspace(image, colourspace);
	}

	const ext = `.${imageFormat}`;

	const writeOptions = {
		// keep: "all",
		...(quality ? { Q: quality } : {}),
	};

	// Write to buffer without icc profile
	let contents = image.writeToBuffer(ext, {
		...writeOptions,
		...(stripIccProfile ? { strip: true } : {}),
	});

	// Delete image to free memory
	image.delete();

	if (!stripIccProfile) {
		return contents;
	}

	image = vips.Image.newFromBuffer(contents);

	image = await setICCProfile(image, iccProfile);

	if (imageFormat !== "jpeg") {
		image = setResolution(image, dpi);
	}

	contents = image.writeToBuffer(ext, {
		...writeOptions,
	});

	image.delete();

	if (imageFormat === "jpeg") {
		return setJpegExifResolution(contents, dpi);
	}
	return contents;
};
