import { fork } from "redux-saga/effects";
import { setDividerLayoutOnRouteChangeSaga } from "./set-divider-layout-on-route-change/setDividerLayoutOnRouteChangeSaga";

export function* dividerFeaturesSaga() {
	yield fork(setDividerLayoutOnRouteChangeSaga);
}
