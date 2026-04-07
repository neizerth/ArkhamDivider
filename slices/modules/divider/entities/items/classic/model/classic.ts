import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getClassicLayoutObjects, getIconObject } from "../lib";

export type ClassicLayoutParams = {
	background: string;
};

export type ClassicDividerParams = Partial<{
	customTitle: string;
	icon: Icon | null;
	background: Icon | null;
}>;

export type ClassicDividerObjects = ReturnType<typeof getClassicLayoutObjects>;

export type ClassicDividerCallbackProps = {
	layoutId: string;
	color: boolean;
	objects: ClassicDividerObjects;
	iconObject: ReturnType<typeof getIconObject>;
};

export type ClassicDividerLocaleCallback =
	LocaleSxCallback<ClassicDividerCallbackProps>;

export type ClassicDividerSxCallback =
	PrintSxCallback<ClassicDividerCallbackProps>;
