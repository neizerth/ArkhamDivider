import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { prop } from "ramda";

export const getArkhamesqueClassicInvestigators = (data: IArkhamesqueBuild) => {
	return data.investigators.flatMap(({ data }) => data.map(prop("code")));
};
