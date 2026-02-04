import type { RootState } from "@/shared/store";
import { DEFAULT_LANGUAGE } from "../../../config";
import { selectLanguage } from "../i18n";

export const selectCurrentLanguage = (state: RootState) =>
	selectLanguage(state) ?? DEFAULT_LANGUAGE;
