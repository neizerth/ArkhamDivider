import { spawn } from "redux-saga/effects";
import { navigateOnDividerTypeChangeSaga } from "./navigate-on-divider-type-change/navigateOnDividerTypeChangeSaga";
import { setDividerLayoutOnRouteChangeSaga } from "./set-divider-layout-on-route-change/setDividerLayoutOnRouteChangeSaga";
import { setDividerTypeOnRouteChangeSaga } from "./set-divider-type-on-route-change/setDividerTypeOnRouteChangeSaga";
import { setLayoutGridOnLayoutChangeSaga } from "./set-layout-grid-on-layout-change/setLayoutGridOnLayoutChangeSaga";

export function* dividerFeaturesSaga() {
	yield spawn(setDividerLayoutOnRouteChangeSaga);
	yield spawn(navigateOnDividerTypeChangeSaga);
	yield spawn(setDividerTypeOnRouteChangeSaga);
	yield spawn(setLayoutGridOnLayoutChangeSaga);
}
