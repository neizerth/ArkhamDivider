import { IEncounterSet, IScenario } from "@/shared/types/api";
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
        prop('version_text'), 
        ecnounterGroups
      )
    )
    .filter(isNotNil);

  const versionGroups = groups.map(groups => {
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

  if (versionGroups.length > 0) {
    return versionGroups;
  }

  return getScenarioGroups(options);
}

export const getScenarioGroups = ({ 
  mainScenario,
  scenario,
  encounterSets 
}: IGetEcnounterGroups) => {

  const {
    icon,
    encounter_sets = [],
    extra_encounter_sets = []
  } = scenario

  const toIcon = (code: string) => encounterSets.find(
    propEq(code, 'code')
  )?.icon

  const excludeIcons = mainScenario ? [icon, mainScenario.icon] : [icon]; 

  const toEncounters = (ids: string[]) => 
    ids.map(toIcon)
      .filter(icon => !excludeIcons.includes(icon))
      .filter(isNotNil)

  return [
    {
      main: toEncounters(encounter_sets),
      side: toEncounters(extra_encounter_sets),
      version_number: 1,
      version_text: 'I'
    }
  ]
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