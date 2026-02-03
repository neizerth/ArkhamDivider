import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectLayout } from "@/modules/divider/entities/lib";
import { cardSlots, cardTypes } from "@/modules/divider/shared/config";
import {
	selectPlayerParams,
	setPlayerParams,
} from "@/modules/divider/shared/lib";
import type {
	CardSlot,
	CardType,
	DividerSubtype,
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

export function PlayerDividerOptions(props: BoxProps) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const defaultValues = useAppSelector(selectPlayerParams);
	const layout = useAppSelector(selectLayout);

	const story = useAppSelector(selectStoryWithRelations);
	const stories = useAppSelector(selectStories);

	const { control, getValues, setValue } = useForm<PlayerDividerParams>({
		defaultValues,
	});

	const selectedCardTypes = getValues("cardTypes") ?? [];
	const selectedCardSlots = getValues("cardSlots") ?? [];

	const onChangeStory = useCallback(
		(code: string | null) => {
			dispatch(setStoryCode(code));
		},
		[dispatch],
	);

	const toggleCardType = useCallback(
		(cardType: CardType) => {
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

	const onParamsChange = useCallback(() => {
		const params = getValues();
		dispatch(setPlayerParams(params));
	}, [getValues, dispatch]);

	const onExperienceChange = useCallback(
		(value: XPCost[]) => {
			setValue("xpCosts", value);
		},
		[setValue],
	);

	return (
		<Box {...props}>
			<form onChange={onParamsChange}>
				<Stack gap={2}>
					<Row
						alignItems="center"
						justifyContent="center"
						gap={1}
						flexWrap="wrap"
					>
						{factions.map((faction) => (
							<Controller
								key={faction}
								control={control}
								name="factions"
								render={() => renderFactionCheckbox(faction)}
							/>
						))}
					</Row>
					<Row
						justifyContent="center"
						alignItems="center"
						gap={1}
						flexWrap="wrap"
					>
						{renderSubtype("faction")}
						{renderSubtype("investigators")}
					</Row>
					<Row
						justifyContent="center"
						alignItems="stretch"
						gap={1}
						flexWrap="wrap"
					>
						{cardTypes.map((cardType) => (
							<CheckboxButton
								key={cardType}
								checked={selectedCardTypes.includes(cardType)}
								onChange={() => toggleCardType(cardType)}
							>
								{t(`card.type.${cardType}`)}
							</CheckboxButton>
						))}
					</Row>
					{selectedCardTypes.includes("asset") && (
						<Stack gap={1}>
							<Row
								justifyContent="center"
								alignItems="stretch"
								gap={1}
								flexWrap="wrap"
							>
								{cardSlots.map((cardSlot) => (
									<IconButtonCheckbox
										key={cardSlot}
										icon={`${cardSlot}_inverted`}
										size={42}
										checked={selectedCardSlots.includes(cardSlot)}
										onChange={() => toggleCardSlot(cardSlot)}
									/>
								))}
							</Row>
							<Box>
								<Divider sx={{ margin: "auto", maxWidth: 300 }} />
							</Box>

							<Row
								alignItems="stretch"
								gap={1}
								flexWrap="wrap"
								sx={{
									justifyContent: {
										xs: "flex-start",
										sm: "center",
									},
								}}
							>
								{renderSubtype("bonded")}
								{renderSubtype("customizations")}
								{renderSubtype("upgrade")}
							</Row>
						</Stack>
					)}
					<Row
						sx={{
							justifyContent: {
								xs: "flex-start",
								sm: "center",
							},
						}}
						alignItems="stretch"
						gap={1}
						flexWrap="wrap"
					>
						{renderSubtype("weakness")}
						{renderSubtype("basic_weakness")}
					</Row>
					{layout?.playerStorySupport && (
						<Row
							justifyContent="center"
							alignItems="stretch"
							gap={1}
							flexWrap="wrap"
						>
							<StorySelect
								stories={stories}
								value={story?.code ?? null}
								onChange={onChangeStory}
								containerSx={{ width: "100%", flex: 1 }}
							/>
						</Row>
					)}
					<Stack alignItems="center" justifyContent="center" gap={1}>
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
					</Stack>
				</Stack>
			</form>
		</Box>
	);
}
