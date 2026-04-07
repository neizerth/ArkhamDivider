import { createAction } from "@reduxjs/toolkit";
import type { DPI } from "@/modules/print/shared/model";

type DownloadDividersAsPDFPayload = {
	dpi?: DPI;
};

export const downloadDividersAsPDF = createAction<DownloadDividersAsPDFPayload>(
	`render/downloadDividersAsPDF`,
);
