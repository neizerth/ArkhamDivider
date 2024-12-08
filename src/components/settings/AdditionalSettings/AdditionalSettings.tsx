import { useState } from 'react';
import S from './AdditionalSettings.module.scss';
import { DownloadZIPButton } from '@/actions/DownloadZIPButton/DownloadZIPButton';
import { PageSizeSettings } from '../PageSizeSettings/PageSizeSettings';

export type AdditionalSettingsProps = {

}

export const AdditionalSettings = ({}: AdditionalSettingsProps) => {
  const [display, setDisplay] = useState(false); 
  const toggleDisplay = () => setDisplay(!display);

  return (
    <div className={S.container}>
      <div 
        className={S.button}
        onClick={toggleDisplay}
      >
        <div className={S.buttonText}>
          ...
        </div>
      </div>
      {display && (
        <div className={S.panel}>
          <div className={S.item}>
            <PageSizeSettings/>
          </div>
          <div className={S.item}>
            <DownloadZIPButton/>
          </div>
        </div>
      )}
    </div>
  );
}