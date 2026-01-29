import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import type { DPI } from "@/modules/print/shared/model";

export type RenderStatus = "idle" | "pending" | "success" | "error";

export type RenderType = "pdf" | "image" | "zip";

export type ColorScheme = "rgb" | "cmyk";

export type ImageFormat = "png" | "tiff";

export type DividerRender = DividerWithRelations & {
	icons: Record<string, Icon>;
	backgroundUrl: string;
	language: string;
	dpi: DPI;
	bleed: number;
};
