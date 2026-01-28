import { BOOSTY_LINK, PATREON_LINK } from "@/shared/config";

type LocaleItem = {
	url: string;
	platform: string;
};

export const localeData: Record<string, LocaleItem> = {
	ru: {
		url: BOOSTY_LINK,
		platform: "Boosty",
	},
	en: {
		url: PATREON_LINK,
		platform: "Patreon",
	},
};
