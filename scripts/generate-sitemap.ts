/**
 * Post-build: generate `dist/sitemap.xml` for marketing routes (+ languages).
 *
 * Set SITE_URL (e.g. https://example.com) to control absolute <loc>.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config({ path: [".env", ".env.local"] });

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const distDir = join(repoRoot, "dist");

/** Must match `scripts/prerender-seo.ts` */
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
const pages: PageId[] = ["home", "about", "howToPrint"];

function urlPath(lang: string, page: PageId): string {
	if (page === "home") {
		return lang === DEFAULT_LANGUAGE ? "/" : `/${lang}`;
	}
	const sub = page === "about" ? "about" : "how-to-print";
	return lang === DEFAULT_LANGUAGE ? `/${sub}` : `/${lang}/${sub}`;
}

function normalizeOrigin(origin: string) {
	return origin.replace(/\/+$/, "");
}

function escapeXml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function main() {
	const originRaw =
		process.env.SITE_URL ??
		process.env.VITE_SITE_URL ??
		process.env.PUBLIC_SITE_URL ??
		"http://localhost";
	const origin = normalizeOrigin(originRaw);

	const urls: string[] = [];
	for (const page of pages) {
		for (const lang of SUPPORTED_LANGS) {
			urls.push(`${origin}${urlPath(lang, page)}`);
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		urls
			.map((loc) => `  <url><loc>${escapeXml(loc)}</loc></url>`)
			.join("\n") +
		`\n</urlset>\n`;

	mkdirSync(distDir, { recursive: true });
	writeFileSync(join(distDir, "sitemap.xml"), xml, "utf8");

	console.log(`generate-sitemap: wrote dist/sitemap.xml (${urls.length} urls)`);
}

main();

