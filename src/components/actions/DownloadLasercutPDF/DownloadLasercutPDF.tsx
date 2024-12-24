// import S from './DownloadLasercutPDF.module.scss';

import { useTranslation } from "react-i18next";
import { DownloadButton } from "../DownloadButton/DownloadButton";
import { DividerNodeRenderer } from "@/features/render/DividerNodeRenderer";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { getSimilarBleed } from "@/features/render/getSimilarBleed";
import { useEffect, useState } from "react";
import { createPDFRenderer } from "@/features/pdf/createPDFRender";
import { rgb2cmyk } from "@/features/image/rgb2cmyk";
import { pdf } from "@react-pdf/renderer";
import { PDFLayout } from "./PDFLayout";

export type DownloadLasercutPDFProps = {

}

export const renderBlob = (data: Uint8Array[]) => {
  const container = (<PDFLayout data={data}/>);
  const asPdf = pdf(); // {} is important, throws without an argument
  asPdf.updateContainer(container);
  
  return asPdf.toBlob();
}

export const DownloadLasercutPDF = ({}: DownloadLasercutPDFProps) => {
  const { t } = useTranslation();
  const layout = useAppSelector(selectLayout);
  const { bleed } = layout;
  const { size } = getSimilarBleed(bleed);

  const bleedText = size.toFixed(1);
  const bleedTranslation = t('Bleed').toLowerCase();
  const name = `Arkham Divider (${bleedTranslation} ${bleedText}mm)`;

  const defaultRenderer = createPDFRenderer({
    name,
    bleed,
    imageFormat: 'tiff',
    transformResponse: rgb2cmyk,
    renderBlob,
  });

  const [renderer, setRenderer] = useState<DividerNodeRenderer>(defaultRenderer);

  useEffect(() => {
    const renderer = createPDFRenderer({
      name,
      bleed,
      imageFormat: 'tiff',
      renderBlob,
    });

    setRenderer(renderer);
  }, [bleed])

  return (
    <DownloadButton
      renderer={renderer}
      icon="file-pdf"
    >
      {t('Lasercut PDF')}
    </DownloadButton>
  );
}