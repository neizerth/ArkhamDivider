/** Drop lazy divider slice from persisted root (handled via inject + API fetch). */
// biome-ignore lint/suspicious/noExplicitAny: Redux Persist migration
export default function dropArkhamesqueClassicPersist(state?: any) {
	if (!state || typeof state !== "object") {
		return state;
	}
	if (!("arkhamesqueClassic" in state)) {
		return state;
	}
	const { arkhamesqueClassic: _removed, ...rest } = state;
	return rest;
}
