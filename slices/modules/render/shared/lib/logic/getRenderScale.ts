type Options = {
	boundingRect?: DOMRect | null;
	previewZoom: number;
	contentWidth: number;
};

export const getRenderScale = ({
	boundingRect,
	previewZoom,
	contentWidth,
}: Options) => {
	if (boundingRect) {
		return boundingRect.width / contentWidth;
	}
	return previewZoom / 100;
};
