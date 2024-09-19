import { onlyWithScenarioEncounters } from "@/store/features/stories/criteria";
import { IEncounterSet, IScenario, IStory } from "@/types/api";
import { IDivider } from "@/types/dividers";
import { arrayIf, definedIf, toArrayIfExists, uniqId } from "@/util/common";
import { ascend, descend, isNotNil, prop, propEq, sortWith } from "ramda";

export const getStoryScenarios = ({
  scenario,
  scenarios = []
}: IStory) => [
  ...toArrayIfExists(scenario),
  ...scenarios
]

export const getStoryDividers = ({
  story,
  ...options
}: {
  story: IStory
  returnStories?: IStory[],
  includeExtraSets: boolean
  includeScenarios: boolean
  includeEncounterSize: boolean
  includeCampaignIcon: boolean
  includeScenarioEncounterSet: boolean
  encounterSets: IEncounterSet[]
}) => {
  
  const {
    returnStories = [],
    includeExtraSets,
    includeEncounterSize,
    includeCampaignIcon,
    includeScenarioEncounterSet,
    encounterSets
  } = options;

  const {
    encounter_sets,
    extra_encounter_sets,
    icon,
  } = story;

  const campaignIcon = definedIf(icon, includeCampaignIcon);
  const scenarios = getStoryScenarios(story);
  const extraEncounters = includeExtraSets ? extra_encounter_sets : [];
  
  const onlyScenario = onlyWithScenarioEncounters(story); 
  const includeScenarios = onlyScenario || options.includeScenarios;

  const encounters = [
    ...encounter_sets,
    ...extraEncounters
  ];

  const scenarioDividers: IDivider[] = sortWith(
      [
        ascend(({ number = Infinity }) => number)
      ],
      scenarios
    )
    .map((scenario: IScenario) => {
      const {
        id,
        scenario_name,
        icon
      } = scenario;
      
      return {
        id: uniqId() + id,
        name: scenario_name,
        icon,
        campaignIcon,
        type: 'scenario'
      }
    })

  const scenarioIcons = scenarioDividers.map(prop('icon'));
  const encounterDividers: IDivider[] = encounters
    .map(code => {
      const encounter = encounterSets.find(propEq(code, 'code'));
      if (!encounter) {
        return;
      }
      
      const {
        name,
        icon,
        size
      } = encounter;

      if (!includeScenarioEncounterSet && scenarioIcons.includes(icon)) {
        return;
      }
      
      const sizeData = includeEncounterSize ? { size } : {};

      return {
        id: uniqId() + code,
        ...sizeData,
        name,
        icon,
        campaignIcon,
        type: 'encounter'
      }
    })
  .filter(isNotNil);

  const returnSetDividers: IDivider[] = returnStories.map(story => getStoryDividers({
    story,
    ...options
  }))
  .flat();
  
  const dividers = [
    ...arrayIf(includeScenarios, scenarioDividers),
    ...encounterDividers,
    ...returnSetDividers
  ];
  
  return sortWith([
    descend(prop('type')),
  ], dividers);
}
