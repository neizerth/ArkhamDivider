import type { Location } from "react-router";

function firstPathSegment(pathname: string): string | undefined {
	return pathname.split("/").filter(Boolean)[0];
}

function segmentIsKnownLanguage(
	segment: string | undefined,
	codes: readonly string[],
): boolean {
	return Boolean(segment && codes.includes(segment));
}

/**
 * Swap or insert the locale segment. Routes without a prefix (`/`, `/about`)
 * are treated as “no locale”, so we prepend `/${language}`.
 */
export const replaceLocationLanguage = (
	location: Location,
	language: string,
	knownLanguageCodes: readonly string[],
) => {
	const { pathname, search, hash } = location;
	const first = firstPathSegment(pathname);
	const hasLocalePrefix = segmentIsKnownLanguage(first, knownLanguageCodes);

	let nextPathname: string;
	if (hasLocalePrefix) {
		const parts = pathname.split("/").filter(Boolean);
		parts[0] = language;
		nextPathname = `/${parts.join("/")}`;
	} else if (pathname === "/" || pathname === "") {
		nextPathname = `/${language}`;
	} else {
		nextPathname = `/${language}${pathname}`;
	}

	return `${nextPathname}${search}${hash}`;
};
