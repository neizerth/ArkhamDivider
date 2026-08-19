import type { ColorFilter } from "../model";
import { getColorFilterCssValue } from "./getCSSColorFilter";

/**
 * Applies a `ColorFilter` (or stack) to a DOM node by setting its
 * `style.filter` CSS property. The node is mutated in place and returned.
 */
export function applyColorFilterToNode<T extends HTMLElement>(
	node: T,
	filter: ColorFilter | ColorFilter[],
): T {
	const value = getColorFilterCssValue(filter);
	node.style.filter = value ?? "";
	return node;
}
