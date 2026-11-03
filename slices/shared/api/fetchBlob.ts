export const fetchBlob = async (url: string) => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to download file: ${response.status}`);
	}

	return response.blob();
};
