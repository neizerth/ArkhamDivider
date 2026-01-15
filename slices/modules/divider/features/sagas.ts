import { fork } from "redux-saga/effects";
import { navigateOnDividerTypeChangeSaga } from "./navigate-on-divider-type-change/navigateOnDividerTypeChangeSaga";
import { setDividerLayoutOnRouteChangeSaga } from "./set-divider-layout-on-route-change/setDividerLayoutOnRouteChangeSaga";
import { setDividerTypeOnRouteChangeSaga } from "./set-divider-type-on-route-change/setDividerTypeOnRouteChangeSaga";

export function* dividerFeaturesSaga() {
	yield fork(setDividerLayoutOnRouteChangeSaga);
	yield fork(navigateOnDividerTypeChangeSaga);
	yield fork(setDividerTypeOnRouteChangeSaga);
}
