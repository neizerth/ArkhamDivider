import Box from "@mui/material/Box";
import { memo } from "react";
import {
	selectCategoryId,
	selectExportDividerId,
	selectPrintableLayoutSize,
} from "@/modules/divider/shared/lib";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { selectWebPrintScale } from "@/modules/print/shared/lib";
import { absoluteFill } from "@/shared/config";
import { useAppSelector, useBoundingRect } from "@/shared/lib";
import { dividerComponents } from "../../../items";
import { outlineSx } from "./DividerView.styles";

type DividerViewProps = DividerWithRelations;

export function DividerView(props: DividerViewProps) {
	const layoutSize = useAppSelector(selectPrintableLayoutSize);
	const categoryId = useAppSelector(selectCategoryId);
	const printScale = useAppSelector(selectWebPrintScale);
	const exportId = useAppSelector(selectExportDividerId);
	const [ref, rect] = useBoundingRect();

	if (!layoutSize || !categoryId) {
		return null;
	}
	const Component = dividerComponents[categoryId];

	if (!Component) {
		return null;
	}
	const { size } = layoutSize;
	const scale = rect ? rect.width / size.width : 1;

	return (
		<Box
			ref={ref}
			sx={{
				position: "relative",
				width: "100%",
			}}
		>
			{exportId === props.id && <Box sx={outlineSx} />}
			{rect && (
				<Box
					sx={{
						...absoluteFill,
						overflow: "hidden",
					}}
					data-divider-id={props.id}
				>
					<Box
						sx={{
							...size,
							position: "absolute",
							top: 0,
							left: 0,
							transformOrigin: "top left",
							zoom: scale,
							"@media print": {
								zoom: printScale,
							},
						}}
					>
						<Component {...props} />
					</Box>
				</Box>
			)}
		</Box>
	);
}

export const DividerViewMemo = memo(DividerView);
