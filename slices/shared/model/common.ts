import type { fonts } from "../fonts";

export type Side = "front" | "back";
export type Orientation = "landscape" | "portrait";

export type DefaultPDFFontFamily =
	| "Courier"
	| "Courier-Bold"
	| "Courier-Oblique"
	| "Courier-BoldOblique"
	| "Helvetica"
	| "Helvetica-Bold"
	| "Helvetica-Oblique"
	| "Helvetica-BoldOblique"
	| "Symbol"
	| "Times-Roman"
	| "Times-Bold"
	| "Times-Italic"
	| "Times-BoldItalic"
	| "ZapfDingbats";

export type ExternalPDFFontFamily = keyof typeof fonts;

export type FontFamily = DefaultPDFFontFamily | ExternalPDFFontFamily;

export type FontFormat = "opentype" | "truetype" | "woff" | "woff2" | "svg";

export type Font = {
	family: string;
	src: string;
	weight?: "bold" | "normal";
	style?: "normal" | "italic";
	unicodeRange?: string;
	descentRatio?: number;
	inject?: boolean;
	format: FontFormat;
};
