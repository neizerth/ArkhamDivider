import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid, { type GridProps } from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
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
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { useAppSelector } from "@/shared/lib";
import * as C from "./ScenarioDividerOptionsForm.components";

type ScenarioDividerOptionsFormProps = GridProps & {
	layout: DividerLayout;
	story: StoryWithRelations;
	onSubmit: (params: ScenarioDividerParams) => void;
	control: Control<ScenarioDividerParams>;
	defaultValues: Partial<ScenarioDividerParams>;
};

export function ScenarioDividerOptionsForm({
	layout,
	story,
	onSubmit,
	control,
	defaultValues,
	...props
}: ScenarioDividerOptionsFormProps) {
	const { t } = useTranslation();

	const campaignDividerCount = useAppSelector(selectCampaignDividersCount);
	const encounterSetDividerCount = useAppSelector(
		selectEncounterSetDividersCount,
	);
	const scenarioDividerCount = useAppSelector(selectScenarioDividersCount);

	const { cardCountSupport = false, campaignIconSupport = false } = layout;

	const hasExtraEncounterSets = story.extra_encounter_sets.length > 0;
	const showAdditionalOptions = hasExtraEncounterSets || cardCountSupport;

	const columnSize = 12 / (showAdditionalOptions ? 3 : 2);
	const size = { xs: 12, sm: 6, md: columnSize } as const;

	const { returnStory } = story;

	return (
		<Grid container {...props}>
			<Grid size={size}>
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
				{campaignIconSupport && (
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
			<Grid size={size}>
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
				<Grid size={size}>
					<C.Header>{t("Additional")}</C.Header>

					<Stack gap={1}>
						{cardCountSupport && (
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
					</Stack>
				</Grid>
			)}
			<Grid size={12}>
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
