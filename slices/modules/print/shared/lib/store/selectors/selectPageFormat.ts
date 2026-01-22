import { createSelector } from "@reduxjs/toolkit";
import { getPageFormat } from "../../logic";
import { selectPageSize } from "../print";

export const selectPageFormat = createSelector([selectPageSize], (pageSize) => {
	return getPageFormat(pageSize);
});
