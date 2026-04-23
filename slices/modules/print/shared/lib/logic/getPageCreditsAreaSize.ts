import type { BoxSize } from "@/shared/model";
import type { PageLayout } from "../../model";

/** Area occupied by the divider grid (mm). Same shape as used for `canShowPageCredits` in PDF saga and print preview. */
export function getPageCreditsAreaSize(
	pageLayout: Pick<PageLayout<unknown>, "grid" | "itemsCount">,
): BoxSize {
	return {
		width: pageLayout.grid.size.width,
		height: pageLayout.grid.unitSize.height * pageLayout.itemsCount,
	};
}
