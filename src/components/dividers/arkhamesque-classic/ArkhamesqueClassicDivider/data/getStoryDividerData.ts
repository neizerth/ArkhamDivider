import { getArkhamesqueClassicStory } from "@/store/features/arkhamesque/criteria";
import { getDividerImage } from "./getDividerImage";
import { GetDividerDataOptions } from "./getDividerData";
import { propEq } from "ramda";


export const getStoryDividerData = ({
  data,
  divider
}: GetDividerDataOptions) => {
  const { story } = divider;
  
  if (!story ) {
    return;
  }

  const code = story.return_to_code || story.code;
  const search = getArkhamesqueClassicStory({
    code,
    data
  });

  if (!search) {
    return;
  }
  const { category } = search;
  const isReturnSet = Boolean(story.return_to_code);

  const id = divider.scenario?.id || divider.encounterSet?.code || divider.campaign?.id;
  
  const categoryPrefix = category.prefix;
  const { name, return_name } = search.story;

  const defaultImage = getDividerImage([
    data.prefix,
    categoryPrefix,
    name,
    isReturnSet && return_name
  ]);

  const defaultResponse = {
    category,
    image: defaultImage
  };

  if (!search.story.scenarios || !id) {
    return defaultResponse
  }
  
  const scenario = search.story.scenarios.find(scenario => {
    if ('code' in scenario) {
      return scenario.code === id;
    }
    return scenario.codes.includes(id);
  });

  if (scenario) {
    return {
      scenario,
      category,
      image: getDividerImage([
        data.prefix,
        categoryPrefix,
        name,
        scenario.name
      ])
    }
  }

  if (!divider.campaign?.id) {
    return defaultResponse;
  }

  const { campaigns = [] } = search.story;
  const campaign = campaigns.find(propEq(divider.campaign.id, 'id'));

  if (!campaign) {
    return defaultResponse;
  }

  return {
    scenario,
    category,
    image: getDividerImage([
      data.prefix,
      categoryPrefix,
      name,
      campaign.name
    ])
  }
}