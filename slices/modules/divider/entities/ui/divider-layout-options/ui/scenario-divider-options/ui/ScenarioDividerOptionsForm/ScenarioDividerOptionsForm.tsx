import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid, { type GridProps } from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import type { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { GenerateScenarioDividersParams } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers";
import type { DividerLayout } from "@/modules/divider/shared/model";
import type { Story } from "@/modules/story/shared/model";
import * as C from "./ScenarioDividerOptionsForm.components";

type ScenarioDividerOptionsFormProps = GridProps & {
	layout: DividerLayout;
	story: Story;
	onSubmit: (params: GenerateScenarioDividersParams) => void;
	register: UseFormRegister<GenerateScenarioDividersParams>;
};

export function ScenarioDividerOptionsForm({
	layout,
	story,
	onSubmit,
	register,
	...props
}: ScenarioDividerOptionsFormProps) {
	const { t } = useTranslation();

	const { cardCountSupport = false, campaignIconSupport = false } = layout;
	const hasExtraEncounterSets = story.extra_encounter_sets.length > 0;
	const showAdditionalOptions = hasExtraEncounterSets || cardCountSupport;

	const columnSize = 12 / (showAdditionalOptions ? 3 : 2);
	const size = { xs: 12, sm: 6, md: columnSize } as const;

	return (
		<Grid container {...props}>
			<Grid size={size}>
				<C.Header>{t("Campaign")}</C.Header>
				<FormControlLabel
					control={<Checkbox />}
					label={t("Campaign Divider")}
					{...register("campaignDivider")}
				/>
				<FormControlLabel
					control={<Checkbox />}
					label={t("Encounter Dividers")}
					{...register("encounterDividers")}
				/>
				{campaignIconSupport && (
					<FormControlLabel
						control={<Checkbox />}
						label={t("Campaign Icon")}
						{...register("campaignIcon")}
					/>
				)}
			</Grid>
			<Grid size={size}>
				<C.Header>{t("Scenario")}</C.Header>
				<FormControlLabel
					control={<Checkbox />}
					label={t("Scenario Dividers")}
					{...register("scenarioDividers")}
				/>
				<FormControlLabel
					control={<Checkbox />}
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
									control={<Checkbox />}
									label={t("Encounter Size")}
									{...register("encounterSize")}
								/>
								<FormControlLabel
									control={<Checkbox />}
									label={t("Scenario Size")}
									{...register("scenarioSize")}
								/>
							</>
						)}
						{hasExtraEncounterSets && (
							<FormControlLabel
								control={<Checkbox />}
								label={t("Extra Dividers")}
								{...register("extraEncounterSets")}
							/>
						)}
					</Stack>
				</Grid>
			)}
		</Grid>
	);
}
