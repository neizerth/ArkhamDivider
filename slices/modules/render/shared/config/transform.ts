import type {
	VipsJPEGWriteOptions,
	VipsPNGWriteOptions,
	VipsTIFFWriteOptions,
	VipsTransform,
	VipsTransformRecord,
	VipsWriteOptionsRecord,
} from "../model";

export const defaultJPEGWriteOptions: VipsJPEGWriteOptions = {
	Q: 100,
};

export const defaultTIFFWriteOptions: VipsTIFFWriteOptions = {
	compression: "lzw",
	predictor: "horizontal",
};

export const defaultPNGWriteOptions: VipsPNGWriteOptions = {};

const defaultJPEGRenderTransforms: VipsTransform[] = [
	{
		type: "colorspace",
		value: "srgb",
	},
	{
		type: "colorspace",
		value: "lab",
	},
	{
		type: "strip-icc",
		options: {
			imageFormat: "jpeg",
			writeOptions: defaultJPEGWriteOptions,
		},
	},
	{
		type: "cast",
		value: "uchar",
	},
	{
		type: "strip-icc",
		options: {
			imageFormat: "jpeg",
			writeOptions: defaultJPEGWriteOptions,
		},
	},
	{
		type: "set-icc",
		icc: "USWebCoatedSWOP.icc",
		transformOptions: {
			intent: 1,
		},
	},
	{
		type: "set-dpi",
		options: {
			imageFormat: "jpeg",
			writeOptions: defaultJPEGWriteOptions,
		},
	},
];

export const defaultTIFFRenderTransforms: VipsTransform[] = [
	{
		type: "colorspace",
		value: "srgb",
	},
	{
		type: "cast",
		value: "uchar",
	},
	{
		type: "set-icc",
		icc: "USWebCoatedSWOP.icc",
		transformOptions: {
			intent: 1,
		},
	},
];

export const defaultPNGRenderTransforms: VipsTransform[] = [
	{
		type: "colorspace",
		value: "srgb",
	},
];

export const defaultVipsTransformRecord: VipsTransformRecord = {
	jpeg: defaultJPEGRenderTransforms,
	tiff: defaultTIFFRenderTransforms,
	png: defaultPNGRenderTransforms,
};

export const defaultWriteOptionsRecord: VipsWriteOptionsRecord = {
	jpeg: defaultJPEGWriteOptions,
	tiff: defaultTIFFWriteOptions,
	png: defaultPNGWriteOptions,
};
