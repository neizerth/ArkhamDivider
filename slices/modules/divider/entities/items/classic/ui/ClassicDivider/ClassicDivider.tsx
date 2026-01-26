import Box from "@mui/material/Box";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { IconCorrection } from "@/modules/core/icon/entities/ui";
import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
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
import { getIconSx, getTextSx } from "./ClassicDivider.styles";

type ClassicLayoutParams = {
	background: string;
};

export function ClassicDivider(props: DividerWithRelations) {
	const { story, icon } = props;
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const { translateStory } = useStoryTranslation(story);
	const { background } = layout.params as ClassicLayoutParams;
	const mm = usePrintUnitCallback();
	const titleSx = useLocaleSx(getTextSx);
	const iconSx = usePrintSx(getIconSx);

	const title = translateStory(props?.title);

	return (
		<Container>
			<Background src={background} alt={layout.name} />
			<Content>
				<DividerText sx={titleSx} value={title} fit />
				<Box sx={iconSx}>
					{icon && (
						<IconCorrection
							icon={icon}
							fontSize={mm(8)}
							scaleType="circle"
							scaleFactor={{ circled: 0.9 }}
						/>
					)}
				</Box>
			</Content>
		</Container>
	);
}
