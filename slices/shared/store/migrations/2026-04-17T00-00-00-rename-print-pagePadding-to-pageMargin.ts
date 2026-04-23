/** Rename `print.pagePadding` → `print.pageMargin` in persisted state. */
// biome-ignore lint/suspicious/noExplicitAny: Redux Persist migration
export default function renamePrintPagePaddingToPageMargin(state?: any) {
	if (!state?.print || typeof state.print !== "object") {
		return state;
	}
	const print = state.print as Record<string, unknown>;
	if (!("pagePadding" in print)) {
		return state;
	}
	const { pagePadding, ...restPrint } = print;
	return {
		...state,
		print: {
			...restPrint,
			pageMargin: pagePadding,
		},
	};
}
