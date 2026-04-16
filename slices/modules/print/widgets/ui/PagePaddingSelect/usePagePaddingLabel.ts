import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { selectPagePadding } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { isUniformBoxPosition } from "@/shared/util";

export const usePagePaddingLabel = () => {
	const { t } = useTranslation();
	const padding = useAppSelector(selectPagePadding);
	const { top, right, bottom, left } = padding;
	const isUniform = isUniformBoxPosition(padding);

	return useMemo(() => {
		const fmt = (value: number) => {
			return !value ? t(`None`) : `${value} ${t`mm`}`;
		};

		if (isUniform) {
			return fmt(top);
		}
		return `↑${top} ↓${bottom} / ⇤${left} ⇥${right} ${t`mm`}`;
	}, [isUniform, top, right, bottom, left, t]);
};
