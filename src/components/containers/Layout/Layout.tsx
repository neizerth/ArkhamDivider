import { Page, Row, ZoomView, DividerMemo } from "@/components";

import S from "./Layout.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectDividers } from "@/shared/lib/store/features/dividers/dividers";

import classNames from "classnames";
import {
	selectDoubleSided,
	selectItemsPerPage,
	selectRowsPerPage,
} from "@/shared/lib/store/features/print/print";
import { splitIntoPages } from "@/shared/lib/features/print";
import { selectZoom } from "@/shared/lib/store/features/layout/layout";
import { prop } from "ramda";

export const Layout = () => {
	const dividers = useAppSelector(selectDividers);
	const doubleSidedPrint = useAppSelector(selectDoubleSided);
	const zoom = useAppSelector(selectZoom);
	const groupSize = useAppSelector(selectItemsPerPage);
	const rowSize = useAppSelector(selectRowsPerPage);
	
	const pages = splitIntoPages(dividers, {
		doubleSidedPrint,
		groupSize,
		rowSize,
	});

	const pagesTotal = pages[pages.length - 1]?.pageNumber || 0;

	const ids = dividers.filter(({ backId }) => !backId).map(prop("id"));

	return (
		<div className={S.container}>
			<ZoomView zoom={zoom}>
				<div className={S.groups}>
					{pages.map(({ side, rows, pageNumber }, pageIndex) => (
						<Page
							className={S.page}
							side={side}
							showPageSide={doubleSidedPrint}
							pageNumber={pageNumber}
							pagesTotal={pagesTotal}
							isLast={pageNumber === pagesTotal}
							rows={rows.length}
							key={pageIndex}
						>
							<div className={S.group}>
								{rows.map((row, rowIndex) => (
									<Row
										gap={false}
										className={classNames(S.row, S[`row_side_${side}`])}
										key={rowIndex}
									>
										{row.map((divider) => (
											<DividerMemo
												{...divider}
												index={ids.indexOf(divider.id)}
												rowIndex={rowIndex + 1}
												key={divider.id}
											/>
										))}
									</Row>
								))}
							</div>
						</Page>
					))}
				</div>
			</ZoomView>
		</div>
	);
};
