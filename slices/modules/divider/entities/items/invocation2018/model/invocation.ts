import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerOrientation } from "@/modules/divider/shared/model";
import type { Faction } from "@/modules/faction/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getInvocation2018LayoutObjects } from "../lib";

export type Invocation2018DividerParams = Partial<{
	icon: Icon | null;
}>;

export type Invocation2018DividerObjects = ReturnType<
	typeof getInvocation2018LayoutObjects
>;

export type Invocation2018DividerCallbackProps = {
	orientation: DividerOrientation;
	color: boolean;
	objects: Invocation2018DividerObjects;
	faction?: Faction;
	layout: string;
};

export type Invocation2018DividerLocaleCallback =
	LocaleSxCallback<Invocation2018DividerCallbackProps>;

export type Invocation2018DividerSxCallback =
	PrintSxCallback<Invocation2018DividerCallbackProps>;
