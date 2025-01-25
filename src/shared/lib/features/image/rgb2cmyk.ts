import { getVips } from "./vips";

export const rgb2cmyk = async (source: Uint8Array): Promise<Uint8Array> => {
	const vips = await getVips();
	const image = vips.Image.newFromBuffer(source).iccTransform("cmyk");

	const buffer = image.writeToBuffer(".tiff");

	image.delete();

	return buffer;
};
