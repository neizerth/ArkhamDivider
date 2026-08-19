import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { prop } from "ramda";
import { flattenCategories } from "./images/helpers";

export const getArkhamesqueClassicInvestigators = (data: IArkhamesqueBuild) => {
	return flattenCategories(data.investigators).flatMap(
		({ data: entries }) => entries?.map(prop("code")) ?? [],
	);
};
