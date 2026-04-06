import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type <FTName | pascalcase>DividerProps = DividerWithRelations<{
  icon?: Icon | null;
  customTitle?: string | null;
  custonFontSizeScale?: number;
}>;