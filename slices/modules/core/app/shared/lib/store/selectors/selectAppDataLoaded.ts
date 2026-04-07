import type { RootState } from "@/shared/store";

export const selectAppDataLoaded = (store: RootState) => {
	const { stories } = store;
	return stories.ids.length > 0;
};
