import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { useAppSelector } from "@/shared/lib";
import type { SarnetskyBandProps, SarnetskyBandSxOptions } from "../../model";
import { getSarnetskyBandType } from "../logic";
import { getSarnetskyBandLayoutObjects } from "../logic/getSarnetskyBandLayoutObjects";

export function useSarnetskyBandSxOptions(
	divider: SarnetskyBandProps,
): SarnetskyBandSxOptions {
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const layoutId = layout.id;
	const type = useMemo(() => {
		return getSarnetskyBandType({
			divider,
			layoutId,
		});
	}, [divider, layoutId]);

	return useMemo(() => {
		const objects = getSarnetskyBandLayoutObjects(layoutId);
		return { objects, type };
	}, [layoutId, type]);
}
