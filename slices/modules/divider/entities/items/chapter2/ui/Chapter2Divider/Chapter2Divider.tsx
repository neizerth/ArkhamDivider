import { Box } from "@mui/material";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBackground as Background,
	DividerColorPicker as ColorPicker,
	DividerContainer as Container,
	DividerContent as Content,
	DividerCreaseLine as CreaseLine,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import {
	getChapter2DividerDefaultColor,
	getChapter2DividerDefaultIcon,
} from "../../lib";
import type { Chapter2DividerProps } from "../../model/chapter2";
import * as S from "./Chapter2Divider.styles";

const background = "/images/divider/background/chapter2/background.avif";

export function Chapter2Divider(props: Chapter2DividerProps) {
	const defaultIcon = getChapter2DividerDefaultIcon(props);
	const layout = useAppSelector(selectLayout) as DividerLayout;

	const getPrintSx = usePrintUnit();
	const iconSx = getPrintSx(S.getIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const overlaySx = getPrintSx(S.getOverlaySx);
	const colorPickerSx = getPrintSx(S.getColorPickerSx);
	const menuSx = getPrintSx(S.getMenuSx);

	const getDividerIcon = useDividerIcon({
		dividerId: props.id,
	});

	const [icon, selectIcon] = getDividerIcon({
		param: "icon",
		defaultIcon,
	});

	const [backgroundIcon, selectBackgroundIcon] = getDividerIcon({
		param: "backgroundIcon",
		defaultIcon,
	});

	const defaultColor = getChapter2DividerDefaultColor(props);

	const color = props.params?.color ?? defaultColor;

	return (
		<Container>
			<Background src={background} />

			<Box sx={overlaySx} bgcolor={color} />
			<Content zIndex={3}>
				<DividerIcon
					dividerId={props.id}
					icon={icon}
					onClick={selectIcon}
					sx={iconSx}
					scaleType="circle"
				/>
				<DividerIcon
					dividerId={props.id}
					icon={backgroundIcon}
					onClick={selectBackgroundIcon}
					sx={backgroundSx}
				/>
				<ColorPicker
					dividerId={props.id}
					param="color"
					defaultColor={defaultColor}
					sx={colorPickerSx}
				/>
				<CreaseLine offset={layout.creasingTop} />
				<Menu dividerId={props.id} sx={menuSx} />
			</Content>
		</Container>
	);
}
