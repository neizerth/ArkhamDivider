import { useEffect, useState } from "react";
import { useAppSelector } from "./useAppSelector";
import { selectIconSet } from "@/store/features/icons/icons";
import { selectCampaigns } from "@/store/features/stories/stories";
import { selectScenarios } from "@/store/features/scenarios/scenarios";

export const useAppLoader = () => {
  const [loading, setLoading] = useState(true);
  const isIconSetLoaded = Boolean(useAppSelector(selectIconSet));
  const isCampaignsLoaded = useAppSelector(selectCampaigns).length > 0;
  const isScenariosLoaded = useAppSelector(selectScenarios).length > 0;

  useEffect(() => {
    if (!loading) {
      return;
    }

    const loaded = isIconSetLoaded && isCampaignsLoaded && isScenariosLoaded;

    if (!loaded) {
      setLoading(false);
    }
  }, [setLoading, loading, isIconSetLoaded, isCampaignsLoaded, isScenariosLoaded]);

  return loading;
}