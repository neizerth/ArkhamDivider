import type { DPI, PageLayout } from "../../../model";
import { fromDPI } from "../../util";

type Options<T> = {
	pageLayout: PageLayout<T>;
	dpi: DPI;
};

export const getLayoutSizePx = <T>(options: Options<T>) => {
	const { pageLayout, dpi } = options;
	const mm = fromDPI(dpi);
	const { size } = pageLayout.grid;

	const width = mm(size.width);
	const height = mm(size.height);

	return { width, height };
};
