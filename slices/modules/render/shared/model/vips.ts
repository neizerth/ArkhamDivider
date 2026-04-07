import type Vips from "wasm-vips";
import type { Colorspace, ICCProfile, ImageFormat } from "./render";

export type VipsCastFormat = keyof typeof Vips.BandFormat;

export type VipsTransform =
	| {
			type: "colorspace";
			value: Colorspace;
	  }
	| {
			type: "set-icc";
			icc: ICCProfile;
			transformOptions?: ICCTransformOptions;
	  }
	| {
			type: "cast";
			value: VipsCastFormat;
	  }
	| {
			type: "strip-icc";
			options: VipsImageFormatOptions;
	  }
	| {
			type: "set-dpi";
			options: VipsImageFormatOptions;
	  };

export type VipsTransformRecord = Record<ImageFormat, VipsTransform[]>;

export type ICCTransformOptions = NonNullable<
	Parameters<Vips.Image["iccTransform"]>[1]
>;

export type VipsJPEGWriteOptions = VipsWriteOptions & {
	Q?: number;
};

export type VipsTIFFWriteOptions = VipsWriteOptions & {
	compression?: keyof typeof Vips.ForeignTiffCompression;
	predictor?: keyof typeof Vips.ForeignTiffPredictor;
};

export type VipsPNGWriteOptions = VipsWriteOptions;

export type VipsWriteOptionsRecord = {
	jpeg: VipsJPEGWriteOptions;
	tiff: VipsTIFFWriteOptions;
	png: VipsPNGWriteOptions;
};

export type VipsImageFormatOptions =
	| {
			imageFormat: "jpeg";
			writeOptions?: VipsJPEGWriteOptions;
	  }
	| {
			imageFormat: "tiff";
			writeOptions?: VipsTIFFWriteOptions;
	  }
	| {
			imageFormat: "png";
			writeOptions?: VipsPNGWriteOptions;
	  };

export type VipsWriteOptions = {
	strip?: boolean;
};
