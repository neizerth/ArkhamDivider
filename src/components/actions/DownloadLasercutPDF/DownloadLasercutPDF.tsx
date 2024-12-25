import S from './DownloadLasercutPDF.module.scss';

import { DownloadButton } from "../DownloadButton/DownloadButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { getSimilarBleed } from "@/features/render/getSimilarBleed";
import { useEffect, useMemo, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { PDFLayout } from "./components/PDFLayout";
import { PDFDownloader } from "./features/PDFDownloader";
import { saveAs } from "file-saver";
import { selectCornerRadius, selectDoubleSided, selectPageSizeType } from "@/store/features/print/print";
import { selectDividers } from '@/store/features/dividers/dividers';
import { getLayoutGrid } from '@/features/layouts/getLayoutGrid';

export type DownloadLasercutPDFProps = {

}

export const DownloadLasercutPDF = ({}: DownloadLasercutPDFProps) => {
  const layout = useAppSelector(selectLayout);
  const bleed = getSimilarBleed(layout.bleed);

  const doubleSidedPrint = useAppSelector(selectDoubleSided);
  const pageSizeType = useAppSelector(selectPageSizeType);
  const cornerRadius = useAppSelector(selectCornerRadius);
  const dividers = useAppSelector(selectDividers);

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

    const {
      rowsPerPage,
      itemsPerPage,
      pageOrientation
    } = getLayoutGrid({
      layout,
      bleed: true,
      pageSizeType
    });

    const container = (
      <PDFLayout 
        data={data}
        doubleSidedPrint={doubleSidedPrint}
        groupSize={itemsPerPage}
        rowSize={rowsPerPage}
        pageSizeType={pageSizeType}
        pageOrientation={pageOrientation}
        bleed={bleed}
        cornerRadius={cornerRadius}
        dividers={dividers}
        layout={layout}
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

  }, [
    items, 
    doubleSidedPrint, 
    pageSizeType,
    bleed, 
    name, 
    cornerRadius,
    dividers,
    layout
  ]);

  downloader
    .on('render', setItems);
  // const Container = (data && <PDFLayout data={data} onRender={onRender}/>);

  return (
    <DownloadButton
      renderer={downloader.renderer}
    >
      PDF <div className={S.badge}>HQ</div>
    </DownloadButton>
  );
}