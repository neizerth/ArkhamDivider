import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { useAppSelector } from "@/shared/lib";
import type { RynoDividerSxOptions } from "../../model";
import { getRynoDividerLayoutObjects } from "../logic";

export const useRynoDividerSxOptions = () => {
	const layout = useAppSelector(selectLayout) as DividerLayout;

	const objects = getRynoDividerLayoutObjects(layout);

	return useMemo((): RynoDividerSxOptions => {
		return {
			objects,
		} as const;
	}, [objects]);
};
