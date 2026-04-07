import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { isNotNil } from "ramda";
import type { ArkhamesqueClassicDividerProps } from "../../../model";
import { findInvestigator, withBuildPrefix } from "./helpers";

type Options = {
	data: IArkhamesqueBuild;
	divider: ArkhamesqueClassicDividerProps;
};

export const getArkhamesqueClassicInvestigatorImage = ({
	data,
	divider,
}: Options): string[] | undefined => {
	if (divider.layoutType !== "investigator") {
		return;
	}

	const { investigator: inv } = divider;
	if (!inv) {
		return;
	}

	const found =
		findInvestigator(data, inv.code) ??
		findInvestigator(data, inv.alternate_of);
	if (!found) {
		return;
	}

	const { categoryPrefix, investigator } = found;
	const linePrefix = investigator.prefix ?? categoryPrefix;
	const parts = [linePrefix, investigator.name].filter(isNotNil);
	const filename = parts.join("");

	return [withBuildPrefix(data, filename)];
};
