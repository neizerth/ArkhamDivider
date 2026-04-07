import type { ArkhamesqueClassicDividerParams } from "../../../../model";

export type EffectiveTitleOptions = {
	params: ArkhamesqueClassicDividerParams | undefined;
	titleKey: string;
	translate: (key: string) => string;
};

/** Custom title if set, otherwise translated `titleKey`. */
export function effectiveTitle(options: EffectiveTitleOptions) {
	const { params, titleKey, translate } = options;
	return params?.customTitle ?? translate(titleKey);
}

/** `100` → `1`, `50` → `0.5`. */
export function scaleFromPercent(percentScale: number) {
	return percentScale / 100;
}

export type ScenarioNumberScaleOptions = {
	params: ArkhamesqueClassicDividerParams | undefined;
	fontSizePercentScale: number;
};

/** Combines global font scale and optional scenario-number scale from params. */
export function scenarioNumberScale(options: ScenarioNumberScaleOptions) {
	const { params, fontSizePercentScale } = options;
	const userScale = (params?.scenarioNumberScale ?? 100) / 100;
	return scaleFromPercent(fontSizePercentScale) * userScale;
}
