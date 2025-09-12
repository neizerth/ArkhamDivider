import { LayoutZoom, Row } from '@/components';
import { DownloadCMYKButton } from '@/components/actions/DownloadCMYKButton/DownloadCMYKButton';
import { DownloadLasercutPDF } from '@/components/actions/DownloadLasercutPDF/DownloadLasercutPDF';
import { DownloadPNGButton } from '@/components/actions/DownloadPNGButton/DownloadPNGButton';
import { CornerRadiusSettings } from '../CornerRadiusSettings/CornerRadiusSettings';
import { PageSizeSettings } from '../PageSizeSettings/PageSizeSettings';
import S from './AdditionalSettings.module.scss';

export const AdditionalSettings = () => {
  return (
    <div className={S.container}>
      <Row gap='responsive' className={S.row} wrap={true}>
        <div className={S.item}>
          <LayoutZoom />
        </div>
        <div className={S.item}>
          <PageSizeSettings />
        </div>
        <div className={S.item}>
          <CornerRadiusSettings />
        </div>
        <div className={S.item}>
          <DownloadLasercutPDF />
        </div>
        <div className={S.item}>
          <DownloadCMYKButton />
        </div>
        <div className={S.item}>
          <DownloadPNGButton />
        </div>
      </Row>
      <div className={S.shadow}></div>
    </div>
  );
};
