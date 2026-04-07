import {
	createStreamingDownloadSink,
	type StreamingDownloadSink,
} from "@/modules/render/shared/lib/logic/createStreamingDownloadSink";

export type PdfChunkSink = StreamingDownloadSink;

export function createPdfDownloadSink(): Promise<PdfChunkSink> {
	return createStreamingDownloadSink({
		suggestedName: "Arkham Divider.pdf",
		mimeType: "application/pdf",
		types: [
			{
				description: "PDF",
				accept: { "application/pdf": [".pdf"] },
			},
		],
	});
}
