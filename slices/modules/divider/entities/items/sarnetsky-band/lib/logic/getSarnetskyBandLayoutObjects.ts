import {
	sarnetskyBandCampaignObjects,
	sarnetskyBandStandaloneObjects,
} from "../../config/common";

export function getSarnetskyBandLayoutObjects(layoutId: string) {
	if (layoutId === "sarnetsky-band_standalone") {
		return sarnetskyBandStandaloneObjects;
	}
	return sarnetskyBandCampaignObjects;
}
