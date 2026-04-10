import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	getIconChar,
	getIconCodepointFormat,
	getIconCSSFormat,
	getIconHTMLFormat,
	getIconJavaScriptFormat,
} from "@/modules/core/icon/shared/lib";
import type { ArkhamDividerIcon } from "@/modules/core/icon/shared/model";

export const useCopyFormats = ({ code, icon }: ArkhamDividerIcon) => {
	const { t } = useTranslation();
	return useMemo(() => {
		const char = getIconChar(code);
		const html = getIconHTMLFormat(code);
		const css = getIconCSSFormat(code);
		const javascript = getIconJavaScriptFormat(code);
		const codepoint = getIconCodepointFormat(code);
		return [
			{
				key: "symbol",
				label: t("icon.copy.symbol"),
				value: char,
			},
			{
				key: "name",
				label: t("icon.copy.name"),
				value: icon,
			},
			{
				key: "codepoint",
				label: t("icon.copy.codepoint"),
				value: codepoint,
			},
			{
				key: "html",
				label: t("icon.copy.html"),
				value: html,
			},
			{
				key: "css",
				label: t("icon.copy.css"),
				value: css,
			},
			{
				key: "javascript",
				label: t("icon.copy.javascript"),
				value: javascript,
			},
		] as const;
	}, [t, code, icon]);
};
