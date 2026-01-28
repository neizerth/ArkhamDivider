import Box from "@mui/material/Box";
import { useCallback, useState } from "react";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { IconCorrection as Icon } from "@/modules/core/icon/entities/ui";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
	DividerText,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { selectLayout } from "@/modules/divider/shared/lib";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import { usePrintSx, usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { classicDividerTextColor } from "../../config/common";
import {
	getBackgroundIconSx,
	getDividerCardsSx,
	getDividerStatsSx,
	getIconSx,
	getMenuSx,
	getStrokeSx,
	getTextSx,
	getTitleClearSx,
} from "./ClassicDivider.styles";

type ClassicLayoutParams = {
	background: string;
};

export function ClassicDivider(props: DividerWithRelations) {
	const { story, icon } = props;
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const { translateStory } = useStoryTranslation(story);
	const mm = usePrintUnitCallback();
	const [showCardsInfo, setShowCardsInfo] = useState(false);

	const _toggleCardsInfo = useCallback(() => {
		setShowCardsInfo(!showCardsInfo);
	}, [showCardsInfo]);

	const getLocaleSx = useLocaleSx();
	const titleSx = getLocaleSx(getTextSx);

	const getPrintSx = usePrintSx();
	const iconSx = getPrintSx(getIconSx);
	const _backgroundIconSx = getPrintSx(getBackgroundIconSx);
	const _dividerStatsSx = getPrintSx(getDividerStatsSx);
	const strokeSx = getPrintSx(getStrokeSx);
	const _dividerCardsSx = getPrintSx(getDividerCardsSx);
	const titleClearSx = getPrintSx(getTitleClearSx);
	const menuSx = getPrintSx(getMenuSx);

	const translatedTitle = translateStory(props?.title);

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
					sx={titleSx}
					value={translatedTitle}
					defaultValue={translatedTitle}
					fitTextOptions={{
						minFontSize: 8,
					}}
					strokeSx={strokeSx}
					clearProps={{ sx: titleClearSx }}
					stroke
					fit
				/>
				<Box sx={iconSx} component="span">
					{icon && (
						<Icon
							icon={icon}
							fontSize={mm(8)}
							scaleType="circle"
							scaleFactor={{ circled: 0.9 }}
						/>
					)}
				</Box>
				<Menu dividerId={props.id} sx={menuSx} />
				{/* <Stats divider={props} sx={dividerStatsSx} onClick={toggleCardsInfo} /> */}

				{/* <Box sx={backgroundIconSx}>
					{icon && <Icon icon={icon} fontSize={mm(50)} />}
				</Box>
				{showCardsInfo && (
					<CardsInfo sx={dividerCardsSx} divider={props} zIndex={2} />
				)}*/}
			</Content>
		</Container>
	);
}
