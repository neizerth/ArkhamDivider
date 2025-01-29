import factions from "@/shared/data/factions.json";
import { uniqId } from "@/shared/lib/features/util/common";
import type { IInvestigator } from "@/shared/model/types/api";
import { DividerType, type IDivider } from "@/shared/model/types/dividers";
import { groupBy, isNotNil, prop, propEq, values } from "ramda";

export const getInvestigatorDividers = ({
	investigators,
}: {
	investigators: IInvestigator[];
}): IDivider[] => {
	const investigatorGroups = groupBy(prop("name"), investigators);
	const data = values(investigatorGroups)
		.filter(isNotNil)
		.map((group) => group[0]);

	return data
		.map((investigator) => {
			const { name, faction_code } = investigator;

			const faction = factions.find(propEq(faction_code, "id"));
			if (!faction) {
				return;
			}
			const { icon } = faction;
			return {
				id: uniqId(),
				faction: faction.id,
				investigator,
				type: DividerType.INVESTIGATOR,
				specialIcon: "per_investigator",
				name,
				icon,
			};
		})
		.filter(isNotNil);
};
