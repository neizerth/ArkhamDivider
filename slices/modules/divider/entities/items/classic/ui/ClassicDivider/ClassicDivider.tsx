import { useCallback, useRef, useState } from "react";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import {
	DividerBackground as Background,
	DividerCardsInfo as CardsInfo,
	DividerContainer as Container,
	DividerContent as Content,
	DividerText,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { selectLayout, updateDivider } from "@/modules/divider/shared/lib";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import { usePrintSx, usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
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
	const { story, icon, id } = props;

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
						top={mm(2)}
						right={mm(0.9)}
						fontSize={mm(8)}
						scaleType="circle"
						scaleFactor={{ circled: 0.9 }}
					/>
				)}
				<Menu dividerId={id} sx={menuSx} />
				<Stats divider={props} sx={dividerStatsSx} onClick={toggleCardsInfo} />

				{icon && (
					<Icon
						dividerId={id}
						sx={backgroundIconSx}
						icon={icon}
						fontSize={mm(50)}
						top={mm(41.1)}
						left={mm(44.5)}
					/>
				)}
				{showCardsInfo && (
					<CardsInfo sx={dividerCardsSx} divider={props} zIndex={2} />
				)}
			</Content>
		</Container>
	);
}
