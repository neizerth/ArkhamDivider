'use client';
import { DividerList, Row, Container, AppLoader, AppSettings } from "@/components";
import S from "./page.module.css";
import { loadIcons } from "@/store/features/icons/icons";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { changeLanguage, loadAvailableLanguages } from "@/store/features/language/language";
import '@/bootstrap'
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
export default function Home() {

  const dispatch = useAppDispatch();
  const layout = useAppSelector(selectLayout);

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
          {layout && <DividerList layout={layout}/>}
        </div>
      </AppLoader>
    </Container>
  );
}
