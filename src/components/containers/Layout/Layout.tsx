import { Divider, A4, Row, HiddenSets } from '@/components';

import S from './Layout.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ILayout } from '@/types/layouts';
import { selectDividers, selectHiddenSets, showAllSets } from '@/store/features/dividers/dividers';
import { useCallback } from 'react';
import classNames from 'classnames';
import { selectBleeds, selectDoubleSided } from '@/store/features/print/print';
import { splittIntoPages } from '@/util/print';
import { useAppDispatch } from '@/hooks/useAppDispatch';

export type LayoutProps = {
	layout: ILayout
}

export const Layout = ({ layout }: LayoutProps) => {
	const dispatch = useAppDispatch();
	const hiddenSets = useAppSelector(selectHiddenSets);
	const dividers = useAppSelector(selectDividers);
	const doubleSidedPrint = useAppSelector(selectDoubleSided);
	const useBleeds = useAppSelector(selectBleeds);

	const { 
		groupSize, 
		rowSize, 
		image, 
		type, 
		color,
		orientation,
		id
	} = layout;

	const clear = () => dispatch(showAllSets([]));

	useCallback(() => {
		clear()
	}, [dividers, clear]);

	const availableDividers = dividers.filter(({ id }) => !hiddenSets.includes(id));

	const pages = splittIntoPages(availableDividers, {
		doubleSidedPrint,
		groupSize, 
		rowSize
	});

	const pagesTotal = pages[pages.length - 1]?.pageNumber || 0;

	return (
		<div className={S.container}>

			<HiddenSets/>

			<div className={S.groups}>
				{pages.map(({ side, rows, pageNumber }, pageIndex) => (
					<A4 
						className={S.page}
						side={side}
						showPageSide={doubleSidedPrint}
						pageNumber={pageNumber}
						pagesTotal={pagesTotal}
						isLast={pageNumber === pagesTotal}
						key={pageIndex}
						orientation={orientation}
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
											color={color}
											background={image}
											type={type}
											layoutId={id}
											bleeds={useBleeds}
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