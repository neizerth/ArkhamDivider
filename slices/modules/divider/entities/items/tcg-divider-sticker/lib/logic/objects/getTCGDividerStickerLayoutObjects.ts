import { mergeDeepRight } from "ramda";
import type { LayoutOrientation } from "@/modules/divider/entities/lib/store/features/changeLayoutOrientation";
import {
	tcgDividerSticker70x95Objects,
	tcgDividerSticker70x107HorizontalObjects,
} from "../../../config";
import type { TCGDividerStickerLayout } from "../../../model";

type Options = {
	layout: TCGDividerStickerLayout;
	withXP?: boolean;
	withScenario?: boolean;
	orientation?: LayoutOrientation;
};

type Objects = typeof tcgDividerSticker70x95Objects;

export const getTCGDividerStickerLayoutObjects = ({
	layout,
	withXP,
	withScenario,
	orientation,
}: Options): Objects => {
	const objects = getObjects(layout);

	const V = mergeDeepRight(objects, objects.vertical);

	const O = orientation === "vertical" ? V : objects;

	if (withXP) {
		return mergeDeepRight(O, O.withXP) as Objects;
	}
	if (withScenario) {
		return mergeDeepRight(O, O.withScenario) as Objects;
	}
	return O as Objects;
};

export const getObjects = (layout: TCGDividerStickerLayout): Objects => {
	if (
		layout.params?.dividerType === "70x107" &&
		layout.orientation === "horizontal"
	) {
		return tcgDividerSticker70x107HorizontalObjects;
	}
	return tcgDividerSticker70x95Objects;
};
