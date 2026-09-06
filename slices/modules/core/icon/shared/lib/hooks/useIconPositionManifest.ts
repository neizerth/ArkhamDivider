import { useSyncExternalStore } from "react";
import defaultIconPositionManifest, {
	getIconPositionManifestVersion,
	subscribeIconPositionManifest,
} from "../../config/position";
import type { IconPositionManifest } from "../../model";

export const useIconPositionManifest = (): IconPositionManifest => {
	useSyncExternalStore(
		subscribeIconPositionManifest,
		getIconPositionManifestVersion,
		getIconPositionManifestVersion,
	);

	return defaultIconPositionManifest;
};
