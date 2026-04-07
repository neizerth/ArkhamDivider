export const sanitizeHTML = (html: string): string => {
	const container = document.createElement("div");
	container.innerHTML = html.replace(/<br\/?>/, "\n");
	return container.textContent ?? "";
};

export const prefix =
	(prefix: string) =>
	(
		templateStrings: TemplateStringsArray | string,
		...substitutions: unknown[]
	) => {
		if (templateStrings == null) {
			return prefix;
		}
		if (typeof templateStrings === "string") {
			return `${prefix}${templateStrings}`;
		}
		if (!Array.isArray(templateStrings)) {
			return `${prefix}${String(templateStrings)}`;
		}
		const right = templateStrings.reduce(
			(acc, curr, index) => acc + curr + (substitutions[index] ?? ""),
			"",
		);
		return `${prefix}${right}`;
	};
