import { useMemo } from "react";
import { selectLayoutId } from "@/modules/divider/shared/lib";
import { selectBleedEnabled } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getVintageDividerObjects } from "../logic";

type Options = {
	tabIndex: number;
	tabsCount: number;
	withXP: boolean;
};

export function useVintageDividerSxOptions({
	tabIndex,
	tabsCount,
	withXP,
}: Options) {
	const layoutId = useAppSelector(selectLayoutId) as string;
	const bleedEnabled = useAppSelector(selectBleedEnabled);

	const sxOptions = useMemo(() => {
		const objects = getVintageDividerObjects(layoutId);
		return { objects, tabIndex, tabsCount, bleedEnabled, withXP };
	}, [layoutId, tabIndex, tabsCount, bleedEnabled, withXP]);

	return sxOptions;
}
