import { isUndefined } from "ramda-adjunct";
import streamSaver from "streamsaver";

// Create stream and doc immediately (before any async work) so the download
// is started in user gesture context and isn’t blocked by the browser.
// Same-origin mitm avoids COEP blocking the cross-origin StreamSaver iframe.
export const setStreamMitm = () => {
	if (isUndefined(window)) {
		return;
	}
	streamSaver.mitm = `${window.location.origin}/streamsaver/mitm.html?version=2.0.0`;
};
