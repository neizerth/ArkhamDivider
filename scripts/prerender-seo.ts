/**
 * Post-build: write localized index.html copies for marketing routes so crawlers
 * see <title>, description, keywords, lang, and hreflang in the first response.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const distDir = join(repoRoot, "dist");
const templatePath = join(distDir, "index.html");
const translationsDir = join(
	repoRoot,
	"slices/modules/core/i18n/shared/config/translations",
);

/** Must match [translations/index.ts](slices/modules/core/i18n/shared/config/translations/index.ts) */
const SUPPORTED_LANGS = [
	"en",
	"ru",
	"de",
	"fr",
	"pl",
	"es",
	"ko",
	"it",
	"zh",
	"zh_cn",
] as const;

const DEFAULT_LANGUAGE = "en";

type PageId = "home" | "about" | "howToPrint";

const titleKey: Record<PageId, string> = {
	home: "seo.title.home",
	about: "seo.title.about",
	howToPrint: "seo.title.howToPrint",
};

function loadTranslationFile(code: string): Record<string, string> {
	const path = join(translationsDir, `${code}.json`);
	return JSON.parse(readFileSync(path, "utf8")) as Record<string, string>;
}

function dictionaryFor(lang: string): Record<string, string> {
	const en = loadTranslationFile("en");
	if (lang === "en") {
		return en;
	}
	const path = join(translationsDir, `${lang}.json`);
	if (!existsSync(path)) {
		return en;
	}
	return { ...en, ...loadTranslationFile(lang) };
}

function escapeAttr(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;");
}

function escapeHtmlText(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function outFilePath(lang: string, page: PageId): string {
	if (page === "home") {
		return lang === DEFAULT_LANGUAGE
			? join(distDir, "index.html")
			: join(distDir, lang, "index.html");
	}
	const segment = page === "about" ? "about" : "how-to-print";
	return lang === DEFAULT_LANGUAGE
		? join(distDir, segment, "index.html")
		: join(distDir, lang, segment, "index.html");
}

function urlPath(lang: string, page: PageId): string {
	if (page === "home") {
		return lang === DEFAULT_LANGUAGE ? "/" : `/${lang}`;
	}
	const sub = page === "about" ? "about" : "how-to-print";
	return lang === DEFAULT_LANGUAGE ? `/${sub}` : `/${lang}/${sub}`;
}

function toHreflangTag(lang: string) {
	// hreflang should be BCP 47 style (e.g. zh-CN), while URLs use our internal code (zh_cn).
	if (lang === "zh_cn") {
		return "zh-CN";
	}
	return lang.replace(/_/g, "-");
}

function applySeo(
	template: string,
	options: {
		lang: string;
		title: string;
		description: string;
		keywords: string;
		canonicalPath: string;
		alternatePaths: { hreflang: string; href: string }[];
	},
) {
	let html = template.replace(
		/<html lang="[^"]*"/,
		`<html lang="${escapeAttr(options.lang)}"`,
	);
	html = html.replace(
		/<title>[^<]*<\/title>/,
		`<title>${escapeHtmlText(options.title)}</title>`,
	);
	html = html.replace(
		/<meta name="description"[^>]*\/?>/,
		`<meta name="description" content="${escapeAttr(options.description)}" />`,
	);
	html = html.replace(
		/<meta name="keywords"[^>]*\/?>/,
		`<meta name="keywords" content="${escapeAttr(options.keywords)}" />`,
	);

	const canonical = `    <link rel="canonical" href="${escapeAttr(options.canonicalPath)}" />`;
	const alternates = options.alternatePaths
		.map(
			(a) =>
				`    <link rel="alternate" hreflang="${escapeAttr(a.hreflang)}" href="${escapeAttr(a.href)}" />`,
		)
		.join("\n");

	const inject = `${canonical}\n${alternates}\n  `;
	html = html.replace("</head>", `${inject}</head>`);
	return html;
}

function ensureDirForFile(filePath: string) {
	mkdirSync(dirname(filePath), { recursive: true });
}

function toHtmlLang(lang: string) {
	// HTML lang should be BCP 47 style (e.g. zh-CN), but URLs use our internal code (zh_cn).
	if (lang === "zh_cn") {
		return "zh-CN";
	}
	return lang.replace(/_/g, "-");
}

function main() {
	if (!existsSync(templatePath)) {
		throw new Error(
			`prerender-seo: missing ${templatePath}. Run vite build first.`,
		);
	}

	const template = readFileSync(templatePath, "utf8");
	const pages: PageId[] = ["home", "about", "howToPrint"];

	for (const page of pages) {
		for (const lang of SUPPORTED_LANGS) {
			const dict = dictionaryFor(lang);
			const title = dict[titleKey[page]] ?? dict["seo.title.home"] ?? "Arkham Divider";
			const description = dict["seo.description"] ?? "";
			const keywords = dict["seo.keywords"] ?? "";

			const canonicalPath = urlPath(lang, page);
			const alternatePaths = [
				...SUPPORTED_LANGS.map((l) => ({
					hreflang: toHreflangTag(l),
					href: urlPath(l, page),
				})),
				{ hreflang: "x-default", href: urlPath(DEFAULT_LANGUAGE, page) },
			];

			const html = applySeo(template, {
				lang: toHtmlLang(lang),
				title,
				description,
				keywords,
				canonicalPath,
				alternatePaths,
			});

			const outPath = outFilePath(lang, page);
			ensureDirForFile(outPath);
			writeFileSync(outPath, html, "utf8");
		}
	}

	console.log(
		`prerender-seo: wrote ${pages.length * SUPPORTED_LANGS.length} HTML files under dist/`,
	);
}

main();
