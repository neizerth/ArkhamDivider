export type Faction =
	| "mystic"
	| "guardian"
	| "rogue"
	| "neutral"
	| "seeker"
	| "survivor"
	| "multiclass";

export type PropsWithFaction = {
	faction: Faction;
};
