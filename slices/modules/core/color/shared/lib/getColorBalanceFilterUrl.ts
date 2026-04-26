import type { ColorBalanceFilter } from "../model";

type M3 = [
	[number, number, number],
	[number, number, number],
	[number, number, number],
];

/**
 * Tuned to approximate PhotoShop Cyan–Red, Magenta–Green, Yellow–Blue (signed −100..+100);
 * not identical to “Preserve luminosity” or tone splits — global 3×3, small multipliers.
 */
const CR = { kR: 0.24, kGB: 0.12 } as const;
const MG = { kG: 0.24, kRB: 0.12 } as const;
const YB = { kB: 0.2, kRG: 0.09 } as const;

/**
 * Pull the composed matrix toward identity. A low value keeps the ruddy `background.avif`
 * too warm when the **config** (e.g. eoe: cyan/blue, tsk: +red) is already the PS reference
 * — the preview then misses ref photo 2. A high value is closer to full matrix (≈ PS intent);
 * fhv and other hot stacks may need a smaller strength or config tweaks. Tune ~0.8…0.95.
 */
const PS_COLOR_BALANCE_STRENGTH = 0.9;

function dampenTowardIdentity(m: M3, strength: number): M3 {
	const s = Math.max(0, Math.min(1, strength));
	const out: M3 = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const base = i === j ? 1 : 0;
			out[i][j] = base + (m[i][j] - base) * s;
		}
	}
	return out;
}

function matMul(a: M3, b: M3): M3 {
	const c: M3 = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
		}
	}
	return c;
}

/** Cyan/Red: negative `r` = toward cyan. */
function axisCyanRed(r: number): M3 {
	// r already in [−1, 1]
	return [
		[1 + CR.kR * r, 0, 0],
		[0, 1 - CR.kGB * r, 0],
		[0, 0, 1 - CR.kGB * r],
	];
}

/** Magenta/Green: negative `g` = toward magenta. */
function axisMagentaGreen(g: number): M3 {
	return [
		[1 - MG.kRB * g, 0, 0],
		[0, 1 + MG.kG * g, 0],
		[0, 0, 1 - MG.kRB * g],
	];
}

/** Yellow/Blue: negative `b` = toward yellow, positive = toward blue. */
function axisYellowBlue(b: number): M3 {
	return [
		[1 - YB.kRG * b, 0, 0],
		[0, 1 - YB.kRG * b, 0],
		[0, 0, 1 + YB.kB * b],
	];
}

function isNearIdentity(m: M3): boolean {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (Math.abs(m[i][j] - (i === j ? 1 : 0)) > 1e-4) {
				return false;
			}
		}
	}
	return true;
}

/**
 * PhotoShop-style midtone color balance as `feColorMatrix` in an SVG, for `filter: url(…)`.
 * Stack: same order as the PS sliders top→bottom, applied to the color vector (CR, then MG, then YB).
 */
export function getColorBalanceFilterUrl(
	c: ColorBalanceFilter,
	filterId: string = "c",
): string | undefined {
	const rN = (c.red ?? 0) / 100;
	const gN = (c.green ?? 0) / 100;
	const bN = (c.blue ?? 0) / 100;
	if (rN === 0 && gN === 0 && bN === 0) {
		return undefined;
	}

	// p' = M_YB * M_MG * M_CR * p
	const mRaw = matMul(
		axisYellowBlue(bN),
		matMul(axisMagentaGreen(gN), axisCyanRed(rN)),
	);
	const m3 = dampenTowardIdentity(mRaw, PS_COLOR_BALANCE_STRENGTH);
	if (isNearIdentity(m3)) {
		return undefined;
	}

	const v = [
		m3[0][0],
		m3[0][1],
		m3[0][2],
		0,
		0,
		m3[1][0],
		m3[1][1],
		m3[1][2],
		0,
		0,
		m3[2][0],
		m3[2][1],
		m3[2][2],
		0,
		0,
		0,
		0,
		0,
		1,
		0,
	];
	const safeId = /[^a-zA-Z0-9_-]/.test(filterId) ? "c" : filterId;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="${safeId}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${v.join(" ")}"/></filter></svg>`;
	return `url("data:image/svg+xml,${encodeURIComponent(svg)}#${safeId}")`;
}
