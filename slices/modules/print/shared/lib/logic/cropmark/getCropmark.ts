import type {
	Cropmark,
	CropmarkPositionType,
	CropmarkType,
} from "../../../model";

const positions = {
	topLeft: {
		top: true,
		left: true,
	},
	topRight: {
		top: true,
		right: true,
	},
	bottomLeft: {
		bottom: true,
		left: true,
	},
	bottomRight: {
		bottom: true,
		right: true,
	},
};

type Options = {
	type: CropmarkType;
	position: CropmarkPositionType;
};

export const getCropmark = (options: Options): Cropmark => {
	const { type } = options;
	const position = positions[options.position];
	const id = `${type}-${options.position}`;

	return {
		id,
		type,
		position,
	};
};
