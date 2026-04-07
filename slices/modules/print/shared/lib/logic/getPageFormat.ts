import { propEq } from "ramda";
import { pageSizeFormats } from "../../config";
import type { PageFormatType } from "../../model";

export const getPageFormat = (pageSizeType: PageFormatType) => {
	return pageSizeFormats.find(propEq(pageSizeType, "type"));
};
