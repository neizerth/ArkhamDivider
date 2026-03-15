import {
	classicDividerHorizontalObjects,
	classicDividerVertical63Objects,
	classicDividerVertical65Objects,
} from "../../classic/config";

export const invocation2018CategoryId = "invocation-2018";

export const invocation2018DividerTextColor = "#2e2622";

const defaultTextObject = {
	left: 8.66,
	right: 11.56,
};

const iconObject = {
	...classicDividerHorizontalObjects.icon,
	size: 7.5,
	fontSize: 7.5,
	top: 2.5,
	right: 1.7,
};

const xpObject = {
	container: {
		fontSize: 2,
		top: 9.3,
		right: 2,
	},
	side: {
		top: 3.9,
		right: 11,
		fontSize: 5,
		height: 7.5,
		paddingInline: 2,
	},
};

export const invocation2018DividerHorizontalObjects = {
	...classicDividerHorizontalObjects,
	text: {
		...classicDividerHorizontalObjects.text,
		default: {
			...classicDividerHorizontalObjects.text.default,
			...defaultTextObject,
		},
	},
	icon: iconObject,
	xp: xpObject,
};

const verticalXPObject = {
	...xpObject,
	container: {
		...xpObject.container,
		right: 2.2,
	},
	side: {
		...xpObject.side,
		top: 3.6,
	},
};

export const invocation2018DividerVertical63Objects = {
	...classicDividerVertical63Objects,
	text: {
		...classicDividerVertical63Objects.text,
		default: {
			...classicDividerVertical63Objects.text.default,
			...defaultTextObject,
		},
	},
	icon: iconObject,
	xp: verticalXPObject,
};

export const invocation2018DividerVertical65Objects = {
	...classicDividerVertical65Objects,
	text: {
		...classicDividerVertical65Objects.text,
		default: {
			...classicDividerVertical65Objects.text.default,
			...defaultTextObject,
		},
	},
	icon: iconObject,
	xp: {
		...verticalXPObject,
		container: {
			...verticalXPObject.container,
			right: 3.3,
		},
		side: {
			...verticalXPObject.side,
			right: 12,
		},
	},
};
