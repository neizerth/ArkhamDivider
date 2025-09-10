export const detectLanguage = (availableLanguages: string[]) => {
	const languageList = [...navigator.languages].reverse();

	for (const lang of languageList) {
		if (availableLanguages.includes(lang)) {
			return lang;
		}
	}
};
