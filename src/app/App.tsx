import { HashRouter, Outlet, Route, Routes } from 'react-router-dom';
import S from './App.module.scss';
import '@/app/fonts';

import { useEffect } from 'react';
import {
  ActivePopup,
  AddDividers,
  AppLoader,
  AppSettings,
  CategoryInfo,
  Col,
  Footer,
  Layout,
  LayoutInfo,
  LayoutMenu,
  WithBrowserSupport,
  WithLayoutSupport,
} from '@/components';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { loadAppData } from '@/shared/store/features/app/app';
import { selectDividers } from '@/shared/store/features/dividers/dividers';

import './index.scss';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path=':language'>
            <Route path='orientation/:orientation' />
            <Route path='category/:categoryId' element={<CategoryInfo />}>
              <Route path=':layoutId' element={<LayoutInfo />}>
                <Route path=':type'>
                  <Route path=':storyId' />
                </Route>
              </Route>
            </Route>

            <Route path='color' />
            <Route path='grayscale' />

            <Route path='layout/:layoutId' element={<LayoutInfo />}>
              <Route path=':type'>
                <Route path=':storyId' />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

const AppLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAppData());
  }, [dispatch]);

  useAppNavigation();

  const dividers = useAppSelector(selectDividers);

  const showLayout = dividers.length > 0;

  return (
    <WithBrowserSupport>
      <AppLoader>
        <Col className={S.container}>
          <AppSettings />
          <Col className={S.content}>
            <Outlet />
            <LayoutMenu />
            <div className={S.addDividers}>
              <AddDividers />
            </div>
            <WithLayoutSupport fallback={true}>
              {showLayout && (
                <div className={S.layout}>
                  <Layout />
                </div>
              )}
            </WithLayoutSupport>
          </Col>
          <Footer />
        </Col>
        <ActivePopup />
      </AppLoader>
    </WithBrowserSupport>
  );
};

export default App;
