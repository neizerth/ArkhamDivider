// biome-ignore lint/suspicious/noExplicitAny: Redux Persist Migration
export default function setDefaultDPI(state: any) {
	if (!state) {
		return;
	}

	return {
		...state,
		print: {
			...state.print,
			dpi: 300,
		},
	};
}
