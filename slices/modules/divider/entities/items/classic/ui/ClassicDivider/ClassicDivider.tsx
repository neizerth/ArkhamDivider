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
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { updateDivider } from "@/modules/divider/shared/lib";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import { usePrintSx, usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { classicDividerObjects as O } from "../../config";
import { classicDividerTextColor } from "../../config/common";
import { ClassicDividerStats as Stats } from "../ClassicDividerStats/ClassicDividerStats";
import {
	getBackgroundIconSx,
	getDividerCardsSx,
	getDividerStatsSx,
	getIconSx,
	getMenuSx,
	getOutlineSx,
	getStrokeSx,
	getTextSx,
	getTitleClearSx,
} from "./ClassicDivider.styles";

type ClassicLayoutParams = {
	background: string;
};

export function ClassicDivider(props: DividerWithRelations) {
	const { story, id } = props;
	const icon = props.customIcon ?? props.icon;

	const dispatch = useAppDispatch();
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const { translateStory } = useStoryTranslation(story);
	const mm = usePrintUnitCallback();
	const [showCardsInfo, setShowCardsInfo] = useState(false);
	const customTitle = useRef(props.customTitle);

	const toggleCardsInfo = useCallback(() => {
		setShowCardsInfo(!showCardsInfo);
	}, [showCardsInfo]);

	const getLocaleSx = useLocaleSx();
	const titleSx = getLocaleSx(getTextSx);

	const getPrintSx = usePrintSx();
	const iconSx = getPrintSx(getIconSx);
	const backgroundIconSx = getPrintSx(getBackgroundIconSx);
	const dividerStatsSx = getPrintSx(getDividerStatsSx);
	const strokeSx = getPrintSx(getStrokeSx);
	const dividerCardsSx = getPrintSx(getDividerCardsSx);
	const titleClearSx = getPrintSx(getTitleClearSx);
	const menuSx = getPrintSx(getMenuSx);
	const outlineSx = getLocaleSx(getOutlineSx);

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

	const { background } = layout.params as ClassicLayoutParams;

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
				{icon && (
					<Icon
						dividerId={id}
						icon={icon}
						sx={iconSx}
						top={mm(O.icon.top)}
						right={mm(O.icon.right)}
						fontSize={mm(O.icon.fontSize)}
						{...O.icon.params}
					/>
				)}
				<Menu dividerId={id} sx={menuSx} />
				<Stats divider={props} sx={dividerStatsSx} onClick={toggleCardsInfo} />

				{icon && (
					<Icon
						dividerId={id}
						sx={backgroundIconSx}
						icon={icon}
						fontSize={mm(O.backgroundIcon.fontSize)}
						top={mm(O.backgroundIcon.top)}
						left={mm(O.backgroundIcon.left)}
					/>
				)}
				{showCardsInfo && (
					<CardsInfo sx={dividerCardsSx} divider={props} zIndex={2} />
				)}
			</Content>
		</Container>
	);
}
