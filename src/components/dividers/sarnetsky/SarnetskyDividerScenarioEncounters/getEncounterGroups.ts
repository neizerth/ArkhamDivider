import { IEncounterSetGroup } from "@/types/api";
import { prop, propEq, uniq } from "ramda";

export const getEcnounterGroups = (ecnounterGroups: IEncounterSetGroup[]) => {
  const main = ecnounterGroups.find(propEq(true, 'is_default'))?.encounter_sets || [];

  const side = uniq(
    ecnounterGroups.filter(
      propEq(false, 'is_default')
    )
    .map(prop('encounter_sets'))
    .flat()
    .filter(icon => !main.includes(icon))
  );

  return {
    main,
    side
  }
}