import type { SxProps } from "@mui/material";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { percent } from "@/shared/util";
import { simpleStickerIcon } from "../../config";
import type { SimpleStickerProps } from "../../model";

export function SimpleSticker(props: SimpleStickerProps) {
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const size = layout.size.width;

	const getDividerIcon = useDividerIcon({
		dividerId: props.id,
	});

	const [icon, setIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: props.icon,
	});

	const mm = usePrintUnitCallback();

	const fontSize = mm(size * simpleStickerIcon.fontSizeScale);

	const sx = {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		fontSize,
		cursor: "pointer",
		"@media screen": {
			":hover": {
				opacity: percent(70),
			},
		},
	} as SxProps;

	return (
		<Container>
			<BleedView sx={{ backgroundColor: "white" }} />
			<Content
				sx={{
					borderRadius: "50%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<DividerIcon
					dividerId={props.id}
					icon={icon}
					onClick={setIcon}
					sx={sx}
				/>
				<DividerMenu
					dividerId={props.id}
					sx={{
						position: "absolute",
						left: 0,
						top: "50%",
						transform: "translateY(-50%)",
						zoom: 0.4,
						background: "white",
						opacity: 0.3,
						"@media screen": {
							"&:hover": {
								opacity: 1,
							},
						},
					}}
				/>
			</Content>
		</Container>
	);
}
