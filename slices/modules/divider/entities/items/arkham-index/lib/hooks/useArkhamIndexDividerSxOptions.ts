import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerSxOptions,
} from "../../model";
import { getArkhamIndexDividerLayoutObjects } from "../logic";

export const useArkhamIndexDividerSxOptions = () => {
	const layout = useAppSelector(selectLayout) as ArkhamIndexDividerLayout;

	return useMemo((): ArkhamIndexDividerSxOptions => {
		return {
			objects: getArkhamIndexDividerLayoutObjects(layout),
		};
	}, [layout]);
};
