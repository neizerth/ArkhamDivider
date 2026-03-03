export function getImageExtensionByMime(mime: string): string {
	if (mime.startsWith("image/svg")) {
		return "svg";
	}
	return mime.split("/")[1] ?? "png";
}
