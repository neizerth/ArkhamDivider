import S from './AdditionalSettings.module.scss';
import { PageSizeSettings } from '../PageSizeSettings/PageSizeSettings';
import { LayoutZoom, Row } from '@/components';
import { DownloadPNGButton } from '@/components/actions/DownloadPNGButton/DownloadPNGButton';
import { DownloadCMYKButton } from '@/components/actions/DownloadCMYKButton/DownloadCMYKButton';

export type AdditionalSettingsProps = {

}

export const AdditionalSettings = ({}: AdditionalSettingsProps) => {

  return (
    <div className={S.container}>
      <Row gap='responsive' className={S.row}>
        <div className={S.item}>
          <LayoutZoom/>
        </div>
        <div className={S.item}>
          <PageSizeSettings/>
        </div>
        <div className={S.item}>
          <DownloadCMYKButton/>
        </div>
        <div className={S.item}>
          <DownloadPNGButton/>
        </div>
      </Row>
      <div className={S.shadow}></div>
    </div>
  );
}