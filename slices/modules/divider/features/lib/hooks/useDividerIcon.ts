import { useCallback } from "react";
import {
	type UseIconSelectionOptions,
	useIconSelection,
} from "@/modules/core/icon/entities/lib";
import type { Icon } from "@/modules/core/icon/shared/model";
import {
	selectDividerById,
	setAllDividersParam,
	setDividerParam,
} from "@/modules/divider/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { getDividerIcon } from "../logic";

type Options = Omit<UseIconSelectionOptions, "onSelected" | "onSetToAll"> & {
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

	const handleIconSetToAll = useCallback(
		({ icon, param }: { icon: Icon | null; param: string }) => {
			dispatch(setAllDividersParam({ key: param, value: icon }));
		},
		[dispatch],
	);

	const startSelection = useIconSelection();

	const { icon: currentIcon } = options;

	return useCallback(
		({
			param,
			defaultIcon = options.defaultIcon ?? currentIcon,
			canSetToAll = true,
		}: {
			param: string;
			defaultIcon?: Icon | null;
			canSetToAll?: boolean;
		}) => {
			const icon =
				divider &&
				getDividerIcon({
					divider,
					param,
					defaultIcon,
				});

			const start = () => {
				const onSetToAll = canSetToAll
					? (icon: Icon | null) => handleIconSetToAll({ icon, param })
					: void 0;

				return startSelection({
					icon,
					defaultIcon,
					onSelected(icon) {
						handleIconSelected({ icon, param });
					},
					onSetToAll,
				});
			};
			return [icon, start] as const;
		},
		[
			startSelection,
			divider,
			currentIcon,
			handleIconSelected,
			handleIconSetToAll,
			options.defaultIcon,
		],
	);
}
