import type { Interpretation } from "wasm-vips";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type RenderStatus = "idle" | "pending" | "success" | "error";

export type RenderType = "pdf" | "image" | "zip";

export type ColorScheme = "rgb" | "cmyk";

export type ImageFormat = "png" | "tiff" | "jpeg";

export type ExternalICCProfileName = "USWebCoatedSWOP" | "ISOcoated_v2_300_eci";

export type ExternalICCProfile = `${ExternalICCProfileName}.icc`;

export type ICCProfile = "srgb" | "cmyk" | "p3" | ExternalICCProfile;

export type Colorspace = keyof typeof Interpretation;

export type DividerRender = DividerWithRelations & {
	background?: Uint8Array;
};
