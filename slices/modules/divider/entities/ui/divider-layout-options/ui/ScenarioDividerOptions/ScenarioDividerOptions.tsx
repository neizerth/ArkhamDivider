import Box, { type BoxProps } from "@mui/material/Box";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import {
	changeStoryCode,
	selectStories,
	selectStoryCode,
} from "@/modules/story/shared/lib";
import { StorySelect } from "@/modules/story/shared/ui/story-select/StorySelect/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import * as C from "./ScenarioDividerOptions.components";

export function ScenarioDividerOptions(props: BoxProps) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const storyCode = useAppSelector(selectStoryCode);
	const stories = useAppSelector(selectStories);

	const onChangeStory = useCallback(
		(code: string | null) => {
			dispatch(changeStoryCode(code));
		},
		[dispatch],
	);

	return (
		<Box {...props}>
			<Row gap={2} flexWrap="wrap" alignItems="center">
				<StorySelect
					fullWidth
					value={storyCode}
					stories={stories}
					onChange={onChangeStory}
					containerSx={{ width: "100%", flex: 1 }}
				/>
				{storyCode && (
					<Row flex={{ xs: 1, sm: 0 }} gap={2}>
						<C.Button
							variant="contained"
							sx={{ width: { xs: "100%", sm: "auto" } }}
						>
							<Row gap={0.5} alignItems="center">
								<Icon icon="check" />
								<span> {t("Generate")}</span>
							</Row>
						</C.Button>
						<C.Button
							variant="contained"
							sx={{ width: { xs: "100%", sm: "auto" } }}
						>
							<Row gap={0.5} alignItems="center">
								<Icon icon="plus" />
								<span> {t("Add")}</span>
							</Row>
						</C.Button>
					</Row>
				)}
			</Row>
		</Box>
	);
}
