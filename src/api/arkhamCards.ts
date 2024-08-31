import { language } from "@/store/features";

export const ARKHAM_CARDS_URL = process.env.NEXT_PUBLIC_ARKHAM_CARDS_URL;
export const ARKHAM_CARDS_CONTENTS_URL = process.env.NEXT_PUBLIC_ARKHAM_CARDS_CONTENTS_URL;

export const ARKHAM_CARDS_ICOMOON_PATH = '/assets/icomoon/project.json';
export const ARKHAM_CARDS_GENERATED_PATH = '/assets/generated';
export const ARKHAM_CARDS_I18N_PATH = '/assets/i18n';

const getLanguagePostfix = (language?: string) => language === 'en' ? '' : '_' + language;

export const fetchArkhamCardsContents = (path: string) => fetch(ARKHAM_CARDS_CONTENTS_URL + path);
export const fetchArkhamCardsAsset = (path: string) => fetch(ARKHAM_CARDS_URL + path);

export const fetchIcomoonProject = () => fetchArkhamCardsAsset(ARKHAM_CARDS_ICOMOON_PATH);

export const fetchIconPatch = () => fetchArkhamCardsAsset('/src/icons/EncounterIcon.tsx');

export const fetchI18NSource = () => fetchArkhamCardsAsset('/src/app/i18n.ts');

export const fetchGenerated = () => fetchArkhamCardsContents('/assets/generated');

export const withLanguagePostfix = (getUrl: (language: string) => string) => (language: string) => {
    const postfix = language === 'en' ? '' : '_' + language;
    const url = getUrl(postfix);

    return fetchArkhamCardsAsset(url);
}

export const fetchScenarioNames = withLanguagePostfix((language: string) => `${ARKHAM_CARDS_GENERATED_PATH}/scenarioNames${language}.json`);

export const fetchCampaigns = withLanguagePostfix((language: string) => `${ARKHAM_CARDS_GENERATED_PATH}/allCampaigns${language}.json`);

export const fetchEncounterSets = withLanguagePostfix((language: string) => `${ARKHAM_CARDS_GENERATED_PATH}/encounterSets${language}.json`);

export const fetchCoreTranslations = (language: string) => 
    fetchArkhamCardsAsset(
        ARKHAM_CARDS_I18N_PATH + `/${language}.po.json`
    );

// export const ARKHAM_CARDS_ICOMOON_PROJECT_URL = process.env.NEXT_PUBLIC_ARKHAM_CARDS_URL + '/assets/icomoon/project.json'; 

