import { useEffect } from 'react'
import S from './App.module.scss'

import { Container, AppLoader, DividerList, AppSettings } from '@/components';
import { changeLanguage } from '@/store/features/language/language';
import { loadIcons } from '@/store/features/icons/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';

function App() {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(selectLayout);

  useEffect(() => {
    // dispatch(loadAvailableLanguages());
    dispatch(loadIcons());

    dispatch(changeLanguage('en'));
  }, [dispatch]);

  return (
    <Container>
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
    </Container>
  );
}

export default App