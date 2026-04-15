type Options = {
	boundingRect?: DOMRect | null;
	previewZoom: number;
	contentWidth: number;
	isRendering: boolean;
};

export const getRenderScale = ({
	boundingRect,
	previewZoom,
	contentWidth,
	isRendering,
}: Options) => {
	if (isRendering) {
		return 1;
	}
	if (boundingRect) {
		return boundingRect.width / contentWidth;
	}
	return previewZoom / 100;
};
