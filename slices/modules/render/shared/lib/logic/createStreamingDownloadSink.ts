import { Buffer } from "buffer";

export type StreamingDownloadSink = {
	write: (chunk: Buffer | Uint8Array) => Promise<void>;
	close: () => Promise<void>;
	abort: () => Promise<void>;
};

export type CreateStreamingDownloadSinkOptions = {
	suggestedName: string;
	mimeType: string;
	types?: Array<{ description: string; accept: Record<string, string[]> }>;
};

function toUint8Array(chunk: Buffer | Uint8Array): Uint8Array {
	if (Buffer.isBuffer(chunk)) {
		return new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
	}
	return chunk;
}

type ShowSaveFilePicker = (options?: {
	suggestedName?: string;
	types?: Array<{ description?: string; accept: Record<string, string[]> }>;
}) => Promise<FileSystemFileHandle>;

/**
 * Streaming download: File System Access API when available, otherwise Blob + `<a download>`.
 */
export async function createStreamingDownloadSink(
	options: CreateStreamingDownloadSinkOptions,
): Promise<StreamingDownloadSink> {
	const { suggestedName, mimeType, types } = options;

	const showSaveFilePicker = (
		globalThis as { showSaveFilePicker?: ShowSaveFilePicker }
	).showSaveFilePicker;

	if (typeof showSaveFilePicker === "function") {
		try {
			const handle = await showSaveFilePicker({
				suggestedName,
				types,
			});
			const writable = await handle.createWritable();
			return {
				write: (chunk) => writable.write(toUint8Array(chunk) as BufferSource),
				close: () => writable.close(),
				abort: () => writable.abort(),
			};
		} catch (e) {
			if (e instanceof DOMException && e.name === "AbortError") {
				throw e;
			}
		}
	}

	let aborted = false;
	const chunks: Uint8Array[] = [];

	return {
		write: async (chunk) => {
			if (aborted) {
				return;
			}
			chunks.push(toUint8Array(chunk));
		},
		close: async () => {
			if (aborted) {
				return;
			}
			const blob = new Blob(chunks as BlobPart[], { type: mimeType });
			const url = URL.createObjectURL(blob);
			try {
				const a = document.createElement("a");
				a.href = url;
				a.download = suggestedName;
				a.rel = "noopener";
				document.body.appendChild(a);
				a.click();
				a.remove();
			} finally {
				URL.revokeObjectURL(url);
			}
		},
		abort: async () => {
			aborted = true;
			chunks.length = 0;
		},
	};
}
