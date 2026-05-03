import Color from "color";

export const vintageStoryColors: Record<string, string> = {
	core: "#554820",
	core_2026: "#554820",
	dwl: "#1d2c1e",
	ptc: "#421843",
	tfa: "#133847",
	tcu: "#66362d",
	tde: "#645165",
	tic: "#2b3a4e",
	eoe: "#4c737b",
	tsk: "#610b2c",
	fhv: "#f36f32",
	tdc: "#5C672B",
	standalone: "#3d3820",
};

export const vintagePlayerColors: Record<string, string> = {
	survivor: "#57101d",
	mystic: "#41295f",
	neutral: "#3c3d3c",
	guardian: "#1a2e54",
	rogue: "#083d20",
	seeker: "#bd572e",
	multiclass: "#b19229",
};

export const vintageDefaultColor = "#B2AAA2";

// export const vintageXPColors = {
// 	active: "#fff",
// 	range: "rgba(255, 255, 255, 0.8)",
// 	inactive: "rgba(0, 0, 0, 0.25)",
// };

export const vintageXPColors = {
	active: "#151616",
	range: Color("#151616").alpha(0.5).toString(),
	inactive: Color("#151616").alpha(0.1).toString(),
};

export const vintageRadialXPColors = {
	active: "#000000",
	range: "rgba(0, 0, 0, 0.6)",
	inactive: "rgba(0, 0, 0, 0.2)",
};
