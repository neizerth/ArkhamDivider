import { A4, Row, Divider } from '@/components';

import S from './Layout.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectDividers } from '@/store/features/dividers/dividers';

import classNames from 'classnames';
import { selectDoubleSided, selectItemPerPage } from '@/store/features/print/print';
import { splitIntoPages } from '@/util/print';
import { selectLayout } from '@/store/features/layout/layout';

export type LayoutProps = {
}

export const Layout = ({ }: LayoutProps) => {
	const dividers = useAppSelector(selectDividers);
	const doubleSidedPrint = useAppSelector(selectDoubleSided);
	const itemPerPage = useAppSelector(selectItemPerPage);
	const layout = useAppSelector(selectLayout);

	const { 
		rowSize, 
		pageOrientation,
		maxCreditsGroupSize,
	} = layout;

	const groupSize = itemPerPage ? 1 : layout.groupSize;

	const pages = splitIntoPages(dividers, {
		doubleSidedPrint,
		groupSize, 
		rowSize
	});

	const pagesTotal = pages[pages.length - 1]?.pageNumber || 0;

	return (
		<div className={S.container}>
			<div className={S.groups}>
				{pages.map(({ side, rows, pageNumber, size }, pageIndex) => (
					<A4 
						className={S.page}
						side={side}
						showPageSide={doubleSidedPrint}
						pageNumber={pageNumber}
						pagesTotal={pagesTotal}
						isLast={pageNumber === pagesTotal}
						showCredits={!itemPerPage && (!maxCreditsGroupSize || maxCreditsGroupSize >= size)}
						key={pageIndex}
						orientation={pageOrientation}
					>
						<div className={S.group}>
							{rows.map((row, rowIndex) => (
								<Row 
									gap={false}
									className={classNames(S.row, S[`row_side_${side}`])} 
									key={rowIndex}
								>
									{row.map((divider, index) => (
										<Divider 
											{...divider} 
											key={index}
										/>
									))}
								</Row>
							))}
						</div>
					</A4>
				))}
			</div>
		</div>
	);
}