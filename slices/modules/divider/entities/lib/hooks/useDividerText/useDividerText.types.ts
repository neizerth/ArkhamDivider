import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type UseDividerTextOptions<T> = {
	divider: DividerWithRelations<T>;
	defaultValue?: string;
	param: string;
	fontSizeScaleParam?: string;
	custom?: boolean;
	/**
	 * By default font size scale is persisted on blur together with the text value.
	 * For non-editable fields (e.g. `contentEditable={false}`) blur never happens, but
	 * auto-fit still measures — enable this to persist scale as it changes.
	 */
	persistFontSizeScaleOnChange?: boolean;
};
