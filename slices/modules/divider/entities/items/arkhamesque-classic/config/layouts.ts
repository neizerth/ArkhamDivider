import type {
	DividerLayout,
	DividerLayoutRenderOptions,
} from "@/modules/divider/shared/model";
import {
	setJpegDPITransform,
	stripJpegICCTransform,
} from "@/modules/render/shared/config";
import { createSize } from "@/shared/util";
import { arkhamesqueClassicCategoryId } from "./common";

const renderOptions: DividerLayoutRenderOptions = {
	transformRecord: {
		jpeg: [
			{
				type: "colorspace",
				value: "srgb",
			},
			{
				type: "colorspace",
				value: "lab",
			},
			stripJpegICCTransform,
			{
				type: "cast",
				value: "uchar",
			},
			stripJpegICCTransform,
			{
				type: "set-icc",
				icc: "USWebCoatedSWOP.icc",
				transformOptions: {
					embedded: true,
					intent: 1,
					black_point_compensation: true,
				},
			},
			setJpegDPITransform,
		],
	},
};
const large: DividerLayout = {
	id: "arkhamesque-classic",
	types: ["scenario", "player", "investigator"],
	categoryId: arkhamesqueClassicCategoryId,
	groupId: "large",
	name: "divider.arkhamesque-classic.large",
	orientation: "horizontal",
	previewName: '3.25"',
	color: true,
	size: createSize(89.25, 79.77),
	printSize: {
		300: {
			size: createSize(1054, 942),
			bleedSize: createSize(1125, 1013),
		},
	},
	bleed: 3,
	iconParams: ["icon", "bottomIcon"],
	renderOptions,
};

const medium: DividerLayout = {
	...large,
	id: "arkhamesque-classic-3",
	groupId: "medium",
	name: "divider.arkhamesque-classic.medium",
	previewName: '3"',
	size: createSize(89.25, 77),
	printSize: {
		300: {
			size: createSize(1051, 898),
			bleedSize: createSize(1122, 969),
		},
	},
};

export const arkhamesqueClassicLayouts = [large, medium];
