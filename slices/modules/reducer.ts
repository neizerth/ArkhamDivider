import { coreModulesReducer } from "./core/reducer";
import { printReducer } from "./print/shared/lib";

export const modulesReducer = {
	...coreModulesReducer,
	...printReducer,
};
