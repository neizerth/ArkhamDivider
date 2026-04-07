import { useMemo } from "react";
import { selectLayoutId } from "@/modules/divider/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getVintageDividerObjects } from "../logic";

export function useVintageDividerSxOptions() {
	const layoutId = useAppSelector(selectLayoutId) as string;

	const sxOptions = useMemo(() => {
		const objects = getVintageDividerObjects(layoutId);
		return { objects };
	}, [layoutId]);

	return sxOptions;
}
