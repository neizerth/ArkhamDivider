import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Horizontal from "./images/horizontal.svg?react";
import Vertical from "./images/vertical.svg?react";

export function useDividerOrientationData() {
	const { t } = useTranslation();
	return useMemo(() => {
		return [
			{
				id: "horizontal",
				label: t("orientation.horizontal"),
				value: "horizontal",
				icon: <Horizontal />,
			},
			{
				id: "vertical",
				label: t("orientation.vertical"),
				value: "vertical",
				icon: <Vertical />,
			},
		];
	}, [t]);
}
