import type { BoxSize } from "@/shared/model";
import type { DPI } from "../../../model";
import { fromDPI } from "../../util";

type Options = {
	/** Unit size in mm */
	unitSize: BoxSize;
	dpi: DPI;
};

export const getUnitSizePx = (options: Options) => {
	const { dpi, unitSize } = options;
	const mm = fromDPI(dpi);

	const width = mm(unitSize.width);
	const height = mm(unitSize.height);

	return { width, height };
};
