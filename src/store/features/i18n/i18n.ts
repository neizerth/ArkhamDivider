import i18n from "i18next";

import { fetchCoreTranslations, fetchEncounterSets } from "@/api/arkhamCards";
import { AppThunk } from "@/store";
import { IArkhamCardsCampaign } from "@/types/arkhamCards";
import { I18NLanguageBundle, IPOEditorSource } from "@/types/i18n";
import { ActionCreator } from "@reduxjs/toolkit";
import { hasResourceBundle, addResourceBundle } from "@/util/i18n";
import { I18N_NAMESPACE } from "@/constants/i18n";

export const transformToBundle = ({ translations }: IPOEditorSource) => Object.values(translations[''])
  .reduce((total, { msgid, msgstr }) => {
    const [value]= msgstr;
    total[msgid] = value || msgid;
    return total;
  }, {} as I18NLanguageBundle);

export const loadCoreTranslations: ActionCreator<AppThunk> = (language: string) => async dispatch => {
  if (hasResourceBundle(language)) {
    return;
  }

  const response = await fetchCoreTranslations(language);
  const source: IPOEditorSource = await response.json();

  const bundle = transformToBundle(source);
  
  dispatch(setCoreTranslations(language, bundle));
}

export const setCoreTranslations: ActionCreator<AppThunk> = (language: string, bundle: I18NLanguageBundle) => () => {
  addResourceBundle(language, bundle);
}

export const loadEncounterSetsTranslations: ActionCreator<AppThunk> = (language: string) => async dispatch  => {
  if (hasResourceBundle(language, I18N_NAMESPACE.ENCOUNTER_SETS)) {
    return;
  }

  const response = await fetchEncounterSets(language);
  const bundle: I18NLanguageBundle = await response.json();

  dispatch(setEncounterSetsTranslations(language, bundle));
}

export const setEncounterSetsTranslations: ActionCreator<AppThunk> = (language: string, bundle: I18NLanguageBundle) => () => {
  addResourceBundle(language, bundle, I18N_NAMESPACE.ENCOUNTER_SETS);
}

export const setCampaignTranslations: ActionCreator<AppThunk> = (campaign: IArkhamCardsCampaign) => async dispatch => {
  
}
