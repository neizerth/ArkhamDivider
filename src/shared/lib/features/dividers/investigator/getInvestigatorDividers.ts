import type { IInvestigator } from "@/shared/types/api";
import { DividerType, type IDivider } from "@/shared/types/dividers";
import { uniqId } from "@/shared/lib/features/util/common";
import factions from "@/shared/data/factions.json";
import { groupBy, isNotNil, propEq, values } from "ramda";

export const getInvestigatorDividers = ({
  investigators,
  doubleSided = false,
}: {
  investigators: IInvestigator[];
  doubleSided?: boolean;
}): IDivider[] => {
  const investigatorGroups = groupBy(
    ({ faction_code, name }) => `${name}-${faction_code}`,
    investigators
  );
  const data = values(investigatorGroups)
    .filter(isNotNil)
    .map((group) => group[0]);

  const sideA = data
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

  const sideB = doubleSided ? sideA.map((divider) => ({
    ...divider,
    backId: uniqId(),
  })) : [];

  return [...sideA, ...sideB];
};
