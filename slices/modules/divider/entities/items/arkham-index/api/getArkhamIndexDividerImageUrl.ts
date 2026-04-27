import { arkhamIndexDividerExternalUrl as baseUrl } from "../config";
import type { ArkhamIndexDividerProps } from "../model";

type Options = {
	divider: ArkhamIndexDividerProps;
	version?: number;
};
export function getArkhamIndexDividerImageUrl({ divider, version }: Options) {
	if (divider.layoutType === "player") {
		return;
	}

	const imagesUrl = `${baseUrl}/images`;

	if (divider.layoutType === "investigator") {
		const base = `${imagesUrl}/${divider.investigator.code}`;

		if (version) {
			return `${base}_${version}.avif`;
		}
		return `${base}.avif`;
	}

	const { story } = divider;
	const storyCode = story.return_to_code ?? story.code;
	const scenarioBase = `${imagesUrl}/scenario/${storyCode}`;

	if (divider.type === "campaign") {
		return `${scenarioBase}/${story.code}.avif`;
	}

	if (divider.type === "encounter") {
		const subtype = divider.subtype;
		const id =
			subtype === "encounter-set" ? divider.encounterCode : divider.scenarioId;
		return `${scenarioBase}/${id}.avif`;
	}

	return `${scenarioBase}/${divider.scenario.id}.avif`;
}
