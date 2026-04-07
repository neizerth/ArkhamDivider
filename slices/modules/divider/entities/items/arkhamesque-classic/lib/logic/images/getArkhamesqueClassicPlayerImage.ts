import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { isNotNil } from "ramda";
import { isBoolean, isNumber } from "ramda-adjunct";
import { getXPLevel } from "@/modules/divider/shared/lib";
import type { ArkhamesqueClassicDividerProps } from "../../../model";
import { withBuildPrefix } from "./helpers";

type Options = {
	data: IArkhamesqueBuild;
	divider: ArkhamesqueClassicDividerProps;
};

export const getArkhamesqueClassicPlayerImage = ({
	data,
	divider,
}: Options): string[] | undefined => {
	if (divider.layoutType !== "player") {
		return;
	}

	const found = findPlayerItem(data, divider);
	if (!found) {
		return;
	}

	const { categoryPrefix, item } = found;
	const parts = [categoryPrefix, item.name].filter(isNotNil);
	const filename = parts.join("");

	return [withBuildPrefix(data, filename)];
};

const getDefaultSubtype = (divider: ArkhamesqueClassicDividerProps) => {
	if (divider.layoutType !== "player") {
		return;
	}
	if (divider.faction === "multiclass" && divider.subtype === "investigators") {
		return "faction";
	}
	return divider.subtype;
};

export const findPlayerItem = (
	data: IArkhamesqueBuild,
	divider: ArkhamesqueClassicDividerProps,
) => {
	if (divider.layoutType !== "player") {
		return;
	}
	const xpCost = divider.xpCost ?? undefined;
	const xpLevel = getXPLevel(xpCost);

	// Map divider props to build item fields
	const subtype = getDefaultSubtype(divider);

	const { faction } = divider;
	const type = subtype ?? divider.cardType;

	for (const category of data.player) {
		const candidates = category.data.filter((item) => {
			if (item.faction && item.faction !== faction) {
				return false;
			}
			if (type && item.type !== type) {
				return false;
			}
			return true;
		});

		if (candidates.length === 0) {
			continue;
		}

		const match = pickBestPlayerItem({
			candidates,
			xpCost,
			xpLevel,
			faction,
			type,
		});

		if (!match) {
			continue;
		}

		return { categoryPrefix: category.prefix, item: match };
	}
};

const pickBestPlayerItem = ({
	candidates,
	xpCost,
	xpLevel,
	faction,
	type,
}: {
	candidates: Array<{ xp?: number | boolean; name: string }>;
	xpCost?: unknown;
	xpLevel: number | undefined;
	faction: string;
	type: string | null | undefined;
}) => {
	const hasXp = Boolean(xpCost);

	// Mirrors the v1 rules in `getPlayerDividerData.ts`.
	//
	// - subtype/type === "faction": exact XP match when XP selected; otherwise prefer a generic (no-xp) item.
	// - card types ("asset" | "event" | "skill"): when XP selected choose best numeric <= level; otherwise prefer a generic (no-xp) item.

	// subtype/type === "faction"
	if (type === "faction") {
		if (hasXp) {
			// Exact numeric XP bucket.
			if (isNumber(xpLevel)) {
				return candidates.find((c) => isNumber(c.xp) && c.xp === xpLevel);
			}
			// Boolean buckets (rare but supported).
			return candidates.find((c) => isBoolean(c.xp) && c.xp === true);
		}

		// No XP selected: prefer no-xp item, but multiclass has an empty-name entry
		// that often doesn't map to an actual file; prefer XP=0 there.
		const noXp = candidates.find((c) => c.xp == null);
		if (faction === "multiclass" && noXp?.name === "") {
			return candidates.find((c) => isNumber(c.xp) && c.xp === 0) ?? noXp;
		}
		return noXp ?? candidates.find((c) => isNumber(c.xp) && c.xp === 0);
	}

	// Card types ("asset" | "event" | "skill")
	if (type && ["asset", "event", "skill"].includes(type)) {
		if (!hasXp || !isNumber(xpLevel)) {
			// Prefer generic (no-xp) header, otherwise highest numeric XP.
			const noXp = candidates.find((c) => c.xp == null);
			if (noXp) {
				return noXp;
			}
			return candidates
				.filter((c) => isNumber(c.xp))
				.sort((a, b) => (b.xp as number) - (a.xp as number))[0];
		}

		// Best numeric XP <= level.
		const best = candidates
			.filter((c) => isNumber(c.xp) && (c.xp as number) <= xpLevel)
			.sort((a, b) => (b.xp as number) - (a.xp as number))[0];
		if (best) {
			return best;
		}

		// Fallback: exact faction-level bucket (v1 used faction fallback).
		return candidates.find((c) => isNumber(c.xp) && c.xp === xpLevel);
	}

	// Other subtypes: exact XP match when set; otherwise prefer no-xp if present.
	if (hasXp) {
		if (isNumber(xpLevel)) {
			const numeric = candidates.find(
				(c) => isNumber(c.xp) && c.xp === xpLevel,
			);
			if (numeric) {
				return numeric;
			}
		}
		return candidates.find((c) => isBoolean(c.xp) && c.xp === true);
	}

	return candidates.find((c) => c.xp == null) ?? candidates[0];
};
