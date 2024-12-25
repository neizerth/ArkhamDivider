// import S from './DownloadCMYKButton.module.scss';

import { createZipRenderer as createZipRenderer } from "@/features/zip/createZipRenderer";
import { DownloadButton } from "../DownloadButton/DownloadButton";
import { getSimilarBleed } from "@/features/render/getSimilarBleed";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { useTranslation } from "react-i18next";

export type DownloadCMYKButtonProps = {
}

export const DownloadCMYKButton = ({}: DownloadCMYKButtonProps) => {

  const { t } = useTranslation();

  const layout = useAppSelector(selectLayout);
  const bleed = getSimilarBleed(layout.bleed);
  const { size } = bleed;

  const bleedText = size.toFixed(1);
  const bleedTranslation = t('Bleed').toLowerCase();
  const name = `Arkham Divider (${bleedTranslation} ${bleedText}mm)`;

  const renderer = createZipRenderer({
    name,
    imageFormat: 'tiff',
    colorScheme: 'cmyk',
    bleed,
  });

  return (
    <DownloadButton
      renderer={renderer}
    >
      TIFF
    </DownloadButton>
  );
}