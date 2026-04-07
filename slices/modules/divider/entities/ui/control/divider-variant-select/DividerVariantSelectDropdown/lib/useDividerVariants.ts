import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { selectCategory, selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";

export const useDividerVariants = () => {
	const { t } = useTranslation();
	const category = useAppSelector(selectCategory);
	const layout = useAppSelector(selectLayout);

	return useMemo(() => {
		if (!category || !layout) {
			return [];
		}

		return category.layouts
			.filter(({ color, orientation }) => {
				return color === layout.color && orientation === layout.orientation;
			})
			.map((layout) => {
				return {
					id: layout.id,
					label: t(layout.name),
					value: layout.id,
				};
			});
	}, [category, layout, t]);
};
