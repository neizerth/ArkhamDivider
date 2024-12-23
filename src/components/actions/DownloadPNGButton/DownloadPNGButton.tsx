import { useAppSelector } from '@/hooks/useAppSelector';
import { DownloadButton } from '../DownloadButton/DownloadButton';
import { selectLayout } from '@/store/features/layout/layout';
import { getSimilarBleed } from '@/features/render/getSimilarBleed';
import { createZipRenderer } from '@/features/zip/createZipRenderer';
import { useTranslation } from 'react-i18next';
// import S from './DownloadPNGButton.module.scss';

export type DownloadPNGButtonProps = {

}

export const DownloadPNGButton = ({}: DownloadPNGButtonProps) => {

  const { t } = useTranslation();

  const layout = useAppSelector(selectLayout);

  const bleed = getSimilarBleed(layout.bleed);

  const bleedText = bleed.size.toFixed(1);
  const bleedTranslation = t('Bleed').toLowerCase();
  const name = `Arkham Divider (${bleedTranslation} ${bleedText}mm)`;

  const renderer = createZipRenderer({
    name,
    imageFormat: 'png',
    bleed
  });

  return (
    <DownloadButton
      renderer={renderer}
    >
      PNG
    </DownloadButton>
  );
}