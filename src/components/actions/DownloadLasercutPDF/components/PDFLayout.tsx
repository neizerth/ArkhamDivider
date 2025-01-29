import { splitIntoPages } from "@/shared/lib/features/print";
import { Document, Image, Page, StyleSheet, View } from "@react-pdf/renderer";
import { uniqId } from "@/shared/lib/features/util/common";
import {
	PageOrientation,
	PageSizeType,
	PrintPageSize,
} from "@/shared/model/types/print";
import { IEqualLayoutBleed, ILayout } from "@/shared/model/types/layouts";
import { toPrintSize } from "@/shared/lib/features/util/units";
import { PDFRow as Row } from "./PDFRow";
import { PDFPageGuides as PageGuides } from "./guides/PDFPageGuides";
import { IDivider } from "@/shared/model/types/dividers";

const styles = StyleSheet.create({
	page: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	content: {
		position: "relative",
		zIndex: -1,
	},
	guides: {
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
	},
});

export type PDFLayoutOptions = {
	data: string[];
	doubleSidedPrint: boolean;
	groupSize: number;
	rowSize: number;
	pageSizeType: PageSizeType;
	pageOrientation: PageOrientation;
	bleed: IEqualLayoutBleed;
	cornerRadius: boolean;
	dividers: IDivider[];
	layout: ILayout;
};

export const PDFLayout = ({
	data,
	doubleSidedPrint,
	groupSize,
	rowSize,
	pageSizeType,
	bleed,
	cornerRadius,
	dividers,
	layout,
}: PDFLayoutOptions) => {
	const items = data.map((src) => ({
		id: uniqId(),
		src,
	}));

	const pages = splitIntoPages(items, {
		doubleSidedPrint,
		groupSize,
		rowSize,
	});

	const pageSize = PrintPageSize[pageSizeType];
	const size: [number, number] = [pageSize.width, pageSize.height];

	const dividerWithBleedStyle = {
		width: Math.round(toPrintSize(bleed.width)),
		height: Math.round(toPrintSize(bleed.height)),
	};

	const guideArea = {
		...dividerWithBleedStyle,
		bleedSize: Math.round(toPrintSize(bleed.size)),
	};

	return (
		<Document>
			{pages.map(({ rows }, pageIndex) => (
				<Page size={size} key={pageIndex} style={[styles.page]}>
					<PageGuides
						area={guideArea}
						rows={rows}
						pageSize={pageSize}
						style={styles.guides}
						cornerRadius={cornerRadius}
						dividers={dividers}
						layout={layout}
					/>
					<View style={styles.content}>
						{rows.map((row, rowIndex) => (
							<Row key={rowIndex}>
								{row.map((divider) => (
									<Image
										key={divider.id}
										src={divider.src}
										style={dividerWithBleedStyle}
									/>
								))}
							</Row>
						))}
					</View>
				</Page>
			))}
		</Document>
	);
};
