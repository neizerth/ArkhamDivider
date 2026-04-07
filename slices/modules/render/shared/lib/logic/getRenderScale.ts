type Options = {
	boundingRect?: DOMRect | null;
	previewZoom: number;
	isRendering: boolean;
	contentWidth: number;
};

export const getRenderScale = ({
	boundingRect,
	previewZoom,
	isRendering,
	contentWidth,
}: Options) => {
	if (isRendering) {
		return 1;
	}
	if (boundingRect) {
		return boundingRect.width / contentWidth;
	}
	return previewZoom / 100;
};
