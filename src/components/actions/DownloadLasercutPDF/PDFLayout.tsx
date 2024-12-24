import { splitIntoPages } from "@/features/print";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Page, Document } from '@react-pdf/renderer';
import { selectDoubleSided, selectItemsPerPage, selectPageOrientation, selectPageSizeType, selectRowsPerPage } from "@/store/features/print/print";
import { uniqId } from "@/util/common";

export type PDFLayoutOptions = {
  data: Uint8Array[]
}

export const PDFLayout = ({ data }: PDFLayoutOptions) => {

  const doubleSidedPrint = useAppSelector(selectDoubleSided);
	const groupSize = useAppSelector(selectItemsPerPage);
	const rowSize = useAppSelector(selectRowsPerPage);
  const pageSizeType = useAppSelector(selectPageSizeType);
  const pageOrientation = useAppSelector(selectPageOrientation);

  const items = data.map(item => ({
    ...item,
    id: uniqId(),
  }));

	const pages = splitIntoPages(items, {
		doubleSidedPrint,
		groupSize, 
		rowSize
	});

  return (
    <Document>
      <Page 
        size={pageSizeType}
        >
          {pages.map((_, index) => (
            <Page 
              size={pageSizeType} 
              orientation={pageOrientation}
              key={index}
            >
            </Page>
          ))}
        </Page>
    </Document>
  )
}