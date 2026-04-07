import { appReducer } from "./app/shared/lib";
import { i18nReducer } from "./i18n/shared/lib";
import { iconsReducer } from "./icon/shared/lib";
import { routerReducer } from "./router/shared/lib";

export const coreModulesReducer = {
	...appReducer,
	...iconsReducer,
	...i18nReducer,
	...routerReducer,
};
