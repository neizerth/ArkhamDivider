import Box from "@mui/material/Box";
import { memo } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import {
	selectCategoryId,
	selectPrintableLayoutSize,
} from "@/modules/divider/shared/lib";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import {
	selectPreviewZoom,
	selectWebPrintScale,
} from "@/modules/print/shared/lib";
import {
	getRenderScale,
	selectDividerRenderId,
} from "@/modules/render/shared/lib";
import { absoluteFill } from "@/shared/config";
import { useAppSelector, useBoundingRect } from "@/shared/lib";
import { dividerComponents } from "../../../items";
import {
	getScaleSx,
	iconSx,
	outlineSx,
	renderContainerSx,
} from "./DividerView.styles";

type DividerViewProps = DividerWithRelations;

export function DividerView(props: DividerViewProps) {
	const layoutSize = useAppSelector(selectPrintableLayoutSize);
	const categoryId = useAppSelector(selectCategoryId);
	const printScale = useAppSelector(selectWebPrintScale);
	const previewZoom = useAppSelector(selectPreviewZoom);
	const renderId = useAppSelector(selectDividerRenderId);
	const [ref, rect] = useBoundingRect();

	if (!layoutSize || !categoryId) {
		return null;
	}
	const Component = dividerComponents[categoryId];

	if (!Component) {
		return null;
	}
	const { size } = layoutSize;
	const isRendering = renderId === props.id;
	const scale = getRenderScale({
		boundingRect: rect,
		previewZoom,
		contentWidth: size.width,
		isRendering,
	});

	return (
		<Box
			ref={ref}
			sx={{
				position: "relative",
				width: "100%",
				height: "100%",
			}}
		>
			{isRendering && (
				<Box sx={renderContainerSx}>
					<Box sx={outlineSx} />
					<Icon sx={iconSx} icon="spinner3" />
				</Box>
			)}
			{rect && (
				<Box
					sx={{
						...absoluteFill,
						overflow: "hidden",
					}}
				>
					<Box
						data-divider-node-id={`${props.id}:${props.side}`}
						sx={{
							...size,
							...getScaleSx(scale),
							position: "absolute",
							top: 0,
							left: 0,
							letterSpacing: 0,
							transformOrigin: "top left",
							overflow: "hidden",
							"@media print": {
								...getScaleSx(printScale),
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
