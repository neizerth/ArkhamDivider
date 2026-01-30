import type { DPI, PageLayout } from "../../../model";
import { fromDPI } from "../../util";

type Options<T> = {
	pageLayout: PageLayout<T>;
	dpi: DPI;
};

export const getUnitSizePx = <T>(options: Options<T>) => {
	const { dpi, pageLayout } = options;
	const mm = fromDPI(dpi);
	const { unitSize } = pageLayout.grid;

	const width = mm(unitSize.width);
	const height = mm(unitSize.height);

	return { width, height };
};
