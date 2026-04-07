/**
 * Pick the first browser language that the app supports.
 * Handles BCP 47 (`en-US` → `en`), underscores (`ru_RU` → `ru`), and `zh` / `zh_cn`.
 */
export const detectLanguage = (availableLanguages: string[]) => {
	const byLower = new Map(
		availableLanguages.map((code) => [code.toLowerCase(), code] as const),
	);

	const normalizeTag = (tag: string) =>
		tag.trim().toLowerCase().replace(/_/g, "-");

	const resolveTag = (tag: string): string | undefined => {
		const norm = normalizeTag(tag);
		if (!norm) {
			return undefined;
		}

		const exact = byLower.get(norm);
		if (exact) {
			return exact;
		}

		const base = norm.split("-")[0];
		if (!base) {
			return undefined;
		}

		const fromBase = byLower.get(base);
		if (fromBase) {
			return fromBase;
		}

		if (base === "zh") {
			return byLower.get("zh_cn") ?? byLower.get("zh");
		}

		return undefined;
	};

	const candidates: string[] = [];
	const seen = new Set<string>();

	const push = (tag: string | undefined) => {
		if (!tag || seen.has(tag)) {
			return;
		}
		seen.add(tag);
		candidates.push(tag);
	};

	if (typeof navigator !== "undefined") {
		for (const tag of navigator.languages ?? []) {
			push(tag);
		}
		push(navigator.language);
	}

	for (const tag of candidates) {
		const match = resolveTag(tag);
		if (match) {
			return match;
		}
	}

	return undefined;
};
