import { useEffect } from 'react'
import S from './App.module.scss'

import { AppLoader, Layout, AppSettings, LayoutMenu, AddDividers, Col, Footer } from '@/components';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { loadAppData } from './store/features/app/app';
import { selectDividers } from './store/features/dividers/dividers';

function App() {
  const dispatch = useAppDispatch();
  const dividers = useAppSelector(selectDividers);

  const showLayout = dividers.length > 0;

  useEffect(() => {
    dispatch(loadAppData());
  }, [dispatch]);

  return (
    <>
      <AppLoader>
        <Col className={S.container}>
          <AppSettings/>
          <Col className={S.content}>
            <LayoutMenu/>
            <AddDividers/>
          {showLayout && <Layout/>}
          </Col>
          <Footer/>
        </Col>
      </AppLoader>
    </>
  );
}

export default App
