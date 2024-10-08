import { Routes, HashRouter, Route, Outlet } from 'react-router-dom';
import S from './App.module.scss'

import { 
  AppLoader, 
  Layout, 
  AppSettings, 
  LayoutMenu, 
  AddDividers, 
  Col, 
  Footer, 
  LayoutInfo, 
  CategoryInfo 
} from '@/components';

import { useAppSelector } from '@/hooks/useAppSelector';
import { selectDividers } from './store/features/dividers/dividers';
import { useAppNavigation } from './hooks/useAppNavigation';
import { useAppDispatch } from './hooks/useAppDispatch';
import { loadAppData } from './store/features/app/app';
import { useEffect } from 'react';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path=':language'>
            <Route path='orientation/:orientation'/>
            <Route path='category/:categoryId' element={<CategoryInfo/>}>
              <Route path=':layoutId' element={<LayoutInfo/>}>
                <Route path=':type'>
                  <Route path=':storyId'/>
                </Route>
              </Route>
            </Route>

            <Route path='color'/>
            <Route path='grayscale'/>
            
            <Route path='layout/:layoutId' element={<LayoutInfo/>}>
              <Route path=':type'>
                <Route path=':storyId'/>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

const AppLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAppData());
  }, [dispatch]);

  useAppNavigation();

  const dividers = useAppSelector(selectDividers);

  const showLayout = dividers.length > 0;

  return (
    <>
      <AppLoader>
        <Col className={S.container}>
          <AppSettings/>
          <Col className={S.content}>
            <Outlet/>
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
