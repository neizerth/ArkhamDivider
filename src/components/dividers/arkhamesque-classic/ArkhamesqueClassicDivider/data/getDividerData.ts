import { DividerType, IDivider } from "@/shared/types/dividers"
import { IArkhamesqueBuild, IArkhamesquePlayerCategory, IArkhamesqueStoriesCategory, IArkhamesqueStoryScenario } from "arkhamesque-classic-divider-data"
import { getStoryDividerData } from "./getStoryDividerData";
import { getPlayerDividerData } from "./getPlayerDividerData";
import { getInvestigatorsDividerData } from "./getInvestigatorsDividerData";

export type GetDividerDataOptions = {
  data: IArkhamesqueBuild,
  divider: IDivider
}

export type IArkhamesqueDividerDataItem = {
  scenario?: IArkhamesqueStoryScenario
  category?: IArkhamesqueStoriesCategory | IArkhamesquePlayerCategory
  image: string
  icon?: boolean
  previewIcon?: boolean 
  xp?: number | boolean
}

export type GetTypedDividerDataOptions = NonNullable<GetDividerDataOptions>;
export const getDividerData = (options: GetDividerDataOptions): IArkhamesqueDividerDataItem | undefined => {
  const { divider } = options;

  switch (divider.type) {
    case DividerType.CAMPAIGN:
    case DividerType.SCENARIO:
    case DividerType.ENCOUNTER:
      return getStoryDividerData(options);
    case DividerType.PLAYER:
      return getPlayerDividerData(options);
    case DividerType.INVESTIGATOR:
      return getInvestigatorsDividerData(options);
  }
}
