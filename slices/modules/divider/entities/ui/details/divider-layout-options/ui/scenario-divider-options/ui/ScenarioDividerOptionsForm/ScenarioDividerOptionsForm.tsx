import type { SxProps } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid, { type GridProps } from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { isUndefined } from "ramda-adjunct";
import { type Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { OfficialIcon } from "@/modules/core/icon/entities/ui";
import {
	selectCampaignDividersCount,
	selectEncounterSetDividersCount,
	selectScenarioDividersCount,
} from "@/modules/divider/entities/lib";
import type {
	DividerLayout,
	ScenarioDividerParams,
} from "@/modules/divider/shared/model";
import { selectDoubleSidePrintEnabled } from "@/modules/print/shared/lib";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { useAppSelector } from "@/shared/lib";
import * as C from "./ScenarioDividerOptionsForm.components";

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

	const doubleSidePrintEnabled = useAppSelector(selectDoubleSidePrintEnabled);
	const campaignDividerCount = useAppSelector(selectCampaignDividersCount);
	const encounterSetDividerCount = useAppSelector(
		selectEncounterSetDividersCount,
	);
	const scenarioDividerCount = useAppSelector(selectScenarioDividersCount);

	const { scenarioParams, additionalParams } = layout;

	const hasExtraEncounterSets = story.extra_encounter_sets.length > 0;
	const showAdditionalOptions =
		hasExtraEncounterSets ||
		scenarioParams?.cardCount ||
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
			{showAdditionalOptions && (
				<Grid size={size} sx={columnSx}>
					<C.Header>{t("Additional")}</C.Header>

					<Stack gap={1}>
						{scenarioParams?.cardCount && (
							<>
								<Controller
									name="encounterSize"
									control={control}
									render={({ field }) => (
										<FormControlLabel
											control={
												<Checkbox {...field} checked={field.value ?? false} />
											}
											label={t("Encounter Size")}
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
											label={t("Scenario Size")}
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
					</Stack>
				</Grid>
			)}
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
