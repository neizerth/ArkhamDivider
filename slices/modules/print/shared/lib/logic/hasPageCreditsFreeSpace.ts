import type { PageCreditsVisibilityOptions } from "@/modules/print/shared/model/page";
import { canShowPageCredits } from "./canShowPageCredits";
import { getPageCreditsAreaSize } from "./getPageCreditsAreaSize";

/** Same vertical free-space rule as `canShowPageCredits` (last-page check is separate). */
export function hasPageCreditsFreeSpace(
	options: PageCreditsVisibilityOptions,
): boolean {
	return canShowPageCredits({
		pageSize: options.pageSize,
		areaSize: getPageCreditsAreaSize(options.pageLayout),
	});
}
