'use client';
import { DividerList, Row, DividerForm, Container, AppLoader } from "@/components";
import S from "./page.module.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectDividerList } from "@/store/features/dividers/dividers";
import { loadIcons, selectIconSet } from "@/store/features/icons/icons";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function Home() {

  const dispatch = useAppDispatch();
	const dividers = useAppSelector(selectDividerList);
  const iconSet = useAppSelector(selectIconSet);

  useEffect(() => {
    dispatch(loadIcons())
  }, []);

  const loading = !iconSet;

  return (
    <Container>
      <AppLoader loading={loading}>
        <Row className={S.container}>
          <aside className={S.sidebar}>
            <DividerForm dividers={dividers}/>
          </aside>
          <main className={S.main}>
            <DividerList dividers={dividers}/>
          </main>
        </Row>
      </AppLoader>
    </Container>
  );
}
