export type BoxSize = {
	width: number;
	height: number;
};

export type BoxPosition = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type BoxRect = BoxSize & BoxPosition;
