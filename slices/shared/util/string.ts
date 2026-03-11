export const sanitizeHTML = (html: string): string => {
	const container = document.createElement("div");
	container.innerHTML = html.replace(/<br\/?>/, "\n");
	return container.textContent ?? "";
};

export const prefix =
	(prefix: string) =>
	(
		templateStrings: TemplateStringsArray | string,
		..._substitutions: unknown[]
	) => {
		if (typeof templateStrings === "string") {
			return `${prefix}${templateStrings}`;
		}
		return `${prefix}${templateStrings[0]}`;
	};
