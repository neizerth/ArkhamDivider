import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { LayoutFilter, LanguageSelect, PrintSettings, Row, IconButton, LayoutZoom, Button, Icon } from '@/components';
import { useDownloadDividers } from '@/hooks/useDownloadDividers';
import { ButtonType } from '@/types/ui';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectDividers } from '@/store/features/dividers/dividers';
import { detect } from 'detect-browser';
import { useMemo } from 'react';


export const AppSettings = () => {
  const { t } = useTranslation();
  const print = () => window.print();
  const { 
    download,
    progress 
  } = useDownloadDividers();
  const dividers = useAppSelector(selectDividers);

  const done = progress.done === progress.total;
  const browser = useMemo(detect, []);
  const isSafari = browser?.name ==='safari';

  const onDownload = () => {
    if (isSafari) {
      return;
    }
    download();
  };
  
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
              <>
                <IconButton 
                  onClick={onDownload} 
                  buttonType={ButtonType.SECONDARY}
                  icon="download"
                  disabled={isSafari}
                  title={isSafari ? 'Your browser is not supported' : ''}
                >
                  TIFF {!done && (
                    <>{progress.done} / {progress.total}</>
                  )}
                  {isSafari && (
                    <Icon icon="chrome"/>
                  )}
                </IconButton>

                <Button 
                  onClick={print} 
                >
                  <Icon icon="printer"/>{t('Print')} /
                  <Icon icon="download"/> PDF
                </Button>
              </>
            )}
          </Row>
        </div>
      </Row>
    </div>
  );
}