import CropLandscapeIcon from "@mui/icons-material/CropLandscape";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useDividerOrientationData() {
	const { t } = useTranslation();
	return useMemo(() => {
		return [
			{
				id: "horizontal",
				label: t("orientation.horizontal"),
				value: "horizontal",
				icon: <CropLandscapeIcon />,
			},
			{
				id: "vertical",
				label: t("orientation.vertical"),
				value: "vertical",
				icon: <CropPortraitIcon />,
			},
		];
	}, [t]);
}
