import { spawn } from "redux-saga/effects";
import { clearUnusedDividerIcons } from "./clear-unused-divider-icons/clearUnusedDividerIcons";
import { navigateOnCategoryChangeSaga } from "./navigate-on-category-change/navigateOnCategoryChangeSaga";
import { navigateOnDividerTypeChangeSaga } from "./navigate-on-divider-type-change/navigateOnDividerTypeChangeSaga";
import { removeUnsupportedLayoutDividersSaga } from "./remove-unsupported-layout-dividers/removeUnsupportedLayoutDividersSaga";
import { setDividerLayoutOnRouteChangeSaga } from "./set-divider-layout-on-route-change/setDividerLayoutOnRouteChangeSaga";
import { setDividerTypeOnRouteChangeSaga } from "./set-divider-type-on-route-change/setDividerTypeOnRouteChangeSaga";
import { setLayoutGridOnLayoutChangeSaga } from "./set-layout-grid-on-layout-change/setLayoutGridOnLayoutChangeSaga";
import { setSupportedArkhamesqueStoriesSaga } from "./set-supported-arkhamesque-classic-stories/setSupportedArkhamesqueStoriesSaga";
import { setSupportedDividerTypeOnLayoutChangeSaga } from "./set-suppoted-divider-type-on-layout-change/setSupportedDividerTypeOnLayoutChangeSaga";

export function* dividerFeaturesSaga() {
	yield spawn(setDividerLayoutOnRouteChangeSaga);
	yield spawn(navigateOnDividerTypeChangeSaga);
	yield spawn(setDividerTypeOnRouteChangeSaga);
	yield spawn(setLayoutGridOnLayoutChangeSaga);
	yield spawn(clearUnusedDividerIcons);
	yield spawn(navigateOnCategoryChangeSaga);
	yield spawn(removeUnsupportedLayoutDividersSaga);
	yield spawn(setSupportedDividerTypeOnLayoutChangeSaga);
	yield spawn(setSupportedArkhamesqueStoriesSaga);
}
