import { DividerType, IDivider } from "@/types/dividers"
import { IArkhamesqueBuild, IArkhamesquePlayerCategory, IArkhamesqueStoriesCategory, IArkhamesqueStoryScenario } from "arkhamesque-classic-divider-data"
import { getStoryDividerData } from "./getStoryDividerData";
import { getPlayerDividerData } from "./getPlayerDividerData";

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
  }
}
