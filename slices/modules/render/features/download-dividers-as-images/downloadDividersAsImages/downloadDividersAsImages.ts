import { createAction } from "@reduxjs/toolkit";
import type { DPI } from "@/modules/print/shared/model";
import type { ImageFormat } from "@/modules/render/shared/model";

type DownloadDividersAsImagesPayload = {
	imageFormat: ImageFormat;
	dpi?: DPI;
};

export const downloadDividersAsImages =
	createAction<DownloadDividersAsImagesPayload>(
		"render/downloadDividersAsImages",
	);
