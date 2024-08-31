'use client';
import { DividerList, Row, Container, AppLoader, AppSettings } from "@/components";
import S from "./page.module.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectDividers } from "@/store/features/dividers/dividers";
import { loadIcons } from "@/store/features/icons/icons";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTranslation } from "react-i18next";
import { selectLanguage, changeLanguage, loadAvailableLanguages } from "@/store/features/language/language";
import '@/bootstrap'
import { loadCampaigns } from "@/store/features/campaigns/campaigns";

export default function Home() {

  const dispatch = useAppDispatch();
	const dividers = useAppSelector(selectDividers);
  const language = useAppSelector(selectLanguage);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(loadAvailableLanguages());
    dispatch(loadIcons());
    dispatch(changeLanguage('en'));
  }, [dispatch]);

  useEffect(() => {
    // dispatch(setLanguage('ru'));
    // dispatch(setLanguage(language));
  }, [dispatch]);

  return (
    <Container>
      <AppLoader>
        <div className={S.container}>
          <AppSettings/>
          <DividerList dividers={dividers} groupSize={6} rowSize={2}/>
        </div>
      </AppLoader>
    </Container>
  );
}
