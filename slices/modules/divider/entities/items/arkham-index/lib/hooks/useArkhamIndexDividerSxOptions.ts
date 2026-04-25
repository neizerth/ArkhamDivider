import { useMemo } from "react";
import { isEmptyIcon } from "@/modules/core/icon/shared/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { useAppSelector } from "@/shared/lib";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
	ArkhamIndexDividerSxOptions,
	ArkhamIndexDividerTabSize,
} from "../../model";
import { getArkhamIndexDividerLayoutObjects } from "../logic";

type Options = {
	divider: ArkhamIndexDividerProps;
	tabIndex: number;
	tabSize: ArkhamIndexDividerTabSize;
};

export const useArkhamIndexDividerSxOptions = (options: Options) => {
	const { divider, tabIndex, tabSize } = options;
	const layout = useAppSelector(selectLayout) as ArkhamIndexDividerLayout;
	const icon = getDividerIcon({ divider, param: "icon" });
	const showIcon = !isEmptyIcon(icon);
	const indent = divider.params?.indent ?? false;
	const objects = getArkhamIndexDividerLayoutObjects(layout);
	const indentSize =
		indent && tabSize === 2 && tabIndex !== 0 ? objects.tab.indentSize : 0;

	return useMemo((): ArkhamIndexDividerSxOptions => {
		return {
			objects,
			showIcon,
			tabIndex,
			tabSize,
			indentSize,
		};
	}, [objects, showIcon, tabIndex, tabSize, indentSize]);
};
