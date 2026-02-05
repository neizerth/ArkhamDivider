import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { generateInvestigatorDividers } from "@/modules/divider/entities/lib/store/features/generateInvestigatorDividers";
import {
	selectInvestigatorParams,
	setInvestigatorParams,
} from "@/modules/divider/shared/lib";
import type {
	GenerateDividersMode,
	InvestigatorDividerParams,
} from "@/modules/divider/shared/model";
import { selectStoriesWithInvestigators } from "@/modules/story/shared/lib";
import { StorySelect } from "@/modules/story/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import * as C from "./InvestigatorDividerOptions.components";

type InvestigatorDividerOptionsProps = BoxProps;

const _storyCategories = ["all", "translated", "official"] as const;

export function InvestigatorDividerOptions(
	props: InvestigatorDividerOptionsProps,
) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const defaultValues = useAppSelector(selectInvestigatorParams);
	const stories = useAppSelector(selectStoriesWithInvestigators);

	const { getValues, setValue, watch } = useForm<InvestigatorDividerParams>({
		defaultValues,
	});

	useEffect(() => {
		dispatch(setInvestigatorParams(getValues()));
		const subscription = watch((data) =>
			dispatch(setInvestigatorParams(data as InvestigatorDividerParams)),
		);
		return () => subscription.unsubscribe();
	}, [watch, getValues, dispatch]);

	const selectedStoryCodes = getValues("storyCodes") ?? [];

	const onChangeStories = useCallback(
		(storyCodes: string[]) => {
			setValue("storyCodes", storyCodes);
		},
		[setValue],
	);

	const generate = useCallback(
		(mode: GenerateDividersMode) => () => {
			const params = getValues();
			dispatch(
				generateInvestigatorDividers({
					...params,
					mode,
				}),
			);
		},
		[dispatch, getValues],
	);

	const showGenerateButtons = selectedStoryCodes.length > 0;

	return (
		<Box {...props}>
			<form>
				<Stack gap={2}>
					<C.Row>
						<StorySelect
							fullWidth
							multiple
							stories={stories}
							value={selectedStoryCodes}
							onChange={onChangeStories}
							containerSx={{ width: "100%", flex: 1 }}
						/>
					</C.Row>
					{showGenerateButtons && (
						<C.Row
							sx={{
								justifyContent: {
									xs: "flex-start",
									sm: "center",
								},
							}}
						>
							<Row gap={2} alignItems="center">
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
						</C.Row>
					)}
				</Stack>
			</form>
		</Box>
	);
}
