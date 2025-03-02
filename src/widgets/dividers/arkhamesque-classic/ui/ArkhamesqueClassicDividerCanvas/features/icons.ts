import type { IIcon } from "@/shared/model/types/api";
import type { IIconContainer } from "./size";

export const getIconPosition = ({
	container,
	icon,
	scale,
	...options
}: {
	container?: IIconContainer;
	icon: IIcon;
	scale: number;
	top: number;
	left: number;
}) => {
	let left = options.left * scale;
	let top = options.top * scale;

	if (container) {
		const position = alignContainerIcon({
			container,
			scale,
			icon,
		});

		left += position.left;
		top += position.top;
	}

	return {
		left,
		top,
	};
};

export const alignContainerIcon = ({
	container,
	scale,
	icon,
}: {
	container: IIconContainer;
	scale: number;
	icon: IIcon;
}) => {
	const { alignX = "center", alignY = "center" } = container;

	let left = container.x * scale;
	let top = container.y * scale;

	switch (alignX) {
		case "right":
			left += container.width - icon.width;
			break;
		case "center":
			left += Math.round((container.width * scale - icon.width) / 2);
	}

	switch (alignY) {
		case "bottom":
			top += container.height - icon.height;
			break;
		case "center":
			top += Math.round((container.height * scale - icon.height) / 2);
	}

	return {
		left,
		top,
	};
};
