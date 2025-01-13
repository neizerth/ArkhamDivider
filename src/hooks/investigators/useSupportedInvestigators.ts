import { IStory } from "@/types/api";
import { useCallback } from "react"
import { useAppSelector } from "../useAppSelector";
import { 
  selectArkhamesqueClassicInvestigators as selectArkhqmesqueInvestigators, 
  selectArkhamesqueData 
} from "@/store/features/dividers/arkhamesque/arkhamesque";
import { selectIsArkhamesqueLayout } from "@/store/features/layout/layout";

export const useSupportedInvestigators = () => {
  const isArkhamesqueLayout = useAppSelector(selectIsArkhamesqueLayout);
  const arkhamesqueInvestigators = useAppSelector(selectArkhqmesqueInvestigators);
  const data = useAppSelector(selectArkhamesqueData);

  const getSupportedInvestigators = useCallback(({ investigators }: IStory) => {
    if (!isArkhamesqueLayout) {
      return investigators;
    }
    if (!data) {
      return [];
    }
    
    return investigators.filter(
      ({ code }) => arkhamesqueInvestigators.includes(code)
    );

  }, [data, isArkhamesqueLayout, arkhamesqueInvestigators]);

  return getSupportedInvestigators;
}