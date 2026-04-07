import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getRynoDividerLayoutObjects } from "../lib/logic";

export type RynoDividerParams = {
	leftIcon?: Icon | null;
	backgroundIcon?: Icon | null;
	rightIcon?: Icon | null;
	headerColor?: string | null;
	customTitle?: string;
	customSubtitle?: string;
};

export type RynoDividerProps = DividerWithRelations<RynoDividerParams>;

export type RynoDividerLayoutObjects = ReturnType<
	typeof getRynoDividerLayoutObjects
>;

export type RynoDividerSxOptions = {
	objects: RynoDividerLayoutObjects;
};

export type RynoDividerSxCallback = PrintSxCallback<RynoDividerSxOptions>;

export type RynoDividerLocaleSxCallback<P = void> = LocaleSxCallback<
	RynoDividerSxOptions & NoInfer<P>
>;
