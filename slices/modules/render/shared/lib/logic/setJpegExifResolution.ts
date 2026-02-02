import { Buffer } from "buffer";
import piexif from "piexifjs";

const JPEG_SOI = new Uint8Array([0xff, 0xd8]);

/**
 * Patches EXIF XResolution, YResolution, ResolutionUnit in a JPEG buffer.
 * libvips leaves 72 DPI in EXIF when writing with strip: true; this overwrites with the given DPI.
 * JPEG only — PNG uses pHYs chunk for resolution (set by libvips xres/yres when writing).
 */
export const setJpegExifResolution = (
	jpegBuffer: Uint8Array,
	dpi: number,
): Uint8Array => {
	if (
		jpegBuffer.length < 2 ||
		jpegBuffer[0] !== JPEG_SOI[0] ||
		jpegBuffer[1] !== JPEG_SOI[1]
	) {
		return jpegBuffer;
	}
	const jpegStr = Buffer.from(jpegBuffer).toString("binary");
	let exifObj: piexif.ExifDict;
	try {
		exifObj = piexif.load(jpegStr);
	} catch {
		exifObj = {
			"0th": {},
			Exif: {},
			GPS: {},
			Interop: {},
			"1st": {},
			thumbnail: undefined,
		};
	}
	const zeroth = exifObj["0th"] ?? {};
	zeroth[piexif.ImageIFD.XResolution] = [dpi, 1];
	zeroth[piexif.ImageIFD.YResolution] = [dpi, 1];
	zeroth[piexif.ImageIFD.ResolutionUnit] = 2; // 2 = inches
	exifObj["0th"] = zeroth;

	const exifBytes = piexif.dump(exifObj);
	const inserted = piexif.insert(exifBytes, jpegStr);
	return new Uint8Array(Buffer.from(inserted, "binary"));
};
