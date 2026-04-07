import { useCallback } from "react";
import {
	type UseIconSelectionOptions,
	useIconSelection,
} from "@/modules/core/icon/entities/lib";
import type { Icon } from "@/modules/core/icon/shared/model";
import {
	selectDividerById,
	setDividerParam,
} from "@/modules/divider/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { getDividerIcon } from "../logic";

type Options = Omit<UseIconSelectionOptions, "onSelected"> & {
	dividerId: string;
};

export function useDividerIcon({ dividerId, ...options }: Options) {
	const dispatch = useAppDispatch();
	const divider = useAppSelector((state) =>
		selectDividerById(state, dividerId),
	);

	const handleIconSelected = useCallback(
		({ icon, param }: { icon: Icon | null; param: string }) => {
			dispatch(
				setDividerParam({
					id: dividerId,
					key: param,
					value: icon,
				}),
			);
		},
		[dividerId, dispatch],
	);

	const startSelection = useIconSelection();

	const { icon: currentIcon } = options;

	return useCallback(
		({
			param,
			defaultIcon = options.defaultIcon ?? currentIcon,
		}: {
			param: string;
			defaultIcon?: Icon | null;
		}) => {
			const icon =
				divider &&
				getDividerIcon({
					divider,
					param,
					defaultIcon,
				});

			const start = () =>
				startSelection({
					icon,
					defaultIcon,
					onSelected(icon) {
						handleIconSelected({ icon, param });
					},
				});

			return [icon, start] as const;
		},
		[
			startSelection,
			divider,
			currentIcon,
			handleIconSelected,
			options.defaultIcon,
		],
	);
}
