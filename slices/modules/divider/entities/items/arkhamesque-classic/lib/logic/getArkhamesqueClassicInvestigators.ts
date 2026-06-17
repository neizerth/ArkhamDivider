import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { prop } from "ramda";

export const getArkhamesqueClassicInvestigators = (data: IArkhamesqueBuild) => {
	return (
		data.investigators?.flatMap(
			({ data: entries }) => entries?.map(prop("code")) ?? [],
		) ?? []
	);
};
