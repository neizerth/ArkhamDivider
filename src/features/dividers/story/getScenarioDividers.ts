import { IScenario, IStory } from "@/types/api";
import { ascend, isNotNil, propEq, sortWith } from "ramda";
import { getScenarioSize } from "./getScenarioSize";
import { FirstParam } from "@/types/util";
import { toArrayIfExists, uniqId } from "@/util/common";
import { DividerType } from "@/types/dividers";

type IGetSizeOptions = FirstParam<typeof getScenarioSize>
type IGetScenarioDividersOptions = Omit<IGetSizeOptions, 'scenario'> & {
  includeCampaignIcon: boolean
  story: IStory
  includeScenarios: boolean
}

export const getStoryScenarios = ({
  scenario,
  scenarios = []
}: IStory) => [
  ...toArrayIfExists(scenario),
  ...scenarios
]

export const getScenarioDividers = (options: IGetScenarioDividersOptions) => {
  const { 
    story, 
    includeScenarios,
    includeCampaignIcon,
    encounterSets
  } = options;

  if (!includeScenarios) {
    return [];
  }

  const { icon } = story;
  const scenarios = getStoryScenarios(story);

  const campaignIcon = icon;

  return sortWith(
    [
      ascend(({ number = Infinity }) => number)
    ],
    scenarios
  )
  .map((scenario: IScenario) => {
    const {
      id,
      scenario_name,
      icon,
      encounter_sets = [],
      extra_encounter_sets = [],
      encounter_set_groups = [],
      scenarios = []
    } = scenario;
  
    const sizeData = getScenarioSize({
      scenario,
      ...options
    });

    const allEncounterSets = [
      ...encounter_sets,
      ...extra_encounter_sets
    ];

    const toIcon = (code: string) => encounterSets.find(
      propEq(code, 'code')
    )?.icon

    const encounters = allEncounterSets
      .map(toIcon)
      .filter(encounterIcon => encounterIcon !== icon)
      .filter(isNotNil);

    const ecnounterGroups = encounter_set_groups.map(group => ({
      ...group,
      encounter_sets: group.encounter_sets
        .filter(code => code !== id)
        .map(toIcon)
        .filter(isNotNil)
    }));

    const linkedScenarios = scenarios.map(s => ({
      ...s,
      encounter_sets: s.encounter_sets?.map(toIcon)
    }))

    return {
      ...sizeData,
      id: uniqId() + id,
      scenario: {
        ...scenario,
        scenarios: linkedScenarios
      },
      story,
      name: scenario_name,
      icon,
      campaignIcon,
      type: DividerType.SCENARIO,
      encounters,
      ecnounterGroups,
      displayCampaignIcon: includeCampaignIcon
    }
  })

}