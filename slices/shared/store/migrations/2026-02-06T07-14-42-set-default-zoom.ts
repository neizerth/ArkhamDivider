// biome-ignore lint/suspicious/noExplicitAny: Redux Persist Migration
export default function setDefaultZoom(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
		print: {
			...state.print,
			previewZoom: null,
		},
	};
}
