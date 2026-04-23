import { compact } from "ramda-adjunct";
import { lazy, Suspense, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { DividerCategory } from "@/modules/divider/shared/model";

const Horizontal = lazy(() => import("./images/horizontal.svg?react"));
const Vertical = lazy(() => import("./images/vertical.svg?react"));

export function useDividerOrientationData(category?: DividerCategory) {
	const { t } = useTranslation();
	return useMemo(() => {
		return compact([
			category?.hasHorizontal && {
				id: "horizontal",
				label: t("orientation.horizontal"),
				value: "horizontal",
				icon: (
					<Suspense fallback={null}>
						<Horizontal />
					</Suspense>
				),
			},
			category?.hasVertical && {
				id: "vertical",
				label: t("orientation.vertical"),
				value: "vertical",
				icon: (
					<Suspense fallback={null}>
						<Vertical />
					</Suspense>
				),
			},
		]);
	}, [t, category?.hasHorizontal, category?.hasVertical]);
}
