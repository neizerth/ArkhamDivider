import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { selectLayout } from "@/modules/divider/entities/lib";
import { generateScenarioDividers } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers";
import {
	deleteAllDividers,
	selectScenarioParams,
	setScenarioParams,
} from "@/modules/divider/shared/lib";
import type {
	GenerateDividersMode,
	ScenarioDividerParams,
} from "@/modules/divider/shared/model";
import { selectStoryWithRelations } from "@/modules/story/entities/lib";
import {
	changeStoryCode,
	selectScenarioStories,
} from "@/modules/story/shared/lib";
import { CustomStoryContentInfo } from "@/modules/story/shared/ui";
import { StorySelect } from "@/modules/story/shared/ui/story-select/StorySelect/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import { preventDefault } from "@/shared/util";
import { ScenarioDividerOptionsForm } from "../ScenarioDividerOptionsForm";

const formButtonSx: SxProps = {
	flexGrow: { xs: 1, sm: 0 },
	whiteSpace: "nowrap",
};

export function ScenarioDividerOptions(props: BoxProps) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const story = useAppSelector(selectStoryWithRelations);
	const stories = useAppSelector(selectScenarioStories);
	const layout = useAppSelector(selectLayout);
	const defaultValues = useAppSelector(selectScenarioParams);

	const { control, handleSubmit, getValues } = useForm<ScenarioDividerParams>({
		defaultValues,
	});

	const onParamsChange = useCallback(() => {
		const params = getValues();
		dispatch(setScenarioParams(params));
	}, [getValues, dispatch]);

	const onChangeStory = useCallback(
		(code: string | null) => {
			dispatch(changeStoryCode(code));
		},
		[dispatch],
	);

	const generate = (mode: GenerateDividersMode) =>
		handleSubmit((data) => {
			dispatch(generateScenarioDividers({ ...data, mode }));
		});

	const clear = useCallback(() => {
		dispatch(deleteAllDividers());
	}, [dispatch]);

	return (
		<Box {...props}>
			<form onSubmit={preventDefault}>
				<Stack gap={2}>
					<Row gap={2} flexWrap="wrap" alignItems="center">
						<Box sx={{ flex: 1 }}>
							<StorySelect
								fullWidth
								value={story?.code}
								stories={stories}
								onChange={onChangeStory}
								containerSx={{
									width: "100%",
									minWidth: {
										xs: "auto",
										sm: 320,
									},
								}}
							/>
						</Box>
						{story && (
							<Row
								sx={{
									flex: { xs: 1, sm: 0 },
									gap: 2,
									justifyContent: "center",
									flexWrap: {
										xs: "wrap",
										sm: "nowrap",
									},
								}}
							>
								<Button
									variant="contained"
									sx={formButtonSx}
									onClick={clear}
									color="error"
								>
									<Row gap={0.5} alignItems="center">
										<Icon icon="trash" />
										<span>{t("Clear")}</span>
									</Row>
								</Button>
								<Button
									variant="contained"
									sx={formButtonSx}
									name="mode"
									type="submit"
									value="create"
									onClick={generate("create")}
								>
									<Row gap={0.5} alignItems="center">
										<Icon icon="check" />
										<span> {t("Generate")}</span>
									</Row>
								</Button>
								<Button
									variant="contained"
									sx={formButtonSx}
									name="mode"
									onClick={generate("add")}
								>
									<Row gap={0.5} alignItems="center">
										<Icon icon="plus" />
										<span> {t("Add")}</span>
									</Row>
								</Button>
							</Row>
						)}
					</Row>
					{story?.custom_content && (
						<CustomStoryContentInfo content={story.custom_content} />
					)}
					{story && layout && (
						<ScenarioDividerOptionsForm
							layout={layout}
							story={story}
							control={control}
							defaultValues={defaultValues}
							onChange={onParamsChange}
						/>
					)}
				</Stack>
			</form>
		</Box>
	);
}
