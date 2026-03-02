import { useCallback, useState } from "react";
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

type Options = Omit<UseIconSelectionOptions, "onSelected"> & {
	dividerId: string;
};

export function useDividerIcon({ dividerId, ...options }: Options) {
	const dispatch = useAppDispatch();
	const [customField, setCustomField] = useState<string | null>(null);
	const divider = useAppSelector((state) =>
		selectDividerById(state, dividerId),
	);

	const onSelected = useCallback(
		(icon: Icon | null) => {
			if (!customField) {
				return;
			}
			dispatch(
				setDividerParam({
					id: dividerId,
					key: customField,
					value: icon,
				}),
			);
			setCustomField(null);
		},
		[dividerId, customField, dispatch],
	);

	const startSelection = useIconSelection();

	const { icon: currentIcon } = options;

	return useCallback(
		({
			customField,
			defaultIcon = options.defaultIcon ?? currentIcon,
		}: {
			customField: string;
			defaultIcon?: Icon | null;
		}) => {
			const customIcon = divider?.params?.[customField];
			const icon = (customIcon ?? currentIcon) as Icon | undefined;

			const start = () => {
				setCustomField(customField);

				startSelection({
					icon,
					defaultIcon,
					onSelected,
				});
			};

			return [icon, start] as const;
		},
		[startSelection, divider, currentIcon, onSelected, options.defaultIcon],
	);
}
