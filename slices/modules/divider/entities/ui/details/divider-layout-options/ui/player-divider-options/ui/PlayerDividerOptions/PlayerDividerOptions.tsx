import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { selectLayout } from "@/modules/divider/entities/lib";
import { generatePlayerDividers } from "@/modules/divider/entities/lib/store/features/generatePlayerDividers";
import { cardSlots, cardTypes } from "@/modules/divider/shared/config";
import {
	selectPlayerParams,
	setPlayerParams,
} from "@/modules/divider/shared/lib";
import type {
	CardSlot,
	DividerSubtype,
	PlayerCardType,
	PlayerDividerParams,
	XPCost,
} from "@/modules/divider/shared/model";
import { ExperienceSelect } from "@/modules/divider/shared/ui";
import { factions } from "@/modules/faction/shared/config";
import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { Faction } from "@/modules/faction/shared/model";
import { selectStoryWithRelations } from "@/modules/story/entities/lib";
import { selectStories, setStoryCode } from "@/modules/story/shared/lib";
import { StorySelect } from "@/modules/story/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { CheckboxButton, IconButtonCheckbox, Row } from "@/shared/ui";
import * as C from "./PlayerDividerOptions.components";

export function PlayerDividerOptions(props: BoxProps) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const defaultValues = useAppSelector(selectPlayerParams);
	const layout = useAppSelector(selectLayout);

	const story = useAppSelector(selectStoryWithRelations);
	const stories = useAppSelector(selectStories);

	const { control, getValues, setValue, watch } = useForm<PlayerDividerParams>({
		defaultValues,
	});

	useEffect(() => {
		dispatch(setPlayerParams(getValues()));
		const subscription = watch((data) =>
			dispatch(setPlayerParams(data as PlayerDividerParams)),
		);
		return () => subscription.unsubscribe();
	}, [watch, getValues, dispatch]);

	const selectedCardTypes = getValues("cardTypes") ?? [];
	const selectedCardSlots = getValues("cardSlots") ?? [];

	const onChangeStory = useCallback(
		(code: string | null) => {
			dispatch(setStoryCode(code));
		},
		[dispatch],
	);

	const toggleCardType = useCallback(
		(cardType: PlayerCardType) => {
			const next = selectedCardTypes.includes(cardType)
				? selectedCardTypes.filter((c) => c !== cardType)
				: [...selectedCardTypes, cardType];

			setValue("cardTypes", next);
		},
		[selectedCardTypes, setValue],
	);

	const toggleCardSlot = useCallback(
		(cardSlot: CardSlot) => {
			const next = selectedCardSlots.includes(cardSlot)
				? selectedCardSlots.filter((c) => c !== cardSlot)
				: [...selectedCardSlots, cardSlot];

			setValue("cardSlots", next);
		},
		[selectedCardSlots, setValue],
	);

	const renderFactionCheckbox = useCallback(
		(faction: Faction) => {
			const factions = getValues("factions") ?? [];
			const checked = factions.includes(faction);

			const toggle = () => {
				const next = factions.includes(faction)
					? factions.filter((f) => f !== faction)
					: [...factions, faction];

				setValue("factions", next);
			};
			return (
				<IconButtonCheckbox
					size={42}
					icon={getFactionIcon(faction)}
					checked={checked}
					onChange={toggle}
				/>
			);
		},
		[getValues, setValue],
	);

	const renderSubtype = useCallback(
		(subtype: DividerSubtype) => {
			const subtypes = getValues("subtypes") ?? [];
			const checked = subtypes.includes(subtype);

			const label = t(`divider.subtype.${subtype}`);

			const toggle = () => {
				const next = subtypes.includes(subtype)
					? subtypes.filter((s) => s !== subtype)
					: [...subtypes, subtype];

				setValue("subtypes", next);
			};

			return (
				<FormControlLabel
					control={<Switch checked={checked} onChange={toggle} />}
					label={label}
				/>
			);
		},
		[getValues, setValue, t],
	);

	const onExperienceChange = useCallback(
		(value: XPCost[]) => {
			setValue("xpCosts", value);
		},
		[setValue],
	);

	const generate = useCallback(
		(mode: "create" | "add") => {
			const params = getValues();
			return () => {
				dispatch(
					generatePlayerDividers({
						...params,
						mode,
					}),
				);
			};
		},
		[dispatch, getValues],
	);

	return (
		<Box {...props}>
			<form>
				<Stack gap={2}>
					<C.Row>
						{factions.map((faction) => (
							<Controller
								key={faction}
								control={control}
								name="factions"
								render={() => renderFactionCheckbox(faction)}
							/>
						))}
					</C.Row>
					<C.Row>
						{renderSubtype("faction")}
						{renderSubtype("investigators")}
					</C.Row>
					<C.Row>
						{cardTypes.map((cardType) => (
							<CheckboxButton
								key={cardType}
								checked={selectedCardTypes.includes(cardType)}
								onChange={() => toggleCardType(cardType)}
							>
								{t(`card.type.${cardType}`)}
							</CheckboxButton>
						))}
					</C.Row>
					{selectedCardTypes.includes("asset") && (
						<Stack gap={1}>
							<C.Row>
								{cardSlots.map((cardSlot) => (
									<IconButtonCheckbox
										key={cardSlot}
										icon={`${cardSlot}_inverted`}
										size={42}
										checked={selectedCardSlots.includes(cardSlot)}
										onChange={() => toggleCardSlot(cardSlot)}
									/>
								))}
							</C.Row>
							<Box>
								<Divider sx={{ margin: "auto", maxWidth: 300 }} />
							</Box>

							<C.Row
								sx={{
									justifyContent: {
										xs: "flex-start",
										sm: "center",
									},
								}}
							>
								{renderSubtype("bonded")}
								{renderSubtype("customizations")}
							</C.Row>
						</Stack>
					)}
					<C.Row
						sx={{
							justifyContent: {
								xs: "flex-start",
								sm: "center",
							},
						}}
					>
						{renderSubtype("weakness")}
						{renderSubtype("basic_weakness")}
					</C.Row>
					{layout?.playerParams?.story && (
						<C.Row alignItems="stretch">
							<StorySelect
								stories={stories}
								value={story?.code ?? null}
								onChange={onChangeStory}
								containerSx={{ width: "100%", flex: 1 }}
							/>
						</C.Row>
					)}
					<C.Row>
						<Controller
							control={control}
							name="xpCosts"
							render={({ field }) => (
								<ExperienceSelect
									value={field.value ?? []}
									onChange={onExperienceChange}
									sx={{ flex: 1 }}
								/>
							)}
						/>
					</C.Row>
					{layout?.playerParams?.numericXP && (
						<Stack alignItems="center" justifyContent="center" gap={1}>
							<Controller
								control={control}
								name="numericXP"
								render={({ field }) => (
									<FormControlLabel
										control={
											<Switch checked={field.value} onChange={field.onChange} />
										}
										label={t("Numeric XP")}
									/>
								)}
							/>
						</Stack>
					)}
					<C.Row marginTop={4}>
						<Row flex={{ xs: 1, sm: 0 }} gap={2}>
							<Button
								variant="contained"
								sx={{ width: { xs: "100%", sm: "auto" } }}
								name="mode"
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
				</Stack>
			</form>
		</Box>
	);
}
