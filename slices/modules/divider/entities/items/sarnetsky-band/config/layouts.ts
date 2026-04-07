import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { sarnetskyBandCategoryId } from "./common";

const campaignLayout: DividerLayout = {
	id: "sarnetsky-band",
	types: ["scenario", "player", "investigator"],
	categoryId: sarnetskyBandCategoryId,
	groupId: "campaign",
	name: "divider.layout.sarnetsky-band.campaign",
	description: "divider.layout.sarnetsky-band.campaign.description",
	previewName: "divider.layout.sarnetsky-band.campaign.preview",
	orientation: "horizontal",
	color: true,
	size: createSize(200, 25),
	printSize: {
		300: {
			size: createSize(2362, 295),
			bleedSize: createSize(2409, 343),
		},
	},
	bleed: 2,
	iconParams: ["icon"],
};

const standaloneLayout: DividerLayout = {
	...campaignLayout,
	id: "sarnetsky-band_standalone",
	groupId: "standalone",
	name: "divider.layout.sarnetsky-band.standalone",
	description: "divider.layout.sarnetsky-band.standalone.description",
	previewName: "divider.layout.sarnetsky-band.standalone.preview",
	size: createSize(287, 25),
	printSize: {
		300: {
			size: createSize(3390, 295),
			bleedSize: createSize(3437, 343),
		},
	},
};

export const sarnetskyBandLayouts = [campaignLayout, standaloneLayout];
