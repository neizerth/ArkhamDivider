import { useMemo } from "react";
import { selectLayoutId } from "@/modules/divider/shared/lib";
import { selectBleedEnabled } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getVintageDividerObjects } from "../logic";

type Options = {
	tabIndex: number;
};

export function useVintageDividerSxOptions({ tabIndex }: Options) {
	const layoutId = useAppSelector(selectLayoutId) as string;
	const bleedEnabled = useAppSelector(selectBleedEnabled);

	const sxOptions = useMemo(() => {
		const objects = getVintageDividerObjects(layoutId);
		return { objects, tabIndex, bleedEnabled };
	}, [layoutId, tabIndex, bleedEnabled]);

	return sxOptions;
}
