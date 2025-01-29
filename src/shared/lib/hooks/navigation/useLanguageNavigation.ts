import { selectLoading } from "@/shared/lib/store/features/app/app";
import {
	changeLanguage,
	selectAvailableLanguages,
} from "@/shared/lib/store/features/language/language";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";

export const useLanguageNavigation = () => {
	const dispatch = useAppDispatch();
	const { i18n } = useTranslation();
	const params = useParams();
	const availableLangauges = useAppSelector(selectAvailableLanguages);
	const loading = useAppSelector(selectLoading);

	const { language } = params;

	useEffect(() => {
		if (!language || loading) {
			return;
		}
		if (!availableLangauges.includes(language)) {
			return;
		}
		i18n.changeLanguage(language);
		dispatch(changeLanguage(language));
	}, [language, loading]);
};
