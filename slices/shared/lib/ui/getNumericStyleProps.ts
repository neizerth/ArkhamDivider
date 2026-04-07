import type { Theme } from "@mui/material/styles";
import type { BoxOwnProps } from "@mui/system/Box";
import { isNumber } from "ramda-adjunct";
import { getSxObject } from "./getSxObject";

type Props = BoxOwnProps<Theme>;
type StyleProps = Props;
type StylePropKey = keyof StyleProps;
type StyleKeys = readonly StylePropKey[];

type ExtractedStyleResult<Keys extends StyleKeys> = {
	[K in Keys[number]]?: number;
};

type Options<Keys extends StyleKeys> = {
	props: StyleProps;
	properties: Keys;
};

export const getNumericStyleProps = <Keys extends StyleKeys>({
	props,
	properties,
}: Options<Keys>): ExtractedStyleResult<Keys> => {
	const { sx } = props;
	const sxObj = getSxObject(sx);

	const propsData = props as Partial<Record<StylePropKey, unknown>>;

	const result: Partial<Record<Keys[number], number>> = {};

	const parseToNumber = (value: unknown): number | undefined => {
		if (isNumber(value)) {
			return value;
		}

		if (typeof value === "string") {
			const trimmed = value.trim();
			// We only parse plain pixel strings produced by `usePrintUnit`, e.g. "12px".
			const match = trimmed.match(/^-?\d+(\.\d+)?px$/i);
			if (match) {
				return Number(trimmed.replace(/px$/i, ""));
			}
			// Optional: also parse raw numeric strings like "10".
			if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
				return Number(trimmed);
			}
		}

		return undefined;
	};

	for (const prop of properties) {
		const key = prop as Keys[number];
		const directValue = parseToNumber(propsData[prop]);

		if (directValue !== undefined) {
			result[key] = directValue;
			continue;
		}

		if (sxObj) {
			const fromSx = parseToNumber(sxObj[prop]);
			if (fromSx !== undefined) {
				result[key] = fromSx;
			}
		}
	}

	return result as ExtractedStyleResult<Keys>;
};
