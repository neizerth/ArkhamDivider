export const sanitizeHTML = (html: string): string => {
	const container = document.createElement("div");
	container.innerHTML = html.replace(/<br\/?>/, "\n");
	return container.textContent ?? "";
};

export const prefix =
	(prefix: string) =>
	(templateStrings: TemplateStringsArray, ..._substitutions: unknown[]) =>
		`${prefix}${templateStrings[0]}`;
