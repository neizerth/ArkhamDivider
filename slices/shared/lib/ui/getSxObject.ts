import type { Theme } from "@mui/material/styles";
import type { BoxOwnProps } from "@mui/system/Box";
import { isArray, isObject } from "ramda-adjunct";

type Props = BoxOwnProps<Theme>;
type StyleProps = Props;
type StylePropKey = keyof StyleProps;
type SxPlainObject = Partial<Record<StylePropKey, unknown>>;

export const getSxObject = (sx: unknown) => {
	if (isObject(sx) && !isArray(sx)) {
		return sx as SxPlainObject;
	}

	return;
};
