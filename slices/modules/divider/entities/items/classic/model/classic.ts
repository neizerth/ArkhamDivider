import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getClassicLayoutObjects } from "../lib";

export type ClassicLayoutParams = {
	background: string;
};

export type ClassicDividerParams = Partial<{
	icon: Icon | null;
	background: Icon | null;
}>;

export type ClassicDividerObjects = ReturnType<typeof getClassicLayoutObjects>;

type ClassicDividerCallbackProps = {
	color: boolean;
	objects: ClassicDividerObjects;
};

export type ClassicDividerLocaleCallback =
	LocaleSxCallback<ClassicDividerCallbackProps>;

export type ClassicDividerSxCallback =
	PrintSxCallback<ClassicDividerCallbackProps>;
