import CircleIcon from "@mui/icons-material/Circle";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { compact } from "ramda-adjunct";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { DividerCategory } from "@/modules/divider/shared/model";

export function useDividerColorData(category?: DividerCategory) {
	const { t } = useTranslation();

	return useMemo(() => {
		return compact([
			category?.hasColor && {
				id: "color",
				label: t("color.color"),
				value: "color",

				icon: <ColorLensIcon />,
			},
			category?.hasGrayscale && {
				id: "grayscale",
				label: t("color.grayscale"),
				value: "grayscale",
				icon: <CircleIcon />,
			},
		]);
	}, [t, category?.hasColor, category?.hasGrayscale]);
}
