import { AppThunk } from "@/store";
import { ActionCreator } from "@reduxjs/toolkit";
import { addResourceBundle } from "@/util/i18n";
import { Mapping } from "classnames";

export const setTranslations = (ns?: string): ActionCreator<AppThunk> => (language: string, bundle: Mapping) => () => {
  addResourceBundle(language, bundle, ns);
}

export const setCoreTranslations = setTranslations();