import { IScenario, IStory } from "@/types/api";
import { ascend, sortWith } from "ramda";
import { getScenarioSize } from "./getScenarioSize";
import { FirstParam } from "@/types/util";
import { definedIf, toArrayIfExists, uniqId } from "@/util/common";
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
    includeCampaignIcon,
    includeScenarios
  } = options;
  
  if (!includeScenarios) {
    return [];
  }

  const { icon, code } = story;
  const scenarios = getStoryScenarios(story);

  const campaignIcon = definedIf(icon, includeCampaignIcon);

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
      icon
    } = scenario;
  
    const sizeData = getScenarioSize({
      scenario,
      ...options
    });
    
    return {
      ...sizeData,
      id: uniqId() + id,
      story,
      name: scenario_name,
      icon,
      campaignIcon,
      type: DividerType.SCENARIO
    }
  })

}