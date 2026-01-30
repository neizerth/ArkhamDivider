export const getDividerNodeById = (id: string) => {
	const node = document.querySelector(`[data-divider-id="${id}"]`);

	if (!node) {
		throw new Error(`Divider node with id ${id} not found`);
	}

	return node;
};
