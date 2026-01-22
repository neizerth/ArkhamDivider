import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { pick } from "ramda";
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
	const { items, size } = pageLayout;
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
		<Page {...pageOptions} {...pageSize}>
			<Stack sx={containerSx}>
				{items.map((row) => (
					<Row key={row.id}>
						{row.items.map((item) => (
							<Box
								key={item.id}
								sx={{
									aspectRatio: unitAspectRatio,
									width: "100%",
								}}
							>
								<Component {...item} />
							</Box>
						))}
					</Row>
				))}
			</Stack>
		</Page>
	);
}
