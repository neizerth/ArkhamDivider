import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid, { type GridProps } from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import type { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { GenerateScenarioDividersParams } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers";
import type { DividerLayout } from "@/modules/divider/shared/model";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import * as C from "./ScenarioDividerOptionsForm.components";

type ScenarioDividerOptionsFormProps = GridProps & {
	layout: DividerLayout;
	story: StoryWithRelations;
	onSubmit: (params: GenerateScenarioDividersParams) => void;
	register: UseFormRegister<GenerateScenarioDividersParams>;
	defaultValues: Partial<GenerateScenarioDividersParams>;
};

export function ScenarioDividerOptionsForm({
	layout,
	story,
	onSubmit,
	register,
	defaultValues,
	...props
}: ScenarioDividerOptionsFormProps) {
	const { t } = useTranslation();

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
				<FormControlLabel
					control={<Checkbox defaultChecked={defaultValues.campaignDivider} />}
					label={t("Campaign Divider")}
					{...register("campaignDivider")}
				/>
				<FormControlLabel
					control={
						<Checkbox defaultChecked={defaultValues.encounterDividers} />
					}
					label={t("Encounter Dividers")}
					{...register("encounterDividers")}
				/>
				{campaignIconSupport && (
					<FormControlLabel
						control={<Checkbox defaultChecked={defaultValues.campaignIcon} />}
						label={t("Campaign Icon")}
						{...register("campaignIcon")}
					/>
				)}
			</Grid>
			<Grid size={size}>
				<C.Header>{t("Scenario")}</C.Header>
				<FormControlLabel
					control={<Checkbox defaultChecked={defaultValues.scenarioDividers} />}
					label={t("Scenario Dividers")}
					{...register("scenarioDividers")}
				/>
				<FormControlLabel
					control={
						<Checkbox
							defaultChecked={defaultValues.scenarioEncounterDividers}
						/>
					}
					label={t("Scenario Encounter Dividers")}
					{...register("scenarioEncounterDividers")}
				/>
			</Grid>
			{showAdditionalOptions && (
				<Grid size={size}>
					<C.Header>{t("Additional")}</C.Header>

					<Stack gap={1}>
						{cardCountSupport && (
							<>
								<FormControlLabel
									control={
										<Checkbox defaultChecked={defaultValues.encounterSize} />
									}
									label={t("Encounter Size")}
									{...register("encounterSize")}
								/>
								<FormControlLabel
									control={
										<Checkbox defaultChecked={defaultValues.scenarioSize} />
									}
									label={t("Scenario Size")}
									{...register("scenarioSize")}
								/>
							</>
						)}
						{hasExtraEncounterSets && (
							<FormControlLabel
								control={
									<Checkbox defaultChecked={defaultValues.extraEncounterSets} />
								}
								label={t("Extra Dividers")}
								{...register("extraEncounterSets")}
							/>
						)}
					</Stack>
				</Grid>
			)}
			<Grid size={12}>
				{returnStory && (
					<FormControlLabel
						control={<Checkbox defaultChecked={defaultValues.returnSet} />}
						label={`${t("Include Return Set")}: ${t(returnStory.name)}`}
						{...register("returnSet")}
					/>
				)}
			</Grid>
		</Grid>
	);
}
