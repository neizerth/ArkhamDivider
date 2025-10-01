import type { SleeveSize } from "../model";

const createSleeveSize = (
	width: number,
	height: number,
	title = `${width}x${height}`,
): SleeveSize => {
	const id = `${width}x${height}`;
	return {
		id,
		title,
		image: `/images/sleeve/${id}.png`,
		width,
		height,
	};
};

export const sleeve65x100 = createSleeveSize(65, 100);
export const sleeve76x88 = createSleeveSize(76, 88);
export const sleeve94x69 = createSleeveSize(94, 69);
export const largeCCG = createSleeveSize(89, 130, "Large CCG");
export const smallCCG = createSleeveSize(62, 96, "Small CCG");

export const sleeveSizes: SleeveSize[] = [
	sleeve65x100,
	sleeve76x88,
	sleeve94x69,
	largeCCG,
	smallCCG,
];
