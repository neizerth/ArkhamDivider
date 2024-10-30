import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { LayoutFilter, LanguageSelect, PrintSettings, Row, IconButton, LayoutZoom } from '@/components';
import { useDownloadDividers } from '@/hooks/useDownloadDividers';
import { ButtonType } from '@/types/ui';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectDividers } from '@/store/features/dividers/dividers';


export const AppSettings = () => {
  const { t } = useTranslation();
  const print = () => window.print();
  const { 
    download, 
    cancel, 
    progress 
  } = useDownloadDividers();
  const dividers = useAppSelector(selectDividers);

  const done = progress.done === progress.total;
  
  return (
    <div className={S.container}>
      <Row wrap className={S.row}>
      <Row wrap className={S.row}>
        <div className={S.languageSelect}>
          <LanguageSelect/>
        </div>
        
        <div className={S.dividerFilter}>
          <LayoutFilter/>
        </div>
        </Row>
        <div className={S.print}>
          <Row wrap className={S.row}>
            <div className={S.zoom}>
              <LayoutZoom/>
            </div>
            <div className={S.printSettings}>
              <PrintSettings/>
            </div>
            {dividers.length > 0 && (
              <IconButton 
                onClick={download} 
                buttonType={ButtonType.SECONDARY}
                icon="download"
              >
                ZIP {!done && (
                  <>{progress.done} / {progress.total}</>
                )}
              </IconButton>
            )}
            <IconButton 
              onClick={print} 
              icon="printer"
            >
              {t('Print')}
            </IconButton>
          </Row>
        </div>
      </Row>
    </div>
  );
}