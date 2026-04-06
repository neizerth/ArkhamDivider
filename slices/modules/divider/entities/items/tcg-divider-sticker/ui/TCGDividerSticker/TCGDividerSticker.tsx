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
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic/params";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { absoluteFill } from "@/shared/config";
import {
	getDefaultTCGDividerStickerIcon as getDefaultIcon,
	getDefaultTCGDividerSideIcon as getDefaultSideIcon,
} from "../../lib";
import type { TCGDividerStickerProps } from "../../model";
import * as S from "./TCGDividerSticker.styles";

export function TCGDividerSticker(props: TCGDividerStickerProps) {
	const defaultIcon = getDefaultIcon(props);

	const xpCost = getDividerXPCost(props);
	const withXP = Boolean(xpCost);

	const isPlayer = props.type === "player";

	const getPrintSx = usePrintUnit();
	const getLocaleSx = useLocaleSx();
	const iconSx = getPrintSx(S.getIconSx);
	const contentSx = getPrintSx(S.getContentSx);
	const titleSx = getLocaleSx(S.getTitleSx, { withXP });
	const clearSx = getPrintSx(S.getClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const xpCostSx = getPrintSx(S.getXPCostSx);
	const sideIconSx = getPrintSx(S.getSideIconSx, { withXP });
	const menuSx = getPrintSx(S.getMenuSx, { isPlayer, withXP });

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
				<Icon
					dividerId={props.id}
					icon={icon}
					onClick={setIcon}
					sx={iconSx}
					visible
				/>

				{sideIcon && (
					<Icon
						dividerId={props.id}
						icon={sideIcon}
						onClick={setSideIcon}
						sx={sideIconSx}
						visible
					/>
				)}

				{xpCost && <Box sx={xpCostSx}>{xpCost.name}</Box>}
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
