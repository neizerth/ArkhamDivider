import { useAppSelector } from '@/hooks/useAppSelector';
import { DownloadZIPButton } from '../DownloadZIPButton/DownloadZIPButton';
import { selectLayout } from '@/store/features/layout/layout';
import { getSimilarBleed } from '@/features/render/getSimilarBleed';
import { createDividerZip } from '@/features/zip/createDividerZip';
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

  const renderer = createDividerZip({
    name,
    imageFormat: 'png',
    bleed
  });

  return (
    <DownloadZIPButton
      renderer={renderer}
    >
      PNG
    </DownloadZIPButton>
  );
}