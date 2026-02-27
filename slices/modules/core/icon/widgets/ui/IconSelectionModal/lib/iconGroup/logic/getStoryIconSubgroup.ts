import { isNotNil, prop, uniq } from "ramda";
import type { Story } from "@/modules/story/shared/model";
import type { IconSubgroup } from "../../../model";

export const getStoryIconSubgroup =
	(toIcon: (name: string) => string | undefined) =>
	({
		encounter_sets,
		name,
		icon,
		code,
		pack_codes = [],
		pack_code,
		campaigns = [],
	}: Story): IconSubgroup => {
		const campaignIcons = campaigns
			.map(prop("icon"))
			.concat([code, pack_code, ...pack_codes])
			.filter(isNotNil)
			.map(toIcon)
			.filter(isNotNil);

		const icons = [
			icon,
			...campaignIcons,
			...encounter_sets.map(toIcon),
		].filter(isNotNil);

		return {
			id: code,
			name,
			icon,
			icons: uniq(icons),
		};
	};
