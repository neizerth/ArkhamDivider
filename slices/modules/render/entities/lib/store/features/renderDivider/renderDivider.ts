import { createAction } from "@reduxjs/toolkit";
import type { DPI } from "@/modules/print/shared/model";
import type { ColorScheme, ImageFormat } from "@/modules/render/shared/model";

type RenderDividerPayload = {
	dividerId: string;
	dpi: DPI;
	colorScheme?: ColorScheme;
	imageFormat?: ImageFormat;
};

export const renderDivider =
	createAction<RenderDividerPayload>(`render/renderDivider`);

export type RenderDividerSuccessPayload =
	| RGBRenderDividerSuccessPayload
	| CMYKRenderDividerSuccessPayload;

type BaseRenderDividerSuccessPayload = {
	dividerId: string;
	imageFormat: ImageFormat;
};

export type RGBRenderDividerSuccessPayload = BaseRenderDividerSuccessPayload & {
	colorScheme: "rgb";
	contents: string;
};

export type CMYKRenderDividerSuccessPayload =
	BaseRenderDividerSuccessPayload & {
		colorScheme: "cmyk";
		contents: Uint8Array<ArrayBufferLike>;
	};

export const renderDividerSuccess = createAction<RenderDividerSuccessPayload>(
	`render/renderDividerSuccess`,
);

type RenderDividerFailurePayload = RenderDividerPayload & {
	error: string;
};

export const renderDividerFailure = createAction<RenderDividerFailurePayload>(
	`render/renderDividerFailure`,
);

export const cancelDividerRendering = createAction(
	`render/cancelDividerRendering`,
);
