import { PropsWithClassName } from "@/shared/types/util";
import S from "./Page.module.scss";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import { PageOrientation, PageSide, PageSize } from "@/shared/types/print";
import {
	CREDITS_HEIGHT,
	PageCredits,
} from "@/components/info/PageCredits/PageCredits";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/app/store/features/layout/layout";
import {
	selectBleed,
	selectPageOrientation,
	selectPageSizeType,
} from "@/app/store/features/print/print";
import { Container } from "./components";

export type PageProps = PropsWithClassName &
	PropsWithChildren & {
		side: PageSide;
		showPageSide?: boolean;
		pageNumber: number;
		pagesTotal: number;
		isLast: boolean;
		rows: number;
	};

const COUNTER_SIZE = 10;

export const Page = ({
	showPageSide = false,
	isLast = false,
	pageNumber,
	pagesTotal,
	rows,
	className,
	children,
	side,
}: PageProps) => {
	const pageSizeType = useAppSelector(selectPageSizeType);
	const pageOrientation = useAppSelector(selectPageOrientation);
	const bleed = useAppSelector(selectBleed);
	const layout = useAppSelector(selectLayout);
	const { width, height } = bleed ? layout.bleed : layout;
	const size = PageSize[pageSizeType];

	const [pageWidth, pageHeight] =
		pageOrientation === PageOrientation.PORTRAIT
			? [size.width, size.height]
			: [size.height, size.width];

	const freeHeight = pageHeight - rows * height;
	const freeWidth = pageWidth % width;

	const showCredits = freeHeight >= CREDITS_HEIGHT;

	const rotateCounter =
		freeWidth / 2 < COUNTER_SIZE && freeHeight / 2 < COUNTER_SIZE;

	const classList = classNames(
		S.container,
		S[`side_${side}`],
		className,
		isLast ? S.last : S.page,
		side === PageSide.FRONT && "page",
	);

	return (
		<Container
			className={classList}
			$portrait={pageOrientation === PageOrientation.PORTRAIT}
			$size={size}
			$freeHeight={freeHeight}
			$showCredits={showCredits}
			$isLast={isLast}
		>
			{children}

			<div
				className={classNames(S.counter, rotateCounter && S.counter_rotated)}
			>
				{pageNumber}
				{showPageSide && (side === PageSide.FRONT ? "A" : "B")} / {pagesTotal}
			</div>
			{showCredits && isLast && (
				<div className={S.credits}>
					<PageCredits />
				</div>
			)}
		</Container>
	);
};
