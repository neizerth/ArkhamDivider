import S from './AdditionalSettings.module.scss';
import { DownloadZIPButton } from '@/components/actions/DownloadZIPButton/DownloadZIPButton';
import { PageSizeSettings } from '../PageSizeSettings/PageSizeSettings';
import { LayoutZoom, Row } from '@/components';

export type AdditionalSettingsProps = {

}

export const AdditionalSettings = ({}: AdditionalSettingsProps) => {

  return (
    <div className={S.container}>
      <Row gap='responsive'>
        <div className={S.item}>
          <LayoutZoom/>
        </div>
        <div className={S.item}>
          <PageSizeSettings/>
        </div>
        <div className={S.item}>
          <DownloadZIPButton/>
        </div>
      </Row>
    </div>
  );
}