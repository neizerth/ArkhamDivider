export type RGBColor = [number, number, number];
export type RGBAColor = [number, number, number, number];
export type CMYKColor = [number, number, number, number];
export type RGBAColorObject = {
	r: number;
	g: number;
	b: number;
	a: number;
};

/** PhotoShop filter syntax */
export type ColorFilter = {
	hue?: number;
	saturation?: number;
	luminosity?: number;
	lightness?: number;
	brightness?: number;
	/** PhotoShop Brightness/Contrast: signed −100…+100, not raw CSS `contrast(100+x)%`. */
	contrast?: number;
	colorBalance?: ColorBalanceFilter;
};

export type ColorBalanceFilter = {
	type: "midtones" | "shadows" | "highlights";
	/** Signed, PhotoShop: negative = toward **cyan** (opposite of red). */
	red?: number;
	/** Signed: negative = toward **magenta** (opposite of green). */
	green?: number;
	/** Signed: negative = toward **yellow** (opposite of blue). */
	blue?: number;
};
