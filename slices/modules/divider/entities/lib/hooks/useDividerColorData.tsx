import CircleIcon from "@mui/icons-material/Circle";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useDividerColorData() {
	const { t } = useTranslation();
	return useMemo(() => {
		return [
			{
				id: "color",
				label: t("color.color"),
				value: "color",

				icon: <ColorLensIcon />,
			},
			{
				id: "grayscale",
				label: t("color.grayscale"),
				value: "grayscale",
				icon: <CircleIcon />,
			},
		];
	}, [t]);
}
