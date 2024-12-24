// import S from './DownloadLasercutPDF.module.scss';

import { useTranslation } from "react-i18next";
import { DownloadButton } from "../DownloadButton/DownloadButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { getSimilarBleed } from "@/features/render/getSimilarBleed";
import { useEffect, useMemo, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { PDFLayout } from "./components/PDFLayout";
import { PDFDownloader } from "./features/PDFDownloader";
import { saveAs } from "file-saver";
import { selectDoubleSided, selectItemsPerPage, selectPageOrientation, selectPageSizeType, selectRowsPerPage } from "@/store/features/print/print";

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
  const bleed = getSimilarBleed(layout.bleed);

  const doubleSidedPrint = useAppSelector(selectDoubleSided);
	const groupSize = useAppSelector(selectItemsPerPage);
	const rowSize = useAppSelector(selectRowsPerPage);
  const pageSizeType = useAppSelector(selectPageSizeType);
  const pageOrientation = useAppSelector(selectPageOrientation);

  const [items, setItems] = useState<Uint8Array[]>([])

  const name = `Arkham Divider`;

  const downloader = useMemo(() => {
    return new PDFDownloader({
      imageFormat: 'png',
      colorScheme: 'cmyk',
      name,
      bleed
    });
  }, [layout]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const data = items.map(item => {
      const blob = new Blob([item]);
      return URL.createObjectURL(blob);
    });

    const container = (
      <PDFLayout 
        data={data}
        doubleSidedPrint={doubleSidedPrint}
        groupSize={groupSize}
        rowSize={rowSize}
        pageSizeType={pageSizeType}
        pageOrientation={pageOrientation}
        bleed={bleed}
      />
    )
    const asPdf = pdf(); // {} is important, throws without an argument
    asPdf.updateContainer(container);
    
    asPdf
      .toBlob()
      .then(blob => {
        saveAs(blob, `${name}.pdf`);

        data.forEach(url => URL.revokeObjectURL(url));
      })
    

    setItems([]);

  }, [items, doubleSidedPrint, groupSize, rowSize, pageSizeType, pageOrientation, bleed, name]);

  downloader
    .on('render', setItems);
  // const Container = (data && <PDFLayout data={data} onRender={onRender}/>);

  return (
    <DownloadButton
      renderer={downloader.renderer}
      icon="file-pdf"
    >
      {t('HQ PDF')}
    </DownloadButton>
  );
}