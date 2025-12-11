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

  const bleed = useMemo(() => {
    if (useBleed) {
      return getSimilarBleed(layout.bleed);
    }
    return getEmptyBleed({
      ...layout.bleed,
      width: layout.width,
      height: layout.height,
    });
  }, [useBleed, layout]);

  const doubleSidedPrint = useAppSelector(selectDoubleSided);
  const pageSizeType = useAppSelector(selectPageSizeType);
  const cornerRadius = useAppSelector(selectCornerRadius);
  const dividers = useAppSelector(selectDividers);

  const [items, setItems] = useState<BlobPart[]>([]);

  const name = `Arkham Divider`;

  const downloader = useMemo(() => {
    console.log('PDF: creating downloader');
    return new PDFDownloader({
      imageFormat: 'png',
      colorScheme: 'cmyk',
      name,
      bleed,
    });
  }, [bleed]);

  useEffect(() => {
    console.log('PDF: useEffect');
    if (items.length === 0) {
      console.log('PDF: no items');
      return;
    }
    console.log('PDF: processing items');

    const data = items.map((item) => {
      const blob = new Blob([item]);
      return URL.createObjectURL(blob);
    });

    const { rowsPerPage, itemsPerPage, pageOrientation } = getLayoutGrid({
      layout,
      bleed: bleed.size > 0,
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
      })
      .finally(() => {
        container = null;

        setItems([]);
      });
  }, [items, doubleSidedPrint, pageSizeType, bleed, cornerRadius, dividers, layout]);

  useEffect(() => {
    console.log('PDF: useEffect downloader');
    const handleRender = (items: BlobPart[]) => {
      console.log('handleRender', items);
      setItems(items);
    };

    downloader.on('render', handleRender);

    return () => {
      console.log('PDF: unmounting');
      downloader.off('render', handleRender);
      // Do not destroy renderer here: StrictMode double-mount unhooks core
      // renderer listeners, so keep it alive and only clear VIPS memory.
      cleanupVips();
    };
  }, [downloader]);

  return (
    <DownloadButton renderer={downloader.renderer}>
      PDF <Badge size={'small'}>HQ</Badge>
    </DownloadButton>
  );
};
