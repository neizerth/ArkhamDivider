import type { Location } from "react-router";

export const replaceLocationLanguage = (location: Location, language: string) =>
	location.pathname.replace(/^\/[\w-]+/, `/${language}`);
