import type { BoxRect } from "../model";

export const preventDefault = <T extends { preventDefault: () => void }>(
	event: T,
) => {
	event.preventDefault();
};

const rectKeys: (keyof BoxRect)[] = [
	"top",
	"right",
	"bottom",
	"left",
	"width",
	"height",
];

export const getRelativeWidthRect = ({
	node,
	container,
}: {
	node: HTMLElement;
	container: HTMLElement;
}) => {
	const nodeRect = node.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	return {
		top: (nodeRect.top - containerRect.top) / containerRect.width,
		right: (containerRect.right - nodeRect.right) / containerRect.width,
		bottom: (containerRect.bottom - nodeRect.bottom) / containerRect.width,
		left: (nodeRect.left - containerRect.left) / containerRect.width,
		width: nodeRect.width / containerRect.width,
		height: nodeRect.height / containerRect.width,
	};
};

export const isBoxRectEquals = (a: BoxRect, b: BoxRect, minDelta = 0.01) => {
	for (const key of rectKeys) {
		const diff = a[key] - b[key];
		if (Math.abs(diff) > minDelta) {
			return false;
		}
	}
	return true;
};
