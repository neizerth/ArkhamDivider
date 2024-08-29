'use client';
import { DividerList, Row, Container, AppLoader, AppSettings } from "@/components";
import S from "./page.module.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectDividers } from "@/store/features/dividers/dividers";
import { loadIcons } from "@/store/features/icons/icons";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTranslation } from "react-i18next";
import { selectLanguage, changeLanguage } from "@/store/features/language/language";
import '@/bootstrap'
import { loadCampaigns } from "@/store/features/campaigns/campaigns";

export default function Home() {

  const dispatch = useAppDispatch();
	const dividers = useAppSelector(selectDividers);
  const language = useAppSelector(selectLanguage);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(loadIcons());
    dispatch(changeLanguage('ru'));
  }, [dispatch]);

  useEffect(() => {
    // dispatch(setLanguage('ru'));
    // dispatch(setLanguage(language));
  }, [dispatch]);

  return (
    <Container>
      <AppLoader>
        <AppSettings/>
        <DividerList dividers={dividers}/>
      </AppLoader>
    </Container>
  );
}
