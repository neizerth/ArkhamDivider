import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type { Faction } from "@/modules/faction/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getInvocation2018LayoutObjects } from "../lib";

export type ClassicLayoutParams = {
	background: string;
};

export type ClassicDividerParams = Partial<{
	icon: Icon | null;
	background: Icon | null;
}>;

export type Invocation2018DividerObjects = ReturnType<
	typeof getInvocation2018LayoutObjects
>;

export type Invocation2018DividerCallbackProps = {
	color: boolean;
	objects: Invocation2018DividerObjects;
	faction?: Faction;
};

export type Invocation2018DividerLocaleCallback =
	LocaleSxCallback<Invocation2018DividerCallbackProps>;

export type Invocation2018DividerSxCallback =
	PrintSxCallback<Invocation2018DividerCallbackProps>;
