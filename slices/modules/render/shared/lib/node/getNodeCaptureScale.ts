import type { DPI } from "@/modules/print/shared/model";
import { isMobileSafari } from "@/shared/config";
import type { BoxSize } from "@/shared/model";

export type GetNodeCaptureScaleOptions = {
	dpi: DPI;
	nodeRect: DOMRect;
	/** Logical divider size used for preview scaling compensation (mm in app model). */
	size: BoxSize;
	/** `modern-screenshot` maximum canvas dimension (pixels). */
	maximumCanvasSize?: number;
};

/**
 * `modern-screenshot` documents: DPI = 96 * scale (default scale = 1).
 * We compute a safe `scale` that targets the requested `dpi`, while respecting canvas limits.
 */
export const getNodeCaptureScale = ({
	dpi,
	nodeRect,
	size,
	maximumCanvasSize = 60_000,
}: GetNodeCaptureScaleOptions) => {
	// On mobile Safari we use CSS `transform: scale()` for preview fitting; that already
	// affects the node's layout box, so compensate to avoid oversampling.
	const previewCssScale = isMobileSafari ? nodeRect.width / size.width : 1;
	const desiredScale = dpi / 96 / Math.max(previewCssScale, 0.000_001);

	const maxScaleByWidth =
		nodeRect.width > 0 ? maximumCanvasSize / nodeRect.width : desiredScale;
	const maxScaleByHeight =
		nodeRect.height > 0 ? maximumCanvasSize / nodeRect.height : desiredScale;

	return Math.max(
		0.000_001,
		Math.min(desiredScale, maxScaleByWidth, maxScaleByHeight),
	);
};
