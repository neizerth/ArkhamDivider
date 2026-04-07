import { Box } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { selectLayout, useDividerText } from "@/modules/divider/entities/lib";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
	DividerText,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { selectPlayerParams } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import {
	copyToClipboard,
	useAppSelector,
	usePreventDefault,
} from "@/shared/lib";
import { invocation2018Manifest } from "../../config";
import { invocation2018DividerTextColor } from "../../config/common";
import {
	getInvocation2018Background,
	getInvocation2018DefaultIcon,
	getInvocation2018LayoutObjects,
} from "../../lib";
import { Invocation2018DividerXP as XP } from "../Invocation2018DividerXP";
import * as S from "./Invocation2018Divider.styles";

export function Invocation2018Divider(props: DividerWithRelations) {
	const { id, icon } = props;
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const playerParams = useAppSelector(selectPlayerParams);

	const O = getInvocation2018LayoutObjects(layout);

	const faction = "faction" in props ? props.faction : void null;

	const xpCost = getDividerXPCost(props);

	const sxOptions = {
		orientation: layout.orientation,
		color: layout.color,
		layout: layout.id,
		objects: O,
		faction,
	};

	const getLocaleSx = useLocaleSx(sxOptions);
	const titleSx = getLocaleSx(S.getTextSx);

	const getPrintSx = usePrintUnit(sxOptions);

	const iconSx = getPrintSx(S.getIconSx);
	const strokeSx = getPrintSx(S.getStrokeSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const xpSx = getPrintSx(S.getXPSx);
	const numericXPSx = getPrintSx(S.getNumericXPSx);
	const iconTriggerSx = getPrintSx(S.getIconTriggerSx);
	const iconBackgroundSx = getPrintSx(S.getIconBackgroundSx);

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

	const getDividerIcon = useDividerIcon({
		dividerId: id,
		icon,
	});

	const defaultSmallIcon = getInvocation2018DefaultIcon(props);

	const [smallIcon, selectSmallIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: defaultSmallIcon,
	});

	const copy = usePreventDefault(copyToClipboard);

	const background = getInvocation2018Background({
		divider: props,
		layout,
	});

	const showSmallIcon = Boolean(defaultSmallIcon);

	const iconBackgroundSrc = "/images/divider/background/invocation/icon-bg.png";

	return (
		<Container>
			<Background src={background} alt={layout.name} />
			<Content
				sx={{
					color: invocation2018DividerTextColor,
				}}
			>
				<DividerText
					dividerId={id}
					sx={titleSx}
					value={title}
					defaultValue={translatedTitle}
					fitTextOptions={{
						minFontSize: 8,
						onFontSizeChange,
					}}
					onValueChange={onTitleChange}
					onBlur={onTitleBlur}
					strokeSx={strokeSx}
					clearProps={{ sx: titleClearSx }}
					outlineSx={outlineSx}
				/>

				{smallIcon && showSmallIcon && (
					<Icon
						dividerId={id}
						icon={smallIcon}
						sx={iconSx}
						{...O.icon.params}
						onClick={selectSmallIcon}
						onContextMenu={copy(smallIcon)}
						manifest={invocation2018Manifest}
					/>
				)}
				{showSmallIcon ? (
					<Box component="img" src={iconBackgroundSrc} sx={iconBackgroundSx} />
				) : (
					<Box sx={iconTriggerSx} onClick={selectSmallIcon} />
				)}
				<Menu dividerId={id} sx={menuSx} />
				{xpCost && (
					<>
						<XP sx={xpSx} xpCost={xpCost} />
						{playerParams?.numericXP && (
							<DividerText
								dividerId={id}
								sx={numericXPSx}
								value={xpCost.name}
								outlineSx={outlineSx}
								readonly
							/>
						)}
					</>
				)}
			</Content>
		</Container>
	);
}
