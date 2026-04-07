import { rgb } from "@/modules/core/color/shared/lib";
import type { RGBColor } from "@/modules/core/color/shared/model";

export const rynoCampaignColors: Record<string, RGBColor> = {
	core: rgb(0, 52, 85),
	core_2026: rgb(0, 52, 85),
	dwl: rgb(26, 213, 0),
	ptc: rgb(115, 0, 85),
	tfa: rgb(255, 0, 0),
	tcu: rgb(255, 0, 17),
	tde: rgb(51, 0, 85),
	tic: rgb(0, 107, 85),
	eoe: rgb(0, 86, 85),
	tsk: rgb(255, 0, 0),
	fhv: rgb(255, 137, 0),
	tdc: rgb(111, 213, 0),
	empty: rgb(255, 115, 0),
	challenge: rgb(255, 56, 0),
};

export const rynoStandaloneColors: Record<string, RGBColor> = {
	zbh: rgb(255, 107, 0),
	coh: rgb(255, 209, 0),
	cotr: rgb(0, 213, 0),
	fof: rgb(0, 213, 0),
	guardians: rgb(255, 132, 0),
	mtt: rgb(0, 128, 85),
	hotel: rgb(255, 0, 0),
	blob: rgb(174, 213, 0),
	lol: rgb(55, 0, 85),
	the_midwinter_gala: rgb(255, 60, 0),
	wog: rgb(0, 115, 85),
	standalone: rgb(128, 128, 128),
};

export const rynoFactionColors: Record<string, RGBColor> = {
	guardian: rgb(0, 68, 85),
	seeker: rgb(255, 115, 0),
	rogue: rgb(43, 213, 0),
	mystic: rgb(102, 0, 85),
	survivor: rgb(255, 0, 0),
	multiclass: rgb(255, 166, 0),
	neutral: rgb(128, 128, 128),
};
