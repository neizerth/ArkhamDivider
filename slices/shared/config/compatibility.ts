import { detect } from "detect-browser";

export const browser = detect();

export const isPrintSupported = browser?.name !== "safari";
