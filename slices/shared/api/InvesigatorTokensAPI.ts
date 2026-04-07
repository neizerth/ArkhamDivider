const API_URL = import.meta.env.VITE_INVESTIGATORS_URL as string;

export const InvesigatorTokensAPI = {
	getImageByCode: (code: string) => `${API_URL}/images/${code}.jpg`,
};
