import { IArkhamData } from 'arkham-divider-data';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchData = <T>(path: string) => <T>fetch(BASE_URL + path).then(r => r.json())

export const fetchCoreData = () => fetchData<IArkhamData.Core>('/core.json');

export const fetchLanguageData = (language: string) => fetchData<IArkhamData.Core>(`/${language}.json`);