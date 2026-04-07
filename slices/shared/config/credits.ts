import type { Author } from "../model";
import { getAssetUrl } from "../util";

export const FFGCredits: Author = {
	id: "ffg",
	name: "Fantasy Flight Games",
	primary: true,
	image: getAssetUrl("/images/brands/ffg.png"),
	contacts: [
		{
			id: "website",
			icon: "link",
			url: "https://www.fantasyflightgames.com/",
		},
		{
			id: "facebook",
			icon: "facebook",
			url: "http://www.facebook.com/FantasyFlightGames",
		},
		{
			id: "twitter",
			icon: "twitter",
			url: "http://www.twitter.com/ffgames",
		},
		{
			id: "instagram",
			icon: "instagram",
			url: "https://www.instagram.com/fantasyflightgames/",
		},
		{
			id: "youtube",
			icon: "youtube",
			url: "https://www.youtube.com/user/FantasyFlightStudio",
		},
	],
};

export const SarnetskyCredits: Author = {
	id: "sarnetsky",
	name: "Eugene Sarnetsky",
	image: getAssetUrl("/images/authors/sarnetsky.jpg"),
	donationUrl: {
		default: "https://www.tinkoff.ru/cf/8OT6GkH6KwE",
	},
	contacts: [
		{
			id: "telegram",
			icon: "telegram",
			url: "https://t.me/sarnetsky",
		},
		{
			id: "email",
			icon: "mail",
			url: "mailto:sarnetsky@gmail.com",
		},
	],
};

export const VladimirYazykovCredits: Author = {
	id: "neizerth",
	name: "Vladimir Yazykov",
	image: getAssetUrl("/images/authors/neizerth.jpg"),
	donationUrl: {
		default: "https://www.patreon.com/arkhamdivider",
		ru: "https://boosty.to/arkham.divider/donate",
	},
	contacts: [
		{
			id: "patreon",
			icon: "patreon",
			url: "https://www.patreon.com/arkhamdivider",
		},
		{
			id: "boosty",
			icon: "boosty",
			url: "https://boosty.to/arkham.divider/donate",
		},
		{
			id: "t-bank",
			icon: "t_bank",
			url: "https://www.tinkoff.ru/cf/1fGlAxdTumR",
		},
		{
			id: "github",
			icon: "github",
			url: "https://github.com/neizerth",
		},
		{
			id: "email",
			icon: "mail",
			url: "mailto:neizerth@gmail.com",
		},
		{
			id: "telegram",
			icon: "telegram",
			url: "https://t.me/neizerth",
		},
	],
};

export const RynoCredits: Author = {
	id: "ryno",
	name: "Ryno",
	role: "Ryno Style Dividers",
	image: getAssetUrl("/images/authors/ryno.png"),
	contactUrl: "https://boardgamegeek.com/profile/ryno80",
	contacts: [
		{
			id: "bgg",
			icon: "bgg",
			url: "https://boardgamegeek.com/profile/ryno80",
		},
		{
			id: "etsy",
			icon: "link",
			url: "https://boardGameGoodies.shop",
		},
		{
			id: "facebook",
			icon: "facebook",
			url: "https://www.facebook.com/ryansmessick",
		},
		{
			id: "email",
			icon: "mail",
			url: "mailto:Rmessick@gmail.com",
		},
	],
};

export const ArkhamesqueCredits: Author = {
	id: "smallville247",
	name: "smallville247",
	image: getAssetUrl("/images/authors/troy.png"),
	donationUrl: {
		default: "https://www.patreon.com/smallville247",
	},
	contactUrl:
		"https://boardgamegeek.com/filepage/197199/arkhamesque-classic-horizontal-dividers",
	contacts: [
		{
			id: "patreon",
			icon: "patreon",
			url: "https://www.patreon.com/smallville247",
		},
		{
			id: "bgg",
			icon: "bgg",
			url: "https://boardgamegeek.com/user/smallville247",
		},
	],
};

export const ArkhamStarter3mmCredits: Author = {
	id: "5argon",
	name: "5argon",
	role: "3mm Dividers",
	image: getAssetUrl("/images/authors/5argon.png"),
	contactUrl: "https://5argon.info/",
	contacts: [
		{
			id: "www",
			icon: "link",
			title: "Personal website",
			url: "https://www.5argon.info/",
		},
		{
			id: "arkham-starter",
			icon: "skill_intellect",
			title: "Arkham Starter project",
			url: "https://www.arkham-starter.com/",
		},
		{
			id: "facebook",
			icon: "facebook",
			url: "http://facebook.com/555argon",
		},
		{
			id: "twitter-en",
			icon: "twitter",
			title: "Thai, tweets nonsense",
			url: "http://twitter.com/5argon",
		},
		{
			id: "twitter-ja",
			icon: "twitter",
			title: "日本語, tweets music games",
			url: "https://twitter.com/5argondesu",
		},
		{
			id: "soundcloud",
			icon: "soundcloud",
			url: "https://soundcloud.com/5argon",
		},
	],
};

export const BobLafouineCredits: Author = {
	id: "boblafouine",
	name: "Bob Lafouine",
	contacts: [
		{
			id: "bgg",
			icon: "bgg",
			title: "BGG",
			url: "https://boardgamegeek.com/user/boblafouine",
		},
		{
			id: "email",
			icon: "mail",
			title: "E-mail",
			url: "mailto:29wxcvbn29@gmail.com",
		},
	],
};
