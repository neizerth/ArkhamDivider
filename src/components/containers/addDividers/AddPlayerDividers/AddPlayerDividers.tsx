import {
	Checkbox,
	Container,
	FactionSelect,
	IconButton,
	PlayerCardTypeSelect,
	Row,
	StorySelect,
} from "@/components";
import S from "./AddPlayerDividers.module.scss";
import { XPCostSelect } from "@/components";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ICardType, IXPCost, IFaction } from "@/shared/model/types/game";
import { ButtonType } from "@/shared/model/types/ui";
import { createToggleHanlder } from "@/shared/lib/features/util/forms";
import { addPlayerDividers } from "@/shared/lib/store/features/addDividers/addDividers";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import {
	removeAllDividers,
	selectStory,
} from "@/shared/lib/store/features/dividers/dividers";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/shared/lib/store/features/layout/layout";
import { isNil } from "ramda";
import { selectStories } from "@/shared/lib/store/features/stories/stories";

export type AddPlayerDividersProps = {};

export const AddPlayerDividers = ({}: AddPlayerDividersProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { playerOptions } = useAppSelector(selectLayout);
	const [xpCosts, setXPCosts] = useState<IXPCost[]>([]);
	const [factions, setFactions] = useState<IFaction[]>([]);
	const [types, setTypes] = useState<ICardType[]>([]);

	const [form, setForm] = useState({
		includeUpgrading: false,
		includeBasicWeakness: false,
		includeAllies: false,
		includeFactionId: false,
		includeBonded: false,
		includeCustomizations: false,
		displaySideXP: false,
		displayNumericXP: false,
		includeInvestigators: false,
	});

	const stories = useAppSelector(selectStories);
	const story = useAppSelector(selectStory);

	const check = createToggleHanlder(form, setForm);

	const onAdd = () => {
		dispatch(
			addPlayerDividers({
				xpCosts,
				factions,
				types,
				story,
				...form,
			}),
		);
	};

	const onGenerate = () => {
		onClear();
		onAdd();
	};

	const onClear = () => dispatch(removeAllDividers());

	return (
		<div className={S.container}>
			<Container>
				<div className={S.content}>
					<Row className={S.row} wrap>
						<FactionSelect onChange={setFactions} />
					</Row>
					<div className={S.rule} />
					<Row className={S.row} wrap>
						<Checkbox {...check("includeFactionId")}>
							{t("Card Factions")}
						</Checkbox>
						<Checkbox {...check("includeInvestigators")}>
							{t("Investigators")}
						</Checkbox>
					</Row>
					<div className={S.rule} />
					<Row className={S.row} wrap>
						<PlayerCardTypeSelect onChange={setTypes} />
					</Row>
					<div className={S.rule} />
					<Row wrap className={S.row}>
						<Checkbox {...check("includeAllies")}>{t("Ally")}</Checkbox>
						<Checkbox {...check("includeBonded")}>{t("Bonded")}</Checkbox>
						<Checkbox {...check("includeBasicWeakness")}>
							{t("Weakness")}
						</Checkbox>
					</Row>
					<div className={S.rule} />
					<Row wrap className={S.row}>
						<Checkbox {...check("includeUpgrading")}>{t("Upgrading")}</Checkbox>
						<Checkbox {...check("includeCustomizations")}>
							{t("Customizations")}
						</Checkbox>
					</Row>
					{playerOptions?.storySupported && (
						<>
							<div className={S.rule} />
							<Row wrap className={S.row}>
								<StorySelect
									stories={stories}
									className={S.storiesSelect}
									clear={true}
								/>
							</Row>
						</>
					)}
					<div className={S.rule} />
					<Row className={classNames(S.xpCost)} wrap>
						<div className={S.label}>{t("Experience")}</div>
						<XPCostSelect onChange={setXPCosts} />
					</Row>
					{playerOptions?.displaySideXP && (
						<Row wrap className={S.row}>
							{isNil(playerOptions?.displaySideXP) && (
								<Checkbox {...check("displaySideXP")}>{t("Side XP")}</Checkbox>
							)}

							{isNil(playerOptions?.displayNumericXP) && (
								<Checkbox {...check("displayNumericXP")}>
									{t("Numeric XP")}
								</Checkbox>
							)}
						</Row>
					)}
					<Row className={S.actions} wrap>
						<IconButton icon="check-thin" onClick={onGenerate}>
							{t("Generate")}
						</IconButton>
						<IconButton icon="plus-thin" onClick={onAdd}>
							{t("Add")}
						</IconButton>
						<IconButton
							icon="trash"
							buttonType={ButtonType.DANGER}
							onClick={onClear}
						>
							{t("Clear")}
						</IconButton>
					</Row>
				</div>
			</Container>
		</div>
	);
};
