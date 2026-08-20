import { useCallback, useMemo } from "react";
import type { Icon } from "@/modules/core/icon/shared/model";
import { useDividerParam } from "@/modules/divider/shared/lib";
import type { CarlosLemosDividerParams } from "../../model";
import { getCarlosLemosEncounterIcons } from "../getCarlosLemosEncounterIcons";

export const useCarlosLemosEncounterIcons = (
	divider: CarlosLemosDividerParams,
) => {
	const encounterIcons = useMemo(
		() => getCarlosLemosEncounterIcons(divider),
		[divider],
	);

	const setIcons = useDividerParam<Icon[]>({
		dividerId: divider.id,
		key: "encounterIcons",
	});

	const addIcon = useCallback(
		(icon: Icon) => {
			const newEncounterIcons = [...encounterIcons, icon];
			setIcons(newEncounterIcons);
		},
		[encounterIcons, setIcons],
	);

	const removeIcon = useCallback(
		(icon: Icon) => {
			const newEncounterIcons = encounterIcons.filter((i) => i !== icon);
			setIcons(newEncounterIcons);
		},
		[encounterIcons, setIcons],
	);

	return {
		addIcon,
		removeIcon,
	};
};
