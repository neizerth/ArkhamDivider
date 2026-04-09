import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { getArkhamIndexDividerLayoutObjects } from "../lib";

export type ArkhamIndexDividerProps = DividerWithRelations<{
	icon?: Icon | null;
	customTitle?: string | null;
	custonFontSizeScale?: number;

	tabSize?: number;
	tabIndex?: number;
}>;

export type ArkhamIndexDividerLayout = DividerLayout<{
	size: "compact" | "large";
}>;

export type ArkhamIndexDividerSxOptions = {
	objects: ReturnType<typeof getArkhamIndexDividerLayoutObjects>;
};
