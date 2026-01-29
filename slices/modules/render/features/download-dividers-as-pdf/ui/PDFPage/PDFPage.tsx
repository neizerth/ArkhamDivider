import { Page, Text, View } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/stylesheet";
import { range } from "ramda";
import type { PropsWithChildren } from "react";
import { PDFRow as Row, PDFStack as Stack } from "@/modules/pdf/shared/ui";
import { fromPx, getPageCounterText, mm2px } from "@/modules/print/shared/lib";
import type { DPI, PageFormat, PageLayout } from "@/modules/print/shared/model";
import type { DividerRender } from "@/modules/render/shared/model";
import type { Side } from "@/shared/model";
import S from "./PDFPage.styles";

type PDFPageProps = PropsWithChildren & {
	side: Side;
	pageFormat: PageFormat;
	pageLayout: PageLayout<DividerRender>;
	dpi: DPI;
	number: number;
	total: number;
	showSide?: boolean;
	Component: React.ComponentType<DividerRender>;
};

export function PDFPage({
	side,
	pageFormat,
	pageLayout,
	number,
	total,
	showSide,
	dpi,
	Component,
}: PDFPageProps) {
	const mmSize = mm2px(1, dpi);
	const mm = fromPx(mmSize);
	const { width, height } = pageFormat.size.px;

	const { items, grid } = pageLayout;
	const { unitSize } = grid;
	const rows = range(0, grid.rows);
	const cols = range(0, grid.cols);

	const counterStyles: Style[] = [
		S.counter,
		{
			fontSize: mm(2.2),
			top: mm(1.5),
			right: mm(1.3),
		},
	];

	const contentStyles: Style = {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		width,
		height,
	};

	const itemStyle: Style = {
		width: mm(unitSize.width),
		height: mm(unitSize.height),
	};
	const counterText = getPageCounterText({
		number,
		total,
		showSide,
		side,
	});

	return (
		<Page style={S.page} size={[width, height]} wrap={false}>
			<Text style={counterStyles}>{counterText}</Text>
			<Stack style={contentStyles}>
				{rows.map((rowIndex) => (
					<Row key={rowIndex}>
						{cols.map((colIndex) => {
							const row = items[rowIndex];
							const item = row?.items[colIndex];
							return (
								<View key={colIndex} style={itemStyle}>
									{item && <Component {...item} />}
								</View>
							);
						})}
					</Row>
				))}
			</Stack>
		</Page>
	);
}
