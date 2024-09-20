import { API_URL } from '@/constants/web';
import { ArkhamDivider } from 'arkham-divider-data';

export const fetchData = <T>(path: string) => <T>fetch(API_URL + path).then(r => r.json())

export const fetchCoreData = () => fetchData<ArkhamDivider.Core>('/core.json');

export const fetchLanguageData = (language: string) => fetchData<ArkhamDivider.Translation>(`/${language}.json`);