import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type SimpleStickerProps = DividerWithRelations<{
	icon?: Icon | null;
}>;
