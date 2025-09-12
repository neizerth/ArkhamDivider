// import S from './DownloadLasercutPDF.module.scss';

import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components';
import { cleanupVips } from '@/shared/lib/features/image/vips';
import { getLayoutGrid } from '@/shared/lib/features/layouts/getLayoutGrid';
import { destroyObject } from '@/shared/lib/features/memory/memoryUtils';
import { getEmptyBleed } from '@/shared/lib/features/render/getEmptyBleed';
import { getSimilarBleed } from '@/shared/lib/features/render/getSimilarBleed';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectDividers } from '@/shared/store/features/dividers/dividers';
import { selectLayout } from '@/shared/store/features/layout/layout';
import {
  selectBleed,
  selectCornerRadius,
  selectDoubleSided,
  selectPageSizeType,
} from '@/shared/store/features/print/print';
import { DownloadButton } from '../DownloadButton/DownloadButton';
import { PDFLayout } from './components/PDFLayout';
import { PDFDownloader } from './features/PDFDownloader';

export const DownloadLasercutPDF = () => {
  const layout = useAppSelector(selectLayout);
  const useBleed = useAppSelector(selectBleed);
  const bleed = useBleed ? getSimilarBleed(layout.bleed) : getEmptyBleed(layout.bleed);

  const doubleSidedPrint = useAppSelector(selectDoubleSided);
  const pageSizeType = useAppSelector(selectPageSizeType);
  const cornerRadius = useAppSelector(selectCornerRadius);
  const dividers = useAppSelector(selectDividers);

  const [items, setItems] = useState<BlobPart[]>([]);

  const name = `Arkham Divider`;

  const downloader = useMemo(() => {
    return new PDFDownloader({
      imageFormat: 'png',
      colorScheme: 'cmyk',
      name,
      bleed,
    });
  }, [bleed]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const data = items.map((item) => {
      const blob = new Blob([item]);
      return URL.createObjectURL(blob);
    });

    console.log('data', data);

    const { rowsPerPage, itemsPerPage, pageOrientation } = getLayoutGrid({
      layout,
      bleed: true,
      pageSizeType,
    });

    let container: React.ReactElement | null = (
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
    );
    const asPdf = pdf(); // {} is important, throws without an argument
    asPdf.updateContainer(container);

    asPdf
      .toBlob()
      .then((blob) => {
        console.log('blob', blob);
        saveAs(blob, `${name}.pdf`);

        // Clean up object URLs
        for (const url of data) {
          URL.revokeObjectURL(url);
        }

        // Clean up PDF blob
        destroyObject(blob);

        // Clean up PDF object
        destroyObject(asPdf);
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);

        // Clean up object URLs even on error
        for (const url of data) {
          URL.revokeObjectURL(url);
        }

        // Clean up PDF object even on error
        destroyObject(asPdf);
      });

    container = null;
    setItems([]);
  }, [items, doubleSidedPrint, pageSizeType, bleed, cornerRadius, dividers, layout]);

  useEffect(() => {
    const handleRender = (items: BlobPart[]) => {
      console.log('handleRender', items);
      setItems(items);
    };

    downloader.on('render', handleRender);

    return () => {
      downloader.off('render', handleRender);
      // Clean up downloader when component unmounts
      downloader.destroy();
      // Clean up VIPS memory
      cleanupVips();
    };
  }, [downloader]);

  return (
    <DownloadButton renderer={downloader.renderer}>
      PDF <Badge size={'small'}>HQ</Badge>
    </DownloadButton>
  );
};
