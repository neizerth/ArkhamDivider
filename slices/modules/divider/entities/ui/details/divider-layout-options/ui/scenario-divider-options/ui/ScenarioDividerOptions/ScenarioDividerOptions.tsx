import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { selectLayout } from "@/modules/divider/entities/lib";
import { generateScenarioDividers } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers";
import {
	selectScenarioParams,
	setScenarioParams,
} from "@/modules/divider/shared/lib";
import type {
	GenerateDividersMode,
	ScenarioDividerParams,
} from "@/modules/divider/shared/model";
import { selectStoryWithRelations } from "@/modules/story/entities/lib";
import { changeStoryCode, selectStories } from "@/modules/story/shared/lib";
import { StorySelect } from "@/modules/story/shared/ui/story-select/StorySelect/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import { ScenarioDividerOptionsForm } from "../ScenarioDividerOptionsForm";

export function ScenarioDividerOptions(props: BoxProps) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const story = useAppSelector(selectStoryWithRelations);
	const stories = useAppSelector(selectStories);
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

	return (
		<Box {...props}>
			<form>
				<Stack gap={2}>
					<Row gap={2} flexWrap="wrap" alignItems="center">
						<StorySelect
							fullWidth
							value={story?.code}
							stories={stories}
							onChange={onChangeStory}
							containerSx={{ width: "100%", flex: 1 }}
						/>
						{story && (
							<Row flex={{ xs: 1, sm: 0 }} gap={2}>
								<Button
									variant="contained"
									sx={{ width: { xs: "100%", sm: "auto" } }}
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
									sx={{ width: { xs: "100%", sm: "auto" } }}
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
