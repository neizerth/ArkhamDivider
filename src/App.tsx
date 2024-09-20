import { useEffect } from 'react'
import S from './App.module.scss'

import { AppLoader, Layout, AppSettings, AddStoryDividers } from '@/components';
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
        <div className={S.container}>
          <AppSettings/>
          <div className={S.content}>
            <AddStoryDividers/>
            {showLayout && <Layout/>}
          </div>
        </div>
      </AppLoader>
    </>
  );
}

export default App
