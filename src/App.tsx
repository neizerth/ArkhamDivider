import { useEffect } from 'react'
import S from './App.module.scss'

import { AppLoader, DividerList, AppSettings } from '@/components';
// import { changeLanguage } from '@/store/features/language/language';
// import { loadIcons } from '@/store/features/icons/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { loadAppData } from './store/features/app/app';

function App() {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(selectLayout);

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
          {layout && (
            <>
              <div className={S.content}>
                <DividerList layout={layout}/>
              </div>
            </>
          )}
        
        </div>
      </AppLoader>
    </>
  );
}

export default App
