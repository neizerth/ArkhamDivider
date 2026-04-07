import type { SarnetskyBandProps, SarnetskyBandType } from "../../model";

type Options = {
	divider: SarnetskyBandProps;
	layoutId: string;
};

export function getSarnetskyBandType({
	divider,
	layoutId,
}: Options): SarnetskyBandType {
	if (divider.id === "concealed_cards") {
		return "concealed";
	}
	if (layoutId === "sarnetsky-band_standalone") {
		return "standalone";
	}
	if (["scenario", "campaign"].includes(divider.type)) {
		return "scenario";
	}
	return "encounter";
}
