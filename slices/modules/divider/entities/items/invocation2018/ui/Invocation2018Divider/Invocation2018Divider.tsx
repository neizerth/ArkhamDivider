import { Box } from "@mui/material";
import { useCallback, useRef } from "react";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
	DividerText,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { isDefaultDividerIcon } from "@/modules/divider/features/lib";
import { useDividerIcon } from "@/modules/divider/features/lib/hooks/useDividerIcon";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import {
	selectPlayerParams,
	updateDivider,
} from "@/modules/divider/shared/lib";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import { usePrintUnit, usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import {
	copyToClipboard,
	useAppDispatch,
	useAppSelector,
	usePreventDefault,
} from "@/shared/lib";
import { invocation2018DividerTextColor } from "../../config/common";
import { getInvocation2018LayoutObjects } from "../../lib";
import { getInvocation2018Background } from "../../lib/getInvocation2018Background";
import { Invocation2018DividerXP as XP } from "../Invocation2018DividerXP";
import * as S from "./Invocation2018Divider.styles";

export function Invocation2018Divider(props: DividerWithRelations) {
	const { story, id, icon } = props;

	const dispatch = useAppDispatch();
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const playerParams = useAppSelector(selectPlayerParams);
	const { translateStory } = useStoryTranslation(story);
	const mm = usePrintUnitCallback();
	const customTitle = useRef(props.customTitle);

	const O = getInvocation2018LayoutObjects(layout);

	const faction = "faction" in props ? props.faction : void null;

	const sxOptions = {
		color: layout.color,
		objects: O,
		faction,
	};

	const getLocaleSx = useLocaleSx(sxOptions);
	const titleSx = getLocaleSx(S.getTextSx);

	const getPrintSx = usePrintUnit(sxOptions);

	const iconSx = getPrintSx(S.getIconSx);
	const _dividerStatsSx = getPrintSx(S.getDividerStatsSx);
	const strokeSx = getPrintSx(S.getStrokeSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const xpSx = getPrintSx(S.getXPSx);
	const numericXPSx = getPrintSx(S.getNumericXPSx);
	const iconTriggerSx = getPrintSx(S.getIconTriggerSx);
	const iconBackgroundSx = getPrintSx(S.getIconBackgroundSx);

	const translatedTitle = translateStory(props?.title);
	const title = customTitle.current ?? translatedTitle;

	const onFontSizeChange = useCallback(
		(fontSizeScale: number) => {
			dispatch(updateDivider({ id, changes: { fontSizeScale } }));
		},
		[id, dispatch],
	);

	const setCustomTitle = useCallback((value: string) => {
		customTitle.current = value;
	}, []);

	const onTitleBlur = useCallback(() => {
		dispatch(
			updateDivider({ id, changes: { customTitle: customTitle.current } }),
		);
	}, [id, dispatch]);

	const getDividerIcon = useDividerIcon({
		dividerId: id,
		icon,
	});

	const [smallIcon, selectSmallIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: null,
	});

	const iconObject = O.icon;

	const copy = usePreventDefault(copyToClipboard);

	const background = getInvocation2018Background({
		divider: props,
		layout,
	});

	const showSmallIcon = !isDefaultDividerIcon({
		divider: props,
		param: "icon",
	});

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
					onValueChange={setCustomTitle}
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
						top={mm(iconObject.top)}
						right={mm(iconObject.right)}
						fontSize={mm(iconObject.fontSize)}
						{...O.icon.params}
						onClick={selectSmallIcon}
						onContextMenu={copy(smallIcon)}
					/>
				)}
				{showSmallIcon ? (
					<Box component="img" src={iconBackgroundSrc} sx={iconBackgroundSx} />
				) : (
					<Box sx={iconTriggerSx} onClick={selectSmallIcon} />
				)}
				<Menu dividerId={id} sx={menuSx} />
				{props.type === "player" && props.xpCost && (
					<>
						<XP sx={xpSx} xpCost={props.xpCost} />
						{playerParams?.numericXP && (
							<DividerText
								dividerId={id}
								sx={numericXPSx}
								value={props.xpCost?.name}
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
