import type { AppSelector } from "@/app/store";
import type { IInvestigator, IStory } from "@/shared/types/api";
import { selectIsArkhamesqueLayout } from "../../layout/layout";
import { selectArkhamesqueClassicInvestigators as selectInvestigators } from "../arkhamesque/arkhamesque";

export const selectStoryInvestigators = (story?: IStory): AppSelector<IInvestigator[]> => state => {
  if (!story) {
    return []
  }
  const { data } = state.arkhamesque;
  const isArkhamesqueLayout = selectIsArkhamesqueLayout(state);

  if (!isArkhamesqueLayout) {
    return story.investigators;
  }

  if (!data) {
    return [];
  }

  const arkhamesqueInvestigators = selectInvestigators(state);

  return story.investigators.filter(
    ({ code }) => arkhamesqueInvestigators.includes(code)
  );
}