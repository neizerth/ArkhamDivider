import { injectGlobal } from "@emotion/css";
import type { Font, FontFormat } from "../model";

const formats: Record<string, FontFormat> = {
	otf: "opentype",
	ttf: "truetype",
	woff: "woff",
	woff2: "woff2",
	svg: "svg",
};

type Options = Omit<Font, "format"> & {
	/**
	 * Set to `false` when no `.woff2` sibling is committed for `src`, otherwise the
	 * browser spends a 404 before falling back. Only `ArkhamIcons` needs this: its
	 * `.ttf` is re-downloaded by `npm run font:install` during prebuild, so a
	 * committed `.woff2` would go stale.
	 */
	woff2?: boolean;
};

export const createFont = (options: Options) => {
	const {
		family,
		weight = "normal",
		style = "normal",
		src,
		unicodeRange,
		inject = true,
		woff2 = true,
	} = options;
	const extension = src.split(".").pop() as string;
	const format = formats[extension];

	// Browsers pick the first `src` they support, so `.woff2` first means the original
	// TTF/OTF stays as a fallback and is never fetched by a modern browser. PDF export
	// is unaffected: PDFKit loads its own TTF/OTF paths (see `modules/pdf/shared/config`)
	// because fontkit cannot read woff2.
	const woff2Src = src.replace(/\.(ttf|otf|woff)$/, ".woff2");
	const sources = [
		woff2 && woff2Src !== src && `url(${woff2Src}) format('woff2')`,
		`url(${src}) format('${format}')`,
	]
		.filter(Boolean)
		.join(", ");

	if (inject) {
		injectGlobal`
			@font-face {
				font-family: ${family};
				src: ${sources};
				font-weight: ${weight};
				font-style: ${style};
				font-display: swap;
				${unicodeRange ? `unicode-range: ${unicodeRange};` : ""}
			}
		`;
	}

	return {
		...options,
		format,
	};
};
