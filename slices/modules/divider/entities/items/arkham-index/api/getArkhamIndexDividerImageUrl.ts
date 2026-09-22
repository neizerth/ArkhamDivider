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
		const code = divider.investigator?.code;
		if (!code) {
			return;
		}

		const base = `${imagesUrl}/investigator/${orientation}/${code}`;

		if (version > 1) {
			return `${base}-${version}.avif`;
		}
		return `${base}.avif`;
	}

	const story = divider.story;
	if (!story) {
		return;
	}

	const storyCode = story.return_to_code ?? story.code;
	const scenarioBaseUrl = `${imagesUrl}/scenario`;
	const scenarioBase = `${scenarioBaseUrl}/${storyCode}/${orientation}`;

	if (divider.type === "campaign") {
		return `${scenarioBase}/${story.code}.avif`;
	}

	if (divider.type === "encounter") {
		const { subtype, cycleCode, isExtra } = divider;

		const id =
			subtype === "encounter-set"
				? divider.encounterCode
				: `${divider.scenarioId}-encounter`;

		// Return-to extras: story already resolves via return_to_code (rtptc → ptc).
		const code = isExtra && cycleCode !== "return" ? cycleCode : storyCode;

		return `${scenarioBaseUrl}/${code}/${orientation}/${id}.avif`;
	}

	const scenarioId = divider.scenario?.id;
	if (!scenarioId) {
		return;
	}

	if (scenarioId === story.code) {
		return `${scenarioBase}/${story.code}-scenario.avif`;
	}

	return `${scenarioBase}/${scenarioId}.avif`;
}
