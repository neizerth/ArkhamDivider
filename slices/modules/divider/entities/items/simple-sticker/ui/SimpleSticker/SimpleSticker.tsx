import type { SxProps } from "@mui/material";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerContainer,
	DividerContent,
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
		<DividerContainer>
			<DividerContent
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
			</DividerContent>
		</DividerContainer>
	);
}
