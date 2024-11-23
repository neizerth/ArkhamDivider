import { getArkhamesqueClassicStory } from "@/store/features/arkhamesque/criteria";
import { DividerType, IDivider } from "@/types/dividers"
import { IArkhamesqueBuild } from "arkhamesque-divider-data"
import { ARKHAMESQUE_URL } from "@/constants/app";
import { identity, propEq } from "ramda";

export type GetDividerDataOptions = {
  data: IArkhamesqueBuild,
  divider: IDivider
}

export type GetTypedDividerDataOptions = NonNullable<GetDividerDataOptions>;
export const getDividerData = (options: GetDividerDataOptions) => {
  const { divider } = options;

  switch (divider.type) {
    case DividerType.CAMPAIGN:
    case DividerType.SCENARIO:
    case DividerType.ENCOUNTER:
      return getStoryDividerData(options);
  }
}

const toImage = (data: (string | undefined | false)[]) => {
  const path = data.filter(identity).join('');
  return `${ARKHAMESQUE_URL}/images/${path}.jpg`
}

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

  const defaultImage = toImage([
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
      image: toImage([
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
    image: toImage([
      data.prefix,
      categoryPrefix,
      name,
      campaign.name
    ])
  }
}