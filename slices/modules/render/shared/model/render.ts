import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type RenderStatus = "idle" | "pending" | "success" | "error";

export type RenderType = "pdf" | "image" | "zip";

export type ColorScheme = "rgb" | "cmyk";

export type ImageFormat = "png" | "tiff";

export type DividerRender = DividerWithRelations & {
	background?: Uint8Array;
};
