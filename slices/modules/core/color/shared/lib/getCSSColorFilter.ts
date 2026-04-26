import type { ColorFilter } from "../model";
import { getColorBalanceFilterUrl } from "./getColorBalanceFilterUrl";

const clampPercent = (n: number) => Math.max(0, n);

/**
 * PhotoShop Brightness/Contrast uses a signed slider (−100…+100). CSS `contrast(X%)` is not
 * the same curve: `contrast(100 + ps)` (e.g. 200% for `+100`) is usually **stronger** than PS
 * at the same number. Map with a factor so `+100` PS ≈ `contrast(100 + 100 * k)` — tune `k`
 * against a PS reference.
 */
const PS_CONTRAST_TO_CSS_FACTOR = 0.5;

function photoshopContrastToCssPercent(psContrast: number): number {
	return 100 + psContrast * PS_CONTRAST_TO_CSS_FACTOR;
}

/**
 * Combined **Brightness** (B/C) and **Lightness** (H/S) in PS are signed. For **negative** sums,
 * CSS `brightness(100+sum)%` usually reads **darker** than the same value in PS; positive sums
 * are left 1:1. Tune 0.7…0.9 vs a PS preview.
 */
const PS_LUMINANCE_DARKEN_TO_CSS = 0.5;

function photoshopLuminanceToCssPercent(
	brightness: number | undefined,
	lightness: number | undefined,
): number {
	const sum = (brightness ?? 0) + (lightness ?? 0);
	if (sum >= 0) {
		return 100 + sum;
	}
	return 100 + sum * PS_LUMINANCE_DARKEN_TO_CSS;
}

/**
 * When any layer uses `colorBalance` (`feColorMatrix`), the same PS numbers look **darker**
 * in a browser than in PhotoShop. Apply a final `brightness()` lift so config stays
 * untuned — adjust only this constant to match a PS reference.
 */
const PS_COLOR_BALANCE_END_LIFT = 3.2;

/**
 * PhotoShop `ColorFilter` values → `filter` (GPU, approximate). `contrast` uses
 * `photoshopContrastToCssPercent`; `brightness`/`lightness` use `photoshopLuminanceToCssPercent`.
 *
 * **Color balance:** Cyan/Red, Magenta/Green, Yellow/Blue are mapped to an SVG `feColorMatrix`
 * (as `url(data:…)`) and composed like the PS panel (C/R → M/G → Y/B), with signed
 * `red`/`green`/`blue` in [-100, +100] — **not** `hue-rotate` (that was misleading). Midtone
 * / shadow / highlight split is not modeled; only global multiplicative RGB.
 *
 * **Filter order with `colorBalance`:** `saturate` + `brightness` from the same layer, then
 * the color-balance `url(…)`, then `hue-rotate` / `contrast` from the rest of the layer.
 *
 * **Multiple layers:** `ColorFilter[]` — index `0` = bottom, leftmost in the final `filter` string
 * (PS-style stack order).
 */
function colorFilterLayerToCss(filter: ColorFilter): string | undefined {
	const { colorBalance, ...rest } = filter;
	const parts: string[] = [];

	const hue = rest.hue ?? 0;
	const hasHue = rest.hue != null;
	const sat = 100 + (rest.saturation ?? 0);
	const hasSat = rest.saturation != null;
	const hasBr = rest.brightness != null || rest.lightness != null;

	if (colorBalance) {
		if (hasSat) {
			parts.push(`saturate(${clampPercent(sat)}%)`);
		}
		if (hasBr) {
			parts.push(
				`brightness(${clampPercent(photoshopLuminanceToCssPercent(rest.brightness, rest.lightness))}%)`,
			);
		}
		const balanceUrl = getColorBalanceFilterUrl(colorBalance);
		if (balanceUrl) {
			parts.push(balanceUrl);
		}
		if (hasHue) {
			parts.push(`hue-rotate(${hue}deg)`);
		}
		if (rest.contrast != null) {
			parts.push(
				`contrast(${clampPercent(photoshopContrastToCssPercent(rest.contrast))}%)`,
			);
		}
	} else {
		if (hasHue) {
			parts.push(`hue-rotate(${hue}deg)`);
		}
		if (hasSat) {
			parts.push(`saturate(${clampPercent(sat)}%)`);
		}
		if (hasBr) {
			parts.push(
				`brightness(${clampPercent(photoshopLuminanceToCssPercent(rest.brightness, rest.lightness))}%)`,
			);
		}
		if (rest.contrast != null) {
			parts.push(
				`contrast(${clampPercent(photoshopContrastToCssPercent(rest.contrast))}%)`,
			);
		}
	}

	return parts.length > 0 ? parts.join(" ") : undefined;
}

function filterHasColorBalance(f: ColorFilter): boolean {
	return f.colorBalance != null;
}

export function getColorFilterCssValue(
	filter: ColorFilter | ColorFilter[],
): string | undefined {
	const layers = Array.isArray(filter) ? filter : [filter];
	if (layers.length === 0) {
		return undefined;
	}
	const built = layers
		.map((layer) => colorFilterLayerToCss(layer))
		.filter((s): s is string => s != null);
	if (built.length === 0) {
		return undefined;
	}
	const out = built.join(" ");
	if (!layers.some(filterHasColorBalance)) {
		return out;
	}
	return `${out} brightness(${clampPercent(100 + PS_COLOR_BALANCE_END_LIFT)}%)`;
}
