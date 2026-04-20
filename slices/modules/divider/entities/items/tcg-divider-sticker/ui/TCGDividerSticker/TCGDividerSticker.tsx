import { Box } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import {
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu,
	DividerText as Text,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { absoluteFill } from "@/shared/config";
import {
	getDefaultTCGDividerStickerIcon as getDefaultIcon,
	getDefaultTCGDividerSideIcon as getDefaultSideIcon,
	useTCGDividerStickerSxOptions,
} from "../../lib";
import type { TCGDividerStickerProps } from "../../model";
import * as S from "./TCGDividerSticker.styles";

export function TCGDividerSticker(props: TCGDividerStickerProps) {
	const sxOptions = useTCGDividerStickerSxOptions(props);

	const defaultIcon = getDefaultIcon(props);

	const xpCost = getDividerXPCost(props);
	const getPrintSx = usePrintUnit(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);

	const iconSx = getPrintSx(S.getIconSx);
	const contentSx = getPrintSx(S.getContentSx);
	const titleSx = getLocaleSx(S.getTitleSx);
	const clearSx = getPrintSx(S.getClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const xpCostSx = getPrintSx(S.getXPCostSx);
	const sideIconSx = getPrintSx(S.getSideIconSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const scenarioSx = getPrintSx(S.getScenarioSx);

	const getDividerIcon = useDividerIcon({
		dividerId: props.id,
	});

	const [icon, setIcon] = getDividerIcon({
		param: "icon",
		defaultIcon,
	});

	const [sideIcon, setSideIcon] = getDividerIcon({
		param: "sideIcon",
		defaultIcon: getDefaultSideIcon(props),
	});

	const {
		value: title,
		translatedValue: translatedTitle,
		onChange: onTitleChange,
		onBlur: onTitleBlur,
		onFontSizeChange,
	} = useDividerText({
		divider: props,
		param: "customTitle",
	});

	return (
		<Container>
			<Box sx={{ backgroundColor: "white", ...absoluteFill }} />
			<Content sx={contentSx}>
				<Icon dividerId={props.id} icon={icon} onClick={setIcon} sx={iconSx} />
				<Text
					sx={titleSx}
					dividerId={props.id}
					value={title}
					defaultValue={translatedTitle}
					fitTextOptions={{
						minFontSize: 8,
						onFontSizeChange,
					}}
					onValueChange={onTitleChange}
					onBlur={onTitleBlur}
					clearProps={{ sx: clearSx }}
					outlineSx={outlineSx}
				/>
				<Icon dividerId={props.id} icon={icon} onClick={setIcon} sx={iconSx} />

				{sideIcon && (
					<Icon
						dividerId={props.id}
						icon={sideIcon}
						onClick={setSideIcon}
						sx={sideIconSx}
					/>
				)}

				{xpCost && <Box sx={xpCostSx}>{xpCost.name}</Box>}
				{props.type === "scenario" && (
					<Box sx={scenarioSx}>{props.scenario.number_text}</Box>
				)}
				<DividerMenu
					dividerId={props.id}
					sx={menuSx}
					actionsSx={{ backgroundColor: "white" }}
					inline
				/>
			</Content>
		</Container>
	);
}

export default TCGDividerSticker;
