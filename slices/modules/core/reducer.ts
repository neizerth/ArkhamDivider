import { appReducer } from "./app/shared/lib";
import { i18nReducer } from "./i18n/shared/store";
import { iconsReducer } from "./icon/shared/lib";

export const coreModulesReducer = {
	...appReducer,
	...iconsReducer,
	...i18nReducer,
};
