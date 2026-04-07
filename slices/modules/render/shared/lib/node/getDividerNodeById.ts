import type { Side } from "@/shared/model";

type Options = {
	id: string;
	side?: Side;
};

export const getDividerNodeById = (options: Options) => {
	const { id, side } = options;
	const nodeId = `${id}:${side ?? "front"}`;
	const node = document.querySelector(`[data-divider-node-id="${nodeId}"]`);

	if (!node) {
		throw new Error(
			`Divider node with id ${id}${side ? ` (${side})` : ""} not found`,
		);
	}

	return node;
};
