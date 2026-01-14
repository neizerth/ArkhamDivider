import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { DividerLayoutInfo } from "@/modules/divider/entities/ui";
import type { DividerLayout } from "@/modules/divider/shared/model";
import {
	changeStoryCode,
	selectStories,
	selectStoryCode,
} from "@/modules/story/shared/lib";
import { StorySelect } from "@/modules/story/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Row, SectionTitle } from "@/shared/ui";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

type LayoutPageContentProps = {
	layout: DividerLayout;
};
export function LayoutPageContent({ layout }: LayoutPageContentProps) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const stories = useAppSelector(selectStories);
	const storyCode = useAppSelector(selectStoryCode);

	const onChangeStory = useCallback(
		(code: string | null) => {
			dispatch(changeStoryCode(code));
		},
		[dispatch],
	);

	return (
		<SingleColumnLayout>
			<Stack gap={8} paddingBlock={8}>
				<Container sx={{ paddingInline: { xs: 1, sm: 2 } }}>
					<SectionTitle>{layout.name}</SectionTitle>
					<Stack gap={4}>
						<DividerLayoutInfo layout={layout} />
						<Row gap={2} flexWrap="wrap">
							<StorySelect
								fullWidth
								value={storyCode}
								stories={stories}
								onChange={onChangeStory}
								containerSx={{ width: "100%", flex: 1 }}
							/>
							{storyCode && (
								<Row flex={0} gap={2}>
									<Button variant="contained">
										<Row gap={0.5} alignItems="center">
											<Icon icon="check" />
											<span> {t("Generate")}</span>
										</Row>
									</Button>
									<Button variant="contained">
										<Row gap={0.5} alignItems="center">
											<Icon icon="plus" />
											<span> {t("Add")}</span>
										</Row>
									</Button>
								</Row>
							)}
						</Row>
					</Stack>
				</Container>
			</Stack>
		</SingleColumnLayout>
	);
}
