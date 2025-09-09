import type { ArkhamDivider } from "arkham-divider-data";
import axios from "axios";
import { API_URL } from "../config";

const client = axios.create({
	baseURL: API_URL,
});

client.interceptors.request.use((config) => {
	if (config.url && !config.url.endsWith(".json")) {
		config.url = `${config.url}.json`;
	}
	return config;
});

export const ArkhamDividerAPI = {
	getCoreData: async () => {
		const response = await client.get<ArkhamDivider.Core>("/core");
		return response.data;
	},
	getTranslations: async (language: string) => {
		const response = await client.get<ArkhamDivider.Translation>(
			`/${language}`,
		);
		return response.data;
	},
	getIconUrl: (icon: string) => `${API_URL}/fonts/icons/${icon}.svg`,
	fontsUrl: `${API_URL}/fonts`,
};
