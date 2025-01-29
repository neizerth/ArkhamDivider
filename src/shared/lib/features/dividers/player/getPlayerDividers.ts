import { AddPlayerDividersOptions } from "@/shared/lib/store/features/addDividers/addDividers";
import { DividerSubtype, DividerType, IDivider } from "@/shared/model/types/dividers";
import {
	CardType,
	ICardType,
	IFaction,
	IXPCost,
	XPCost,
} from "@/shared/model/types/game";
import { uniqId } from "@/shared/lib/features/util/common";

export const getPlayerDividers = (options: AddPlayerDividersOptions) => {
	const { story } = options;
	const dividers = [
		...getBasicWeaknessDividers(options),
		...getUpgradingDividers(options),
		...getCustomizationsDividers(options),
		...getPlayerCardDividers(options),
		...getFactionIdDividers(options),
		...getFactionInvestigatorDividers(options),
		...getBondedDividers(options),
	];

	// console.log(story);
	return dividers.map((divider) => ({
		...divider,
		story,
		campaignIcon: story?.icon,
	}));
};

export const getPlayerCardDividers = (options: AddPlayerDividersOptions) => {
	const { xpCosts, factions, displaySideXP, displayNumericXP } = options;

	const types = [...options.types, ...getAllyType(options)];

	return factions
		.map((faction) => {
			return xpCosts
				.map((xpCost) => {
					return types
						.filter(
							({ type }) =>
								!(type === CardType.ALL && xpCost.level === XPCost.NO_COST),
						)
						.map((type): IDivider => {
							return {
								id: uniqId(),
								name: type.type === CardType.ALL ? faction.name : type.name,
								icon: type.icon || faction.icon,
								previewIcon: faction.icon,
								faction: faction.id,
								cardType: type.type,
								type: DividerType.PLAYER,
								displaySideXP,
								displayNumericXP,
								xpCost,
								subtype: type.subtype || DividerSubtype.CARD,
							};
						});
				})
				.flat();
		})
		.flat();
};

export const getAllyType = ({
	includeAllies,
}: {
	includeAllies: boolean;
}): ICardType[] => {
	if (!includeAllies) {
		return [];
	}

	return [
		{
			id: "ally",
			icon: "ally_inverted",
			type: CardType.ASSET,
			name: "Ally",
			subtype: DividerSubtype.ALLY,
		},
	];
};

export const getUpgradingDividers = ({
	factions,
	includeUpgrading,
	xpCosts,
}: {
	factions: IFaction[];
	includeUpgrading: boolean;
	xpCosts: IXPCost[];
}) => {
	if (!includeUpgrading) {
		return [];
	}
	return xpCosts
		.map((xpCost) =>
			factions.map(
				(faction): IDivider => ({
					id: uniqId(),
					name: "Upgrading",
					icon: faction.icon,
					specialIcon: "upgrade",
					xpCost,
					faction: faction.id,
					type: DividerType.PLAYER,
					subtype: DividerSubtype.UPGRADE,
				}),
			),
		)
		.flat();
};

export const getCustomizationsDividers = ({
	factions,
	includeCustomizations,
	xpCosts,
}: {
	factions: IFaction[];
	includeCustomizations: boolean;
	xpCosts: IXPCost[];
}) => {
	if (!includeCustomizations) {
		return [];
	}
	return xpCosts
		.map((xpCost) =>
			factions.map(
				(faction): IDivider => ({
					id: uniqId(),
					name: "Customizations",
					tags: ["customizations"],
					icon: faction.icon,
					specialIcon: "list",
					xpCost,
					faction: faction.id,
					type: DividerType.PLAYER,
					subtype: DividerSubtype.CUSTOMIZATIONS,
				}),
			),
		)
		.flat();
};

export const getBondedDividers = ({
	factions,
	includeBonded,
	xpCosts,
}: {
	factions: IFaction[];
	includeBonded: boolean;
	xpCosts: IXPCost[];
}) => {
	if (!includeBonded) {
		return [];
	}
	return xpCosts
		.map((xpCost) =>
			factions.map(
				(faction): IDivider => ({
					id: uniqId(),
					name: "Bonded",
					specialIcon: "link",
					icon: faction.icon,
					xpCost,
					faction: faction.id,
					type: DividerType.PLAYER,
					subtype: DividerSubtype.BONDED,
				}),
			),
		)
		.flat();
};

export const getFactionIdDividers = ({
	factions,
	includeFactionId,
	xpCosts,
}: {
	factions: IFaction[];
	includeFactionId: boolean;
	xpCosts: IXPCost[];
}) => {
	if (!includeFactionId) {
		return [];
	}
	return [
		...xpCosts
			.map((xpCost) =>
				factions.map((faction) => ({
					id: uniqId(),
					name: faction.name,
					icon: faction.icon,
					faction: faction.id,
					xpCost,
					type: DividerType.PLAYER,
					subtype: DividerSubtype.FACTION,
				})),
			)
			.flat(),
	];
};

export const getFactionInvestigatorDividers = ({
	factions,
	includeInvestigators,
}: {
	factions: IFaction[];
	includeInvestigators: boolean;
}) => {
	if (!includeInvestigators) {
		return [];
	}
	return factions
		.filter((faction) => faction.id !== "multiclass")
		.map(
			(faction): IDivider => ({
				id: uniqId(),
				name: "Investigators",
				icon: faction.icon,
				faction: faction.id,
				type: DividerType.PLAYER,
				subtype: DividerSubtype.INVESTIGATORS,
			}),
		);
};

export const getBasicWeaknessDividers = ({
	includeBasicWeakness,
}: AddPlayerDividersOptions) => {
	if (!includeBasicWeakness) {
		return [];
	}

	return [
		{
			id: uniqId(),
			name: "Basic Weakness",
			icon: "weakness",
			type: DividerType.PLAYER,
			subtype: DividerSubtype.BASIC_WEAKNESS,
		},
		{
			id: uniqId(),
			name: "Weakness",
			icon: "weakness",
			type: DividerType.PLAYER,
			subtype: DividerSubtype.WEAKNESS,
		},
	];
};
