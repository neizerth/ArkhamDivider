import { mergeDeepRight } from "ramda";
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
	size: 7.9,
	fontSize: 7.2,
	top: 2.1,
	right: 1,
};

const xpObject = {
	container: {
		fontSize: 2,
		top: 9.3,
		right: 1.5,
	},
	side: {
		top: 3.9,
		right: 11,
		fontSize: 5,
		height: 7.5,
		paddingInline: 2,
	},
};

export const invocation2018DividerHorizontalObjects = mergeDeepRight(
	classicDividerHorizontalObjects,
	{
		text: {
			default: defaultTextObject,
		},
		icon: iconObject,
		xp: xpObject,
	},
);

const verticalXPObject = mergeDeepRight(xpObject, {
	container: {
		right: 2.2,
	},
	side: {
		top: 3.6,
	},
});

export const invocation2018DividerVertical63Objects = {
	...mergeDeepRight(classicDividerVertical63Objects, {
		text: {
			default: defaultTextObject,
		},
		icon: { ...iconObject, right: 1.4 },
		xp: verticalXPObject,
	}),
};

export const invocation2018DividerVertical65Objects = {
	...mergeDeepRight(classicDividerVertical65Objects, {
		text: {
			default: defaultTextObject,
		},
		icon: { ...iconObject, right: 2.2 },
		xp: mergeDeepRight(verticalXPObject, {
			container: { right: 3.2 },
			side: { right: 12 },
		}),
	}),
};
