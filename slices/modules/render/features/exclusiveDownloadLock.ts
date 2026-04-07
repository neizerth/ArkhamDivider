export type ExclusiveDownloadKind = "pdf" | "zip";

let active: ExclusiveDownloadKind | null = null;

/** Returns false if the other bulk download (PDF vs ZIP) is already running. */
export function tryAcquireExclusiveDownload(
	kind: ExclusiveDownloadKind,
): boolean {
	if (active !== null && active !== kind) {
		return false;
	}
	active = kind;
	return true;
}

export function releaseExclusiveDownload(): void {
	active = null;
}
