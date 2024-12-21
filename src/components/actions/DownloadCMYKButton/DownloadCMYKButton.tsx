// import S from './DownloadCMYKButton.module.scss';

import { createDividerZip, CreateDividerZipOptions } from "@/features/zip/createDividerZip";
import { DownloadZIPButton } from "../DownloadZIPButton/DownloadZIPButton";
import { rgb2cmyk } from "@/features/image/rgb2cmyk";
import { getSimilarBleed } from "@/features/render/getSimilarBleed";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { useTranslation } from "react-i18next";

export type DownloadCMYKButtonProps = {
  mapRenderResponse?: CreateDividerZipOptions['mapRenderResponse']
}

export const DownloadCMYKButton = ({}: DownloadCMYKButtonProps) => {

  const { t } = useTranslation();

  const layout = useAppSelector(selectLayout);

  const bleed = getSimilarBleed(layout.bleed);

  const bleedText = bleed.size.toFixed(1);
  const bleedTranslation = t('Bleed').toLowerCase();
  const name = `Arkham Divider (${bleedTranslation} ${bleedText}mm)`;

  const renderer = createDividerZip({
    name,
    imageFormat: 'tiff',
    bleed,
    mapRenderResponse: rgb2cmyk
  });

  return (
    <DownloadZIPButton
      renderer={renderer}
    >
      TIFF
    </DownloadZIPButton>
  );
}