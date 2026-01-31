import { getVips } from "../getVips";

const loadedProfiles: string[] = [];

export const setupIccProfile = async (filename: string) => {
	if (loadedProfiles.includes(filename)) {
		return;
	}

	const vips = await getVips();

	const url = `/icc-profiles/${filename}`;
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();

	const profile = new Uint8Array(buffer);

	if ("FS" in vips) {
		// biome-ignore lint/suspicious/noExplicitAny: forgotten FS typing
		await (vips as any).FS.writeFile(filename, profile);
		loadedProfiles.push(filename);
	}
};
