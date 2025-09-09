import { appReducer } from "./app/shared/lib";
import { iconsReducer } from "./icon/shared/lib";

export const coreModulesReducer = {
	...appReducer,
	...iconsReducer,
	// ...i18nReducer,
};
