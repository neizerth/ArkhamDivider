import { createAction } from "@reduxjs/toolkit";

type DownloadFileAsPayload = {
	url: string;
	name: string;
};

export const downloadFileAs =
	createAction<DownloadFileAsPayload>(`file/downloadFileAs`);
