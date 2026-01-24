import Box from "@mui/material/Box";
import {
	selectCategoryId,
	selectPrintableLayoutSize,
} from "@/modules/divider/shared/lib";
import type { Divider } from "@/modules/divider/shared/model";
import { absoluteFill } from "@/shared/config";
import { useAppSelector, useBoundingRect } from "@/shared/lib";
import { dividerComponents } from "../../items";

type DividerViewProps = Divider;

export function DividerView(props: DividerViewProps) {
	const layoutSize = useAppSelector(selectPrintableLayoutSize);
	const categoryId = useAppSelector(selectCategoryId);
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
		<Box ref={ref} sx={{ position: "relative", width: "100%" }}>
			{rect && (
				<Box sx={absoluteFill}>
					<Box
						sx={{
							...size,
							transform: `scale(${scale})`,
							transformOrigin: "top left",
						}}
					>
						<Component {...props} />
					</Box>
				</Box>
			)}
		</Box>
	);
}
