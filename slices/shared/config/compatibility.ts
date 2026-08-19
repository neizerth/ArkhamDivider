import { detect } from "detect-browser";

export const browser = detect();

export const isFirefox = browser?.name === "firefox";
export const isSafari = browser?.name === "safari";
export const isMobileBrowser =
	browser?.os === "Android OS" || browser?.os === "iOS";
export const isMobileSafari = isMobileBrowser && isSafari;

export const isPrintSupported = !isSafari;
