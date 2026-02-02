import { injectGlobal } from "@emotion/css";

type Options = {
	family: string;
	src: string;
	weight?: "bold" | "normal";
	style?: "normal" | "italic";
	unicodeRange?: string;
	descentRatio?: number;
};

type FontFormat = "opentype" | "truetype" | "woff" | "woff2" | "svg";

const formats: Record<string, FontFormat> = {
	otf: "opentype",
	ttf: "truetype",
	woff: "woff",
	woff2: "woff2",
	svg: "svg",
};

export const createFont = (options: Options) => {
	const {
		family,
		weight = "normal",
		style = "normal",
		src,
		unicodeRange,
	} = options;
	const extension = src.split(".").pop() as string;
	const format = formats[extension];

	injectGlobal`
    @font-face {
      font-family: ${family};
      src: url(${src}) format('${format}');
      font-weight: ${weight};
      font-style: ${style};
      ${unicodeRange ? `unicode-range: ${unicodeRange};` : ""}
    }
  `;

	return {
		...options,
		format,
	};
};
