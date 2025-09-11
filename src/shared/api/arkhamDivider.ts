import { ArkhamDivider } from 'arkham-divider-data';
import { API_URL } from '@/shared/config/app';

export const fetchData = <T>(path: string) => <T>fetch(API_URL + path).then((r) => r.json());

export const fetchCoreData = () => fetchData<ArkhamDivider.Core>('/core.json');

export const fetchLanguageData = (language: string) =>
  fetchData<ArkhamDivider.Translation>(`/${language}.json`);

export const getIconUrl = (icon: string) => `${API_URL}/fonts/icons/${icon}.svg`;
