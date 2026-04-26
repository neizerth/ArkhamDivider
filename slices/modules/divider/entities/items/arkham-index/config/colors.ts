import type { ColorFilter } from "@/modules/core/color/shared/model";

/** Stack order: first = bottom adjustment (applied first), like PhotoShop layers. */
const campaignFilters: Record<string, ColorFilter[]> = {
	dwl: [
		{
			hue: -30,
			lightness: -15,
		},
	],
	ptc: [
		{
			hue: 48,
			saturation: -26,
			lightness: -6,
		},
	],
	tfa: [
		{
			hue: 122,
			saturation: 18,
			lightness: -7,
		},
	],
	tcu: [
		{
			hue: 71,
			saturation: -15,
			lightness: -51,
		},
	],
	tde: [
		{
			hue: 39,
			saturation: -37,
			brightness: 10,
			contrast: 38,
		},
	],
	tic: [
		{
			hue: -8,
			saturation: -12,
			brightness: -26,
			contrast: 41,
		},
	],
	eoe: [
		{ saturation: -15, lightness: 3 },
		{
			colorBalance: {
				type: "midtones",
				red: -95,
				blue: 31,
			},
		},
	],
	tsk: [
		{
			hue: 137,
			saturation: 45,
			lightness: -10,
		},
		{
			colorBalance: {
				type: "midtones",
				red: 22,
			},
		},
		{
			contrast: 100,
		},
	],
	// PS: bottom → top = Hemlock Vale (Hue/Sat) → Color Balance → Brightness/Contrast
	fhv: [
		{ hue: 180, lightness: 5 },
		{
			colorBalance: {
				type: "midtones",
				red: 80,
				green: 14,
				blue: -84,
			},
		},
		{
			brightness: -21,
			contrast: 98,
		},
	],
	tdc: [
		{
			hue: -137,
			saturation: -22,
			lightness: 4,
			colorBalance: {
				type: "midtones",
				green: 14,
				blue: -14,
			},
			contrast: 100,
		},
	],
};

/** One-off / standalone: cool charcoal + hint of indigo (cover top/bottom), not the warm nebula. */
const standaloneFilters: ColorFilter[] = [
	{
		// hue: 200,
		saturation: -75,
		lightness: -18,
		contrast: 12,
	},
];

export const arkhamIndexFactionColors = {
	guardian: "#00b0db",
	seeker: "#c68b2f",
	rogue: "#77eb5987",
	mystic: "#cc02ff52",
	survivor: "#fa000d8a",
	multiclass: "#ffd100",
	neutral: "#808080",
} satisfies Record<string, string>;

export const arkhamIndexBackgroundFilters = {
	campaign: campaignFilters,
	standalone: standaloneFilters,
};
