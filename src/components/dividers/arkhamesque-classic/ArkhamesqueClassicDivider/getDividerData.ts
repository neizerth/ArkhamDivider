import { getArkhamesqueClassicStory } from "@/store/features/arkhamesque/criteria";
import { DividerType, IDivider } from "@/types/dividers"
import { IArkhamesqueBuild } from "arkhamesque-divider-data"
import { ARKHAMESQUE_URL } from "@/constants/app";
import { identity } from "ramda";

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
  const isEncounter = divider.type === DividerType.ENCOUNTER;
  const isReturnSet = Boolean(story.return_to_code);

  const scenarioId = divider.scenario?.id;
  
  const categoryPrefix = category.prefix;
  const { name, return_name } = search.story;

  const defaultImage = toImage([
    data.prefix,
    categoryPrefix,
    name,
    isReturnSet && return_name
  ])

  if (!search.story.scenarios || !scenarioId || isEncounter) {
    return {
      category,
      image: defaultImage
    }
  }
  
  const scenario = search.story.scenarios.find(scenario => {
    if ('code' in scenario) {
      return scenario.code === scenarioId;
    }
    return scenario.codes.includes(scenarioId);
  });

  if (!scenario) {
    return {
      category,
      image: defaultImage
    }
  }

  return {
    scenario,
    category,
    imageData: [
      data.prefix,
      categoryPrefix,
      scenario.name
    ],
    image: toImage([
      data.prefix,
      categoryPrefix,
      name,
      scenario.name
    ])
  }
}