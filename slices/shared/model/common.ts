import type { fonts } from "../fonts";

export type Side = "front" | "back";
export type Orientation = "landscape" | "portrait";

export type FontFamily = keyof typeof fonts;
