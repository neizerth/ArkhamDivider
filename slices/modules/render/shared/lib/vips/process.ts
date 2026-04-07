import { mergeDeepRight } from "ramda";
import type Vips from "wasm-vips";
import type { Image } from "wasm-vips";
import { mm2px } from "@/modules/print/shared/lib";
import type { DPI } from "@/modules/print/shared/model";
import type {
	Colorspace,
	ICCProfile,
	ICCTransformOptions,
	ImageFormat,
	VipsImageFormatOptions,
} from "../../model";
import { loadICCProfile, setJPEGResolution } from "../logic";
import { getVips } from "./getVips";

export const setICCProfile = async ({
	image,
	iccProfile,
	transformOptions = {
		embedded: true,
		intent: 1,
	},
}: {
	image: Image;
	iccProfile: ICCProfile;
	transformOptions?: ICCTransformOptions;
}) => {
	await loadICCProfile(iccProfile);
	return image.iccTransform(iccProfile, transformOptions);
};

export const stripICCProfile = ({
	image,
	options,
}: {
	image: Image;
	options: VipsImageFormatOptions;
}) => {
	const contents = writeVipsBuffer({
		image,
		options: mergeDeepRight(options, {
			writeOptions: { strip: true },
		}),
	});

	return newImageFromBuffer(contents);
};

export const setColorspace = (image: Image, colourspace: Colorspace) => {
	return image.colourspace(colourspace);
};

export const setImageResolution = (image: Image, dpi: DPI) => {
	image.setInt("resolution-unit", 2);
	image.setString("exif-ifd0-ResolutionUnit", "2");
	const resPxPerMm = mm2px(1, dpi);
	image.setDouble("xres", resPxPerMm);
	image.setDouble("yres", resPxPerMm);
	image.setArrayInt("exif-ifd0-XResolution", [dpi, 1]);
	image.setArrayInt("exif-ifd0-YResolution", [dpi, 1]);
	return image;
};

export const setImageDPI = ({
	image,
	dpi,
	options,
}: {
	image: Image;
	dpi: DPI;
	options: VipsImageFormatOptions;
}) => {
	const { imageFormat } = options;
	if (imageFormat === "jpeg") {
		const buffer = writeVipsBuffer({
			image,
			options,
		});
		const contents = setJPEGResolution(buffer, dpi);
		return newImageFromBuffer(contents);
	}

	return setImageResolution(image, dpi);
};

export const writeVipsBuffer = ({
	image,
	options,
}: {
	image: Image;
	options: VipsImageFormatOptions;
}) => {
	const { imageFormat, writeOptions } = options;
	const writeExtMap: Record<ImageFormat, string> = {
		jpeg: ".jpg",
		tiff: ".tiff",
		png: ".png",
	};

	const ext = writeExtMap[imageFormat];
	return image.writeToBuffer(ext, writeOptions);
};

export const newImageFromBuffer = async (buffer: Uint8Array) => {
	const vips = await getVips();
	return vips.Image.newFromBuffer(buffer);
};

export const transformVipsStep = async (
	image: Vips.Image,
	callback: (image: Vips.Image) => Promise<Vips.Image> | Vips.Image,
) => {
	const next = await callback(image);
	if (next !== image) {
		image.delete();
		image = next;
	}
	return image;
};
