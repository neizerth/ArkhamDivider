import { IEncounterSet, IScenario } from "@/types/api";
import { groupBy, isNotNil, prop, propEq, uniq, values } from "ramda";

type IGetEcnounterGroups = {
  scenario: IScenario
  mainScenario?: IScenario
  encounterSets: IEncounterSet[]
}

export const getEncounterGroups = (options: IGetEcnounterGroups) => {
  const ecnounterGroups = getAllGroups(options);

  const groups = values(
      groupBy(
        prop('version_text'), ecnounterGroups
      )
    )
    .filter(isNotNil);

  return groups.map(groups => {
    const [first] = groups;
    const {
      version_number,
      version_text
    } = first;
    const main = uniq(
      groups
      .filter(
        propEq(true, 'is_default')
      )
      .map(prop('encounter_sets'))
      .filter(isNotNil)
      .flat()
    )

    const side = uniq(
      groups
      .filter(
        propEq(false, 'is_default')
      )
      .map(prop('encounter_sets'))
      .flat()
      .filter(icon => !main.includes(icon))
    );

    return {
      main,
      side,
      version_number,
      version_text
    }
    
  });
}

const getAllGroups = ({
  scenario,
  mainScenario,
  encounterSets
}: IGetEcnounterGroups) => {

  const {
    id,
    encounter_set_groups = [],
    icon
  } = scenario

  const toIcon = (code: string) => encounterSets.find(
    propEq(code, 'code')
  )?.icon

  const excludeIds = mainScenario ? [id, mainScenario.id] : [id]; 
  const excludeIcons = mainScenario ? [icon, mainScenario.icon] : [icon]; 

  return encounter_set_groups.map(group => ({
    ...group,
    encounter_sets: group.encounter_sets
      .filter(code => !excludeIds.includes(code))
      .map(toIcon)
      .filter(code => !excludeIcons.includes(code))
      .filter(isNotNil)
  }));
}