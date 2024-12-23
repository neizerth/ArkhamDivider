// import S from './DownloadLasercutPDF.module.scss';

import { useTranslation } from "react-i18next";
import { DownloadButton } from "../DownloadButton/DownloadButton";
import { DividerNodeRenderer } from "@/features/render/DividerNodeRenderer";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { getSimilarBleed } from "@/features/render/getSimilarBleed";
import { useCallback, useEffect, useState } from "react";
import { createPDFRenderer } from "@/features/pdf/createPDFRender";
import { rgb2cmyk } from "@/features/image/rgb2cmyk";
import { selectPageOrientation, selectPageSizeType } from "@/store/features/print/print";
import { LasercutPDF } from "./features/LasercutPDF";
import { RenderPDFOptions } from "./types";
import { PDFLayout } from "./PDFLayout";

export type DownloadLasercutPDFProps = {

}

export const renderBlob = (data: Uint8Array[]) => {
  const asPdf = pdf(<PDFLayout data={data}/>); // {} is important, throws without an argument
  asPdf.updateContainer(doc);
  
  return asPdf.toBlob();
}

export const DownloadLasercutPDF = ({}: DownloadLasercutPDFProps) => {
  const { t } = useTranslation();
  const pageSizeType = useAppSelector(selectPageSizeType);
  const pageOrientation = useAppSelector(selectPageOrientation);
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