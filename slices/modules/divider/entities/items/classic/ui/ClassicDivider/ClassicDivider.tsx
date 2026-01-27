import Box from "@mui/material/Box";
import { useCallback, useState } from "react";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { IconCorrection as Icon } from "@/modules/core/icon/entities/ui";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
	DividerCardsInfo,
	DividerText,
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
import { ClassicDividerStats } from "../ClassicDividerStats/ClassicDividerStats";
import {
	getBackgroundIconSx,
	getDividerCardsSx,
	getDividerStatsSx,
	getIconSx,
	getStrokeSx,
	getTextSx,
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

	const toggleCardsInfo = useCallback(() => {
		setShowCardsInfo(!showCardsInfo);
	}, [showCardsInfo]);

	const titleSx = useLocaleSx(getTextSx);
	const iconSx = usePrintSx(getIconSx);
	const backgroundIconSx = usePrintSx(getBackgroundIconSx);
	const dividerStatsSx = usePrintSx(getDividerStatsSx);
	const strokeSx = usePrintSx(getStrokeSx);
	const dividerCardsSx = usePrintSx(getDividerCardsSx);

	const translatedTitle = translateStory(props?.title);

	const { background } = layout.params as ClassicLayoutParams;

	return (
		<Container>
			<Background src={background} alt={layout.name} />
			<Content sx={{ color: classicDividerTextColor }}>
				<DividerText
					sx={titleSx}
					value={translatedTitle}
					fitTextOptions={{
						minFontSize: 8,
					}}
					strokeSx={strokeSx}
					stroke
					fit
				/>
				<Box sx={iconSx}>
					{icon && (
						<Icon
							icon={icon}
							fontSize={mm(8)}
							scaleType="circle"
							scaleFactor={{ circled: 0.9 }}
						/>
					)}
				</Box>
				<Box sx={backgroundIconSx}>
					{icon && <Icon icon={icon} fontSize={mm(50)} />}
				</Box>
				<ClassicDividerStats
					divider={props}
					sx={dividerStatsSx}
					onClick={toggleCardsInfo}
				/>
				{showCardsInfo && (
					<DividerCardsInfo sx={dividerCardsSx} divider={props} />
				)}
			</Content>
		</Container>
	);
}
