import localForage from "localforage";

export const mediaStore = localForage.createInstance({
	name: "media",
	storeName: "media",
	driver: localForage.INDEXEDDB,
	version: 1,
	description: "Media storage",
});
