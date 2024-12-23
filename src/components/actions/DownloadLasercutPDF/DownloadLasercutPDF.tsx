// import S from './DownloadLasercutPDF.module.scss';

import { useTranslation } from "react-i18next";
import { DownloadButton } from "../DownloadButton/DownloadButton";
import { DividerNodeRenderer } from "@/features/render/DividerNodeRenderer";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { getSimilarBleed } from "@/features/render/getSimilarBleed";
import { OnRenderEventData } from "@/types/render";
import { useEffect, useState } from "react";
import ReactPDF from '@react-pdf/renderer';

export type DownloadLasercutPDFProps = {

}

export const DownloadLasercutPDF = ({}: DownloadLasercutPDFProps) => {
  const { t } = useTranslation();
  const layout = useAppSelector(selectLayout);
  const bleed = getSimilarBleed(layout.bleed);

  const [isReady, setIsReady] = useState(false);
  const [items, setItems] = useState<Uint8Array[]>([]);

  const [renderer] = useState(new DividerNodeRenderer({
    bleed,
    imageFormat: 'png'
  }));

  useEffect(() => {
    renderer
    .on('start', () => {
      setIsReady(false);
      setItems([]);
    })
    .on('render', ({ data, done, total }: OnRenderEventData) => {
      const { contents } = data;
      setIsReady(total === done);
      setItems(prev => [
        ...prev,
        contents
      ]);
    });

  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    setIsReady(false);

    ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);

  }, [isReady]);

  return (
    <DownloadButton
      renderer={renderer}
      icon="file-pdf"
    >
      {t('Lasercut PDF')}
    </DownloadButton>
  );
}