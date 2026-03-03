import Box from "@mui/material/Box";
import { useCallback, useRef, useState } from "react";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBackground as Background,
	DividerCardsInfo as CardsInfo,
	DividerContainer as Container,
	DividerContent as Content,
	DividerText,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
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
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { classicDividerObjects as O } from "../../config";
import { classicDividerTextColor } from "../../config/common";
import { getIconObject } from "../../lib";
import { ClassicDividerStats as Stats } from "../ClassicDividerStats/ClassicDividerStats";
import { ClassicDividerXP as XP } from "../ClassicDividerXP";
import * as S from "./ClassicDivider.styles";

type ClassicLayoutParams = {
	background: string;
};

export function ClassicDivider(props: DividerWithRelations) {
	const { story, id, icon } = props;

	const dispatch = useAppDispatch();
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const playerParams = useAppSelector(selectPlayerParams);
	const { translateStory } = useStoryTranslation(story);
	const mm = usePrintUnitCallback();
	const [showCardsInfo, setShowCardsInfo] = useState(false);
	const customTitle = useRef(props.customTitle);

	const toggleCardsInfo = useCallback(() => {
		setShowCardsInfo(!showCardsInfo);
	}, [showCardsInfo]);

	const getLocaleSx = useLocaleSx();
	const titleSx = getLocaleSx(S.getTextSx);

	const getPrintSx = usePrintUnit({
		color: layout.color,
	});

	const iconSx = getPrintSx(S.getIconSx);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const dividerStatsSx = getPrintSx(S.getDividerStatsSx);
	const strokeSx = getPrintSx(S.getStrokeSx);
	const dividerCardsSx = getPrintSx(S.getDividerCardsSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const outlineSx = getLocaleSx(S.getOutlineSx);
	const xpSx = getPrintSx(S.getXPSx);
	const numericXPSx = getPrintSx(S.getNumericXPSx);

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

	const [backgroundIcon, selectBackgroundIcon] = getDividerIcon({
		param: "background",
	});

	const [smallIcon, selectSmallIcon] = getDividerIcon({
		param: "icon",
	});

	const [_largeIcon, _selectLargeIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: icon,
	});

	const { background } = layout.params as ClassicLayoutParams;

	const iconObject = getIconObject(props);

	return (
		<Container>
			<Background src={background} alt={layout.name} />
			<Content
				sx={{
					color: classicDividerTextColor,
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

				{smallIcon && (
					<Icon
						dividerId={id}
						icon={smallIcon}
						sx={iconSx}
						top={mm(iconObject.top)}
						right={mm(iconObject.right)}
						fontSize={mm(iconObject.fontSize)}
						{...O.icon.params}
						onClick={selectSmallIcon}
					/>
				)}
				<Menu dividerId={id} sx={menuSx} />
				<Stats divider={props} sx={dividerStatsSx} onClick={toggleCardsInfo} />
				{props.type === "player" && (
					<>
						<Box fontSize={mm(7)}>
							{props.subtype && (
								<XP
									source="subtype"
									subtype={props.subtype}
									sx={xpSx}
									dividerId={id}
								/>
							)}
							{props.cardType && (
								<XP
									source="cardType"
									cardType={props.cardType}
									sx={xpSx}
									dividerId={id}
									xpCost={props.xpCost}
								/>
							)}
						</Box>
						{playerParams?.numericXP && props.xpCost && (
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

				{backgroundIcon && (
					<Icon
						dividerId={id}
						sx={backgroundIconSx}
						icon={backgroundIcon}
						fontSize={mm(O.backgroundIcon.fontSize)}
						top={mm(O.backgroundIcon.top)}
						left={mm(O.backgroundIcon.left)}
						onClick={selectBackgroundIcon}
						disableCorrection
					/>
				)}
				{showCardsInfo && (
					<CardsInfo sx={dividerCardsSx} divider={props} zIndex={2} />
				)}
			</Content>
		</Container>
	);
}
