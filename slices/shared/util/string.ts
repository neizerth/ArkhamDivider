export const sanitizeHTML = (html: string): string => {
	const container = document.createElement("div");
	container.innerHTML = html.replace(/<br\/?>/, "\n");
	return container.textContent ?? "";
};
