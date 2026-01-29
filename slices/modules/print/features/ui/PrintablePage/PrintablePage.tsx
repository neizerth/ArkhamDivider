import Stack from "@mui/material/Stack";
import { pick, range } from "ramda";
import { PAGE_CREDITS_SIZE } from "@/modules/print/shared/config";
import {
	canShowPageCredits,
	usePrintUnitByRect,
} from "@/modules/print/shared/lib";
import type { PageFormat, PageLayout } from "@/modules/print/shared/model";
import { Page } from "@/modules/print/shared/ui";
import type { WithId } from "@/shared/model";
import { Row } from "@/shared/ui";
import { getRelativeBoxSize, percentage } from "@/shared/util";
import { PageCredits } from "../PageCredits";

type PrintablePageProps<Props extends WithId> = {
	pageLayout: PageLayout<Props>;
	pageFormat: PageFormat;
	showSide?: boolean;
	Component: React.ComponentType<Props>;
};

export function PrintablePage<T extends WithId>({
	pageLayout,
	pageFormat,
	Component,
	showSide = false,
}: PrintablePageProps<T>) {
	const { width } = pageFormat.size.mm;
	const { ref, mm, size: mmSize } = usePrintUnitByRect({ width });

	const { items, grid } = pageLayout;
	const rows = range(0, grid.rows);
	const cols = range(0, grid.cols);

	const pageSize = pageFormat.size.mm;

	const containerSize = getRelativeBoxSize(pageSize, grid.size);
	const showCredits = canShowPageCredits({
		pageSize,
		areaSize: grid.unitSize,
		isLast: pageLayout.isLast,
	});

	const unitAspectRatio = grid.unitSize.width / grid.unitSize.height;

	const aspectRatio = grid.size.width / grid.size.height;

	const pageOptions = pick(["side", "number", "total"], pageLayout);

	const contentSx = {
		aspectRatio,
		width: percentage(containerSize.width),
		"@media print": {
			width: `${grid.size.width}mm`,
		},
	};

	const pageCreditsSx = {
		position: "absolute",
		bottom: mm(5),
		left: mm(5),
		right: mm(5),
		maxHeight: mm(PAGE_CREDITS_SIZE - 5),
	};

	const justifyContent = pageLayout.isLast ? "flex-start" : "center";

	return (
		<Page
			{...pageOptions}
			{...pageSize}
			mmSize={mmSize}
			ref={ref}
			showSide={showSide}
			justifyContent={justifyContent}
		>
			<Stack sx={contentSx}>
				{rows.map((rowIndex) => (
					<Row key={rowIndex}>
						{cols.map((colIndex) => {
							const row = items[rowIndex];
							const item = row?.items[colIndex];

							return (
								<Row
									key={colIndex}
									sx={{
										aspectRatio: unitAspectRatio,
										width: "100%",
									}}
								>
									{item && <Component {...item} />}
								</Row>
							);
						})}
					</Row>
				))}
			</Stack>
			{pageLayout.isLast && showCredits && (
				<PageCredits mmSize={mmSize} sx={pageCreditsSx} />
			)}
		</Page>
	);
}
