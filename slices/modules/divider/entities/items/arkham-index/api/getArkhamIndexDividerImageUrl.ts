import type { Orientation } from "@mui/material";
import { arkhamIndexDividerExternalUrl as baseUrl } from "../config";
import type { ArkhamIndexDividerProps } from "../model";

type Options = {
	divider: ArkhamIndexDividerProps;
	orientation: Orientation;
	version?: number;
};
export function getArkhamIndexDividerImageUrl({
	divider,
	orientation,
	version = 1,
}: Options) {
	if (divider.layoutType === "player") {
		return;
	}

	const imagesUrl = `${baseUrl}/images`;

	if (divider.layoutType === "investigator") {
		const base = `${imagesUrl}/investigator/${orientation}/${divider.investigator.code}`;

		if (version > 1) {
			return `${base}-${version}.avif`;
		}
		return `${base}.avif`;
	}

	const { story } = divider;
	const storyCode = story.return_to_code ?? story.code;
	const scenarioBase = `${imagesUrl}/scenario/${storyCode}/${orientation}`;

	if (divider.type === "campaign") {
		return `${scenarioBase}/${story.code}.avif`;
	}

	if (divider.type === "encounter") {
		const subtype = divider.subtype;

		const id =
			subtype === "encounter-set"
				? divider.encounterCode
				: `${divider.scenarioId}-encounter`;
		return `${scenarioBase}/${id}.avif`;
	}

	return `${scenarioBase}/${divider.scenario.id}.avif`;
}
