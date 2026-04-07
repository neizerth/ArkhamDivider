import type { RootState } from "@/shared/store";
import { DEFAULT_LANGUAGE } from "../../../config";
import { selectLanguage } from "../i18n";

export const selectCurrentLanguage = (state: RootState) => {
	const language = selectLanguage(state) ?? DEFAULT_LANGUAGE;
	switch (language) {
		case "zh":
		case "zh_cn":
			return "cn";
		default:
			return language;
	}
};
