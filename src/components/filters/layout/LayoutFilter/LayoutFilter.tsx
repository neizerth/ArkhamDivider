import S from "./LayoutFilter.module.scss";

import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import {
	selectCategoryId,
	selectLayout,
	selectType,
} from "@/app/store/features/layout/layout";
import { getLayouts } from "@/shared/lib/features/layouts/common";
import { isNotNil, prop, uniq } from "ramda";
import { LayoutColorToggle } from "../LayoutColorToggle/LayoutColorToggle";
import { LayoutOrientationToggle } from "../LayoutOrientationToggle/LayoutOrientationToggle";
import { LayoutCategorySelect } from "../LayoutCategorySelect/LayoutCategorySelect";
import { LayoutSelect } from "../LayoutSelect/LayoutSelect";

export const LayoutFilter = () => {
	const layout = useAppSelector(selectLayout);

	const { color, orientation } = layout;

	const type = useAppSelector(selectType);
	const selectedCategoryId = useAppSelector(selectCategoryId);
	const categoryId = selectedCategoryId || layout.categoryId;

	const cateogoryLayouts = getLayouts({
		criteria: {
			categoryId,
			type,
			orientation,
			color,
		},
	});

	const colorLayouts = getLayouts({
		criteria: {
			categoryId,
			orientation,
		},
	});

	const orientationLayouts = getLayouts({
		criteria: {
			categoryId,
			color,
			type,
		},
	});

	const haveColor =
		uniq(colorLayouts.map(prop("color")).filter(isNotNil)).length > 1;

	const haveOrientation =
		uniq(orientationLayouts.map(prop("orientation")).filter(isNotNil)).length >
		1;

	return (
		<div className={S.container}>
			<LayoutCategorySelect className={S.categorySelect} />
			{categoryId && (
				<>
					{haveOrientation && (
						<LayoutOrientationToggle data={orientationLayouts} />
					)}
					{haveColor && (
						<LayoutColorToggle className={S.color} data={colorLayouts} />
					)}
					{cateogoryLayouts.length > 1 && (
						<LayoutSelect className={S.layoutSelect} data={cateogoryLayouts} />
					)}
				</>
			)}
		</div>
	);
};
