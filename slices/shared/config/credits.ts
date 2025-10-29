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
