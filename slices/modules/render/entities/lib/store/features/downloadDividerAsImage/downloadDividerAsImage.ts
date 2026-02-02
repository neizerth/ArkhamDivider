import { createAction } from "@reduxjs/toolkit";
import type { ImageFormat } from "@/modules/render/shared/model";

type DownloadDividerAsImagePayload = {
	dividerId: string;
	imageFormat: ImageFormat;
};

export const downloadDividerAsImage =
	createAction<DownloadDividerAsImagePayload>(`render/downloadDividerAsImage`);
