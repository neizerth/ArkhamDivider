import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import type { Faction } from "@/modules/faction/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getBinderBookmarkTitleObject } from "../lib/getBinderBookmarkTitleObject";

export type BinderBookmarkProps = DividerWithRelations<{
	icon?: Icon | null;
	customTitle?: string | null;
	custonFontSizeScale?: number;
}>;

export type BinderBookmarkSxOptions = {
	faction: Faction;
	titleObject: ReturnType<typeof getBinderBookmarkTitleObject>;
};

export type BinderBookmarkSxCallback<T = void> = PrintSxCallback<
	BinderBookmarkSxOptions & T
>;
