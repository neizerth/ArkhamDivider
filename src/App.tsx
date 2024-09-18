import { useEffect } from 'react'
import S from './App.module.scss'

import { AppLoader, Layout, AppSettings, AddCampaign } from '@/components';
// import { changeLanguage } from '@/store/features/language/language';
// import { loadIcons } from '@/store/features/icons/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { loadAppData } from './store/features/app/app';
import { selectDividers } from './store/features/dividers/dividers';

function App() {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(selectLayout);
  const dividers = useAppSelector(selectDividers);

  const showLayout = layout && dividers.length > 0;

  useEffect(() => {
    dispatch(loadAppData());
    // dispatch(loadAvailableLanguages());
    // dispatch(loadIcons());

    // dispatch(changeLanguage('en'));
  }, [dispatch]);

  return (
    <>
      <AppLoader>
        <div className={S.container}>
          <AppSettings/>
          <div className={S.content}>
            {showLayout &&  <Layout layout={layout}/>}
            <AddCampaign/>
          </div>
        </div>
      </AppLoader>
    </>
  );
}

export default App
