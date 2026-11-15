import type { SxProps } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid, { type GridProps } from "@mui/material/Grid";
import type { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { isUndefined } from "ramda-adjunct";
import { useCallback } from "react";
import { type Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { OfficialIcon } from "@/modules/core/icon/entities/ui";
import {
	selectCampaignDividersCount,
	selectEncounterSetDividersCount,
	selectScenarioDividersCount,
} from "@/modules/divider/entities/lib";
import { sortScenarioDividers } from "@/modules/divider/entities/lib/store/features/sortScenarioDividers";
import type {
	DividerLayout,
	ScenarioDividerParams,
	ScenarioDividerSortBy,
} from "@/modules/divider/shared/model";
import { selectDoubleSidePrintEnabled } from "@/modules/print/shared/lib";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Select } from "@/shared/ui";
import * as C from "./ScenarioDividerOptionsForm.components";

const SORT_BY_OPTIONS: {
	id: ScenarioDividerSortBy;
	value: ScenarioDividerSortBy;
	labelKey: string;
}[] = [
	{ id: "type", value: "type", labelKey: "sortBy.type" },
	{ id: "nameAsc", value: "nameAsc", labelKey: "sortBy.nameAsc" },
	{ id: "nameDesc", value: "nameDesc", labelKey: "sortBy.nameDesc" },
	{
		id: "cardsCountAsc",
		value: "cardsCountAsc",
		labelKey: "sortBy.cardsCountAsc",
	},
	{
		id: "cardsCountDesc",
		value: "cardsCountDesc",
		labelKey: "sortBy.cardsCountDesc",
	},
];

type ScenarioDividerOptionsFormProps = GridProps & {
	layout: DividerLayout;
	story: StoryWithRelations;
	control: Control<ScenarioDividerParams>;
	defaultValues: Partial<ScenarioDividerParams>;
};

export function ScenarioDividerOptionsForm({
	layout,
	story,
	control,
	defaultValues,
	...props
}: ScenarioDividerOptionsFormProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const doubleSidePrintEnabled = useAppSelector(selectDoubleSidePrintEnabled);
	const campaignDividerCount = useAppSelector(selectCampaignDividersCount);
	const encounterSetDividerCount = useAppSelector(
		selectEncounterSetDividersCount,
	);
	const scenarioDividerCount = useAppSelector(selectScenarioDividersCount);

	const onSortByChange = useCallback(
		(
			event: SelectChangeEvent<unknown>,
			fieldOnChange: (value: ScenarioDividerSortBy) => void,
		) => {
			const sortBy = event.target.value as ScenarioDividerSortBy;
			fieldOnChange(sortBy);
			dispatch(sortScenarioDividers(sortBy));
		},
		[dispatch],
	);

	const { scenarioParams, additionalParams } = layout;

	const hasExtraEncounterSets = story.extra_encounter_sets.length > 0;
	const showAdditionalOptions =
		hasExtraEncounterSets ||
		scenarioParams?.cardsCount ||
		Boolean(additionalParams);

	const columnSize = 12 / (showAdditionalOptions ? 3 : 2);
	const size = { xs: 12, sm: 6, md: columnSize } as const;

	const { returnStory } = story;
	const columnSx: SxProps = {
		paddingInline: 1,
	};

	return (
		<Grid container {...props}>
			<Grid size={size} sx={columnSx}>
				<C.Header>{t("Campaign")}</C.Header>
				<Controller
					name="campaignDivider"
					control={control}
					render={({ field }) => (
						<FormControlLabel
							control={<Checkbox {...field} checked={field.value ?? false} />}
							label={`${t("Campaign Divider")} (${campaignDividerCount})`}
						/>
					)}
				/>
				<Controller
					name="encounterDividers"
					control={control}
					render={({ field }) => (
						<FormControlLabel
							control={<Checkbox {...field} checked={field.value ?? false} />}
							label={`${t("Encounter Dividers")} (${encounterSetDividerCount})`}
						/>
					)}
				/>
				{!isUndefined(scenarioParams?.campaignIcon) && (
					<Controller
						name="campaignIcon"
						control={control}
						render={({ field }) => (
							<FormControlLabel
								control={<Checkbox {...field} checked={field.value ?? false} />}
								label={t("Campaign Icon")}
							/>
						)}
					/>
				)}
			</Grid>
			<Grid size={size} sx={columnSx}>
				<C.Header>{t("Scenario")}</C.Header>
				<Controller
					name="scenarioDividers"
					control={control}
					render={({ field }) => (
						<FormControlLabel
							control={<Checkbox {...field} checked={field.value ?? false} />}
							label={`${t("Scenario Dividers")} (${scenarioDividerCount})`}
						/>
					)}
				/>
				<Controller
					name="scenarioEncounterDividers"
					control={control}
					render={({ field }) => (
						<FormControlLabel
							control={<Checkbox {...field} checked={field.value ?? false} />}
							label={`${t("Scenario Encounter Dividers")} (${scenarioDividerCount})`}
						/>
					)}
				/>
			</Grid>

			<Grid size={size} sx={columnSx}>
				<C.Header>{t("Additional")}</C.Header>

				<Stack gap={1}>
					{scenarioParams?.cardsCount && (
						<>
							<Controller
								name="campaignSize"
								control={control}
								render={({ field }) => (
									<FormControlLabel
										control={
											<Checkbox {...field} checked={field.value ?? false} />
										}
										label={t("Campaign Card Count")}
									/>
								)}
							/>
							<Controller
								name="encounterSize"
								control={control}
								render={({ field }) => (
									<FormControlLabel
										control={
											<Checkbox {...field} checked={field.value ?? false} />
										}
										label={t("Encounter Card Count")}
									/>
								)}
							/>
							<Controller
								name="scenarioSize"
								control={control}
								render={({ field }) => (
									<FormControlLabel
										control={
											<Checkbox {...field} checked={field.value ?? false} />
										}
										label={t("Scenario Card Count")}
									/>
								)}
							/>
						</>
					)}
					{hasExtraEncounterSets && (
						<Controller
							name="extraEncounterSets"
							control={control}
							render={({ field }) => (
								<FormControlLabel
									control={
										<Checkbox {...field} checked={field.value ?? false} />
									}
									label={t("Extra Dividers")}
								/>
							)}
						/>
					)}
					{layout.additionalParams?.singleSide && (
						<Controller
							name="singleSide"
							control={control}
							render={({ field }) => (
								<FormControlLabel
									control={
										<Checkbox
											{...field}
											checked={field.value ?? false}
											disabled={!doubleSidePrintEnabled}
										/>
									}
									label={t("layout.singleSideLayout")}
								/>
							)}
						/>
					)}
					<Controller
						name="sortBy"
						control={control}
						render={({ field }) => (
							<Select
								label={t("Sort by")}
								fullWidth
								size="small"
								data={SORT_BY_OPTIONS.map(({ id, value, labelKey }) => ({
									id,
									value,
									label: t(labelKey),
								}))}
								{...field}
								onChange={(event) => onSortByChange(event, field.onChange)}
								value={field.value ?? "type"}
							/>
						)}
					/>
				</Stack>
			</Grid>

			<Grid size={12} sx={columnSx}>
				{returnStory && (
					<Controller
						name="returnSet"
						control={control}
						render={({ field }) => (
							<FormControlLabel
								control={<Checkbox {...field} checked={field.value ?? false} />}
								label={
									<>
										{t`Include Return Set`}: {t(returnStory.name)}{" "}
										<OfficialIcon sx={{ position: "relative", top: 3 }} />
									</>
								}
							/>
						)}
					/>
				)}
			</Grid>
		</Grid>
	);
}
