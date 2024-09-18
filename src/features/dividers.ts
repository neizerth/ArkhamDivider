import { IEncounterSet, IStory } from "@/types/api";
import { IDivider } from "@/types/dividers";
import { arrayIf, toArrayIfExists } from "@/util/common";
import { descend, isNotNil, prop, propEq, sortWith } from "ramda";

export const getStoryScenarios = ({
  scenario,
  scenarios = []
}: IStory) => [
  ...toArrayIfExists(scenario),
  ...scenarios
]

export const getStoryDividers = ({
  story,
  returnStories = [],
  includeExtra,
  includeScenarios,
  encounterSets
}: {
  story: IStory
  returnStories?: IStory[],
  includeExtra: boolean
  includeScenarios: boolean
  encounterSets: IEncounterSet[]
}) => {
  const {
    encounter_sets,
    extra_encounter_sets,
  } = story;
  
  const scenarios = getStoryScenarios(story);
  const extraEncounters = includeExtra ? extra_encounter_sets : [];
  const encounters = [
    ...encounter_sets,
    ...extraEncounters
  ];

  const scenarioDividers: IDivider[] = scenarios.map(scenario => {
    const {
      id,
      scenario_name,
      icon
    } = scenario;
    return {
      id,
      name: scenario_name,
      icon,
      type: 'scenario'
    }
  });

  const scenarioIds = scenarioDividers.map(prop('id'));

  const encounterDividers: IDivider[] = encounters
    .filter(code => !scenarioIds.includes(code))
    .map(code => {
      const encounter = encounterSets.find(propEq(code, 'code'));
      if (!encounter) {
        return;
      }
      
      const {
        name,
        icon
      } = encounter;

      return {
        id: code,
        name,
        icon,
        type: 'encounter'
      }
    })
  .filter(isNotNil);

  const returnSetDividers: IDivider[] = returnStories.map(story => getStoryDividers({
    story,
    encounterSets,
    includeScenarios,
    includeExtra
  }))
  .flat();
  
  const dividers = [
    ...arrayIf(includeScenarios, scenarioDividers),
    ...encounterDividers,
    ...returnSetDividers
  ];

  // return dividers;
  
  return sortWith([
    descend(prop('type')),
  ], dividers);
  // if (includeReturnSet) {

  // }
}

// export const getEncounterDivider =  /