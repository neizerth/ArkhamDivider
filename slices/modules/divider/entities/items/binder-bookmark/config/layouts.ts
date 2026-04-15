import type {
	DividerLayout,
	DividerLayoutRenderOptions,
} from "@/modules/divider/shared/model";
import {
	setJpegDPITransform,
	stripJpegICCTransform,
} from "@/modules/render/shared/config";
import { createSize } from "@/shared/util";
import { binderBookmarkCategoryId } from "./common";

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

const layout: DividerLayout = {
	id: "binder-bookmark",
	types: ["player"],
	categoryId: binderBookmarkCategoryId,
	groupId: "binderBookmark",
	name: "3x3",
	orientation: "vertical",
	color: true,
	size: createSize(63, 330),
	printSize: {
		300: {
			size: createSize(744, 3898),
			bleedSize: createSize(815, 3969),
		},
	},
	bleed: 3,
	iconParams: ["icon"],
	renderOptions,
};

const a4: DividerLayout = {
	...layout,
	id: "binder-bookmark-a4",
	groupId: "a4",
	name: "A4",
	size: createSize(63, 291),
	printSize: {
		300: {
			size: createSize(744, 3437),
			bleedSize: createSize(815, 3508),
		},
	},
};

const duo: DividerLayout = {
	...layout,
	id: "binder-bookmark-duo",
	groupId: "duo",
	name: "2x2",
	size: createSize(63, 240),
	printSize: {
		300: {
			size: createSize(744, 2835),
			bleedSize: createSize(815, 2906),
		},
	},
};

const pocket: DividerLayout = {
	...layout,
	id: "binder-bookmark-pocket",
	groupId: "pocket",
	name: "divider.binder-bookmark.pocket.name",
	description: "divider.binder-bookmark.pocket.description",
	size: createSize(63, 105),
	printSize: {
		300: {
			size: createSize(744, 1240),
			bleedSize: createSize(815, 1311),
		},
	},
};

export const binderBookmarkLayouts: DividerLayout[] = [layout, a4, duo, pocket];
