import { coreModulesReducer } from "./core/reducer";
import { dividerReducer } from "./divider/shared/lib";
import { printReducer } from "./print/shared/lib";
import { storyReducer } from "./story/shared/lib";

export const modulesReducer = {
	...coreModulesReducer,
	...printReducer,
	...dividerReducer,
	...storyReducer,
};
