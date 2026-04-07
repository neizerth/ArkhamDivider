import type { SxProps, Theme } from "@mui/material/styles";
import type { BoxOwnProps } from "@mui/system/Box";
import { isArray, isObject } from "ramda-adjunct";
import { getSxObject } from "./getSxObject";

type Props = BoxOwnProps<Theme>;
type StyleProps = Props;
type StylePropKey = keyof StyleProps;

type Options = {
	props: StyleProps;
	sx?: SxProps<Theme>;
	prop: StylePropKey;
};

export const getStyleProp = ({ props, prop, sx }: Options) => {
	const propsSx = getSxObject(props.sx);
	const sxObj = getSxObject(sx);

	const propsValue = props[prop];

	if (isObject(propsValue) && !isArray(propsValue)) {
		return propsValue;
	}

	if (propsSx) {
		return propsSx[prop];
	}

	if (sxObj) {
		return sxObj[prop];
	}
};
