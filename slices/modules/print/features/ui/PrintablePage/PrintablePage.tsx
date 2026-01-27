import Stack from "@mui/material/Stack";
import { pick, range } from "ramda";
import type { DividerLayout } from "@/modules/divider/shared/model";
import type { PageFormat, PageLayout } from "@/modules/print/shared/model";
import { Page } from "@/modules/print/shared/ui";
import type { WithId } from "@/shared/model";
import { Row } from "@/shared/ui";
import { getRelativeBoxSize, percentage } from "@/shared/util";

type PrintablePageProps<Props extends WithId> = {
	pageLayout: PageLayout<Props>;
	pageFormat: PageFormat;
	layout: DividerLayout;
	Component: React.ComponentType<Props>;
};

export function PrintablePage<T extends WithId>({
	pageLayout,
	pageFormat,
	layout,
	Component,
}: PrintablePageProps<T>) {
	const { items, size, grid } = pageLayout;
	const rows = range(0, grid.rows);
	const cols = range(0, grid.cols);

	const pageSize = pageFormat.size.mm;
	const containerSize = getRelativeBoxSize(pageSize, size);
	const layoutSize = layout.size;
	const unitAspectRatio = layoutSize.width / layoutSize.height;

	const aspectRatio = size.width / size.height;

	const containerSx = {
		aspectRatio,
		width: percentage(containerSize.width),
	};

	const pageOptions = pick(["side", "number", "total"], pageLayout);

	return (
		<Page {...pageOptions} {...pageSize} data-id={pageLayout.number}>
			<Stack sx={containerSx}>
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
		</Page>
	);
}
