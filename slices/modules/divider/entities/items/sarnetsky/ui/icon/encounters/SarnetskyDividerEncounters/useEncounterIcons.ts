import { useCallback } from "react";
import type { IconRect } from "@/modules/core/icon/shared/model";
import {
	selectDividerParam,
	setDividerParam,
} from "@/modules/divider/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { isBoxRectEquals } from "@/shared/util";

type Options = {
	dividerId: string;
};

export const useEncounterIcons = ({ dividerId }: Options) => {
	const dispatch = useAppDispatch();

	const currentValue = useAppSelector(
		selectDividerParam<IconRect[]>({
			id: dividerId,
			key: "scenarioEncounters",
		}),
	);

	return useCallback(
		(icons: IconRect[]) => {
			if (currentValue && !shouldUpdateIcons(currentValue, icons)) {
				return;
			}
			dispatch(
				setDividerParam({
					id: dividerId,
					key: "scenarioEncounters",
					value: icons,
				}),
			);
		},
		[dispatch, dividerId, currentValue],
	);
};

const shouldUpdateIcons = (a: IconRect[], b: IconRect[]) => {
	if (a.length !== b.length) {
		return true;
	}
	return a.some((aIcon) => {
		const bIcon = b.find((x) => x.id === aIcon.id);
		if (!bIcon) {
			return true;
		}
		return !isBoxRectEquals(aIcon, bIcon);
	});
};
