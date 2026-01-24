// biome-ignore lint/suspicious/noExplicitAny: Redux Persist Migration
export default function <FTName | camelcase>(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
	};
}
