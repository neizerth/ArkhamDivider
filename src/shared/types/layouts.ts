import {
	AddPlayerDividersOptions,
	AddStoryDividersOptions,
} from "@/shared/store/features/addDividers/addDividers";

export type ILayoutBleed = {
	width: number;
	height: number;
	top: number;
	left: number;
	right: number;
	bottom: number;
};

export type IEqualLayoutBleed = ILayoutBleed & {
	size: number;
};

export type ILayout = {
	id: string;
	categoryId: string;
	width: number;
	height: number;
	title: string;
	types: LayoutType[];
	orientation: LayoutOrientation;
	isDefault?: boolean;
	color: boolean;
	bleed: ILayoutBleed;
	maxCreditsGroupSize?: number;
	campaignOptions?: Partial<AddStoryDividersOptions>;
	playerOptions?: Partial<AddPlayerDividersOptions>;
	customParams?: Record<string, unknown>;
	async?: boolean;
};

export type ILayoutAuthorContact = {
	id: string;
	icon: string;
	url: string;
	title?: string;
};

export type ILayoutAuthor = {
	name: string;
	url?: string;
	image?: string;
	donationUrl?: string;
	contacts?: ILayoutAuthorContact[];
};

export type ILayoutCategory = {
	id: string;
	unlisted?: boolean;
	name: string;
	url?: string;
	info?: string;
	author?: ILayoutAuthor;
};

export enum LayoutType {
	SCENARIO = "scenario",
	PLAYER = "player",
	INVESTIGATOR = "investigator",
}

export enum LayoutOrientation {
	HORIZONTAL = "horizontal",
	VERTICAL = "vertical",
}

export type ILayoutCriteria = Partial<ILayout> & {
	type?: LayoutType;
};
