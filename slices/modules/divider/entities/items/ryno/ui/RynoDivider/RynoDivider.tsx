import { rgbTuple2Hex } from "@/modules/core/color/shared/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerColorPicker,
	DividerContent,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import {
	getRynoDividerDefaultHeaderColor,
	getRynoDividerDefaultLeftIcon,
	getRynoDividerDefaultRightIcon,
	getRynoDividerFactionImage,
	showRynoDividerCornerImage,
	showRynoDividerLeftIcon,
} from "../../lib";
import { useRynoDividerImages, useRynoDividerSxOptions } from "../../lib/hooks";
import type { RynoDividerProps } from "../../model";
import { RynoDividerContext } from "../RynoDividerContext";
import { RynoDividerHeader as Header } from "../RynoDividerHeader";
import { RynoDividerXP } from "../RynoDividerXP";
import * as C from "./RynoDivider.components";
import * as S from "./RynoDivider.styles";

export function RynoDivider(props: RynoDividerProps) {
	const { layoutType } = props;
	const sxOptions = useRynoDividerSxOptions();

	const images = useRynoDividerImages(layoutType);
	const getPrintSx = usePrintUnit(sxOptions);
	const bodySx = getPrintSx(S.getBodySx);
	const cornerSx = getPrintSx(S.getCornerSx);
	const leftIconSx = getPrintSx(S.getLeftIconSx);
	const rightIconSx = getPrintSx(S.getRightIconSx);
	const headerColorSx = getPrintSx(S.getHeaderColorSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const factionImageSx = getPrintSx(S.getFactionImageSx);
	const xpSx = getPrintSx(S.getXPSx);

	const getDividerIcon = useDividerIcon({ dividerId: props.id });
	const defaultLeftIcon = getRynoDividerDefaultLeftIcon(props);
	const [leftIcon, selectLeftIcon] = getDividerIcon({
		param: "leftIcon",
		defaultIcon: defaultLeftIcon,
	});

	const defaultRightIcon = getRynoDividerDefaultRightIcon(props);
	const [rightIcon, selectRightIcon] = getDividerIcon({
		param: "rightIcon",
		defaultIcon: defaultRightIcon,
	});

	const [backgroundIcon, selectBackgroundIcon] = getDividerIcon({
		param: "backgroundIcon",
		defaultIcon: props.icon,
	});

	const defaultHeaderRGBColor = getRynoDividerDefaultHeaderColor(props);
	const defaultHeaderColor =
		defaultHeaderRGBColor && rgbTuple2Hex(defaultHeaderRGBColor);

	const showCornerImage = showRynoDividerCornerImage(props);
	const showLeftIcon = showRynoDividerLeftIcon(props);

	return (
		<RynoDividerContext.Provider value={{ divider: props }}>
			<Container>
				<BleedView>
					<Image src={images.body} sx={bodySx} />
					<C.Header src={images.header} />
					{showCornerImage && <Image src={images.corner} sx={cornerSx} />}
				</BleedView>
				<DividerContent>
					{props.layoutType !== "scenario" && !showCornerImage && (
						<Image
							src={getRynoDividerFactionImage(props)}
							sx={factionImageSx}
							onClick={selectLeftIcon}
						/>
					)}
					{showLeftIcon && (
						<Icon
							icon={leftIcon}
							sx={leftIconSx}
							scaleType="circle"
							onClick={selectLeftIcon}
						/>
					)}
					{rightIcon && (
						<Icon icon={rightIcon} sx={rightIconSx} onClick={selectRightIcon} />
					)}
					<Icon
						icon={backgroundIcon}
						sx={backgroundIconSx}
						onClick={selectBackgroundIcon}
					/>

					<RynoDividerXP sx={xpSx} />
					<Header />
					<DividerColorPicker
						dividerId={props.id}
						param="headerColor"
						defaultColor={defaultHeaderColor}
						sx={headerColorSx}
					/>
					<DividerMenu dividerId={props.id} sx={menuSx} />
				</DividerContent>
			</Container>
		</RynoDividerContext.Provider>
	);
}
