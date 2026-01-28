// biome-ignore lint/suspicious/noExplicitAny: Redux Persist Migration
export default function setExportEnabled(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
		print: {
			...state.print,
			exportEnabled: false,
		},
	};
}
