import { compact } from "ramda-adjunct";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { DividerCategory } from "@/modules/divider/shared/model";
import Horizontal from "./images/horizontal.svg?react";
import Vertical from "./images/vertical.svg?react";

export function useDividerOrientationData(category?: DividerCategory) {
	const { t } = useTranslation();
	return useMemo(() => {
		return compact([
			category?.hasHorizontal && {
				id: "horizontal",
				label: t("orientation.horizontal"),
				value: "horizontal",
				icon: <Horizontal />,
			},
			category?.hasVertical && {
				id: "vertical",
				label: t("orientation.vertical"),
				value: "vertical",
				icon: <Vertical />,
			},
		]);
	}, [t, category?.hasHorizontal, category?.hasVertical]);
}
