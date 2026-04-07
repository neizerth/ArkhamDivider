import { createSelector } from "@reduxjs/toolkit";
import { getBrowserDPI } from "../../util";
import { selectDPI } from "../print";

const browserDPI = getBrowserDPI();

export const selectWebPrintScale = createSelector(selectDPI, (dpi) => {
	return browserDPI / dpi;
});
