import type { IconPositionManifest } from "../../model";
import campaign from "./campaign";
import challenge from "./challenge";
import common from "./common";
import custom from "./custom";
import side from "./side";
import { initialIcon } from "./util";

type HotState = {
	manifest: IconPositionManifest;
	version: number;
	listeners: Set<() => void>;
};

const state: HotState = import.meta.hot?.data.state ?? {
	manifest: {} as IconPositionManifest,
	version: 0,
	listeners: new Set(),
};

if (import.meta.hot) {
	import.meta.hot.data.state = state;
}

const apply = (next: IconPositionManifest) => {
	for (const key of Object.keys(state.manifest)) {
		if (!(key in next)) {
			delete state.manifest[key];
		}
	}

	Object.assign(state.manifest, next);
	state.version += 1;
	for (const listener of state.listeners) {
		listener();
	}
};

apply({
	initial: initialIcon,
	...campaign,
	...custom,
	...side,
	...challenge,
	...common,
} as IconPositionManifest);

export default state.manifest;

export const subscribeIconPositionManifest = (listener: () => void) => {
	state.listeners.add(listener);
	return () => {
		state.listeners.delete(listener);
	};
};

export const getIconPositionManifestVersion = () => state.version;

if (import.meta.hot) {
	import.meta.hot.accept(
		["./campaign", "./custom", "./side", "./challenge", "./common"],
		(modules) => {
			if (!modules) {
				return;
			}

			const [nextCampaign, nextCustom, nextSide, nextChallenge, nextCommon] =
				modules;

			apply({
				initial: initialIcon,
				...(nextCampaign?.default ?? campaign),
				...(nextCustom?.default ?? custom),
				...(nextSide?.default ?? side),
				...(nextChallenge?.default ?? challenge),
				...(nextCommon?.default ?? common),
			} as IconPositionManifest);
		},
	);
}
