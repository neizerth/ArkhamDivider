import type { CardType } from "@/shared/model";
import type { StoryType } from "../model";

export const scenarioCardTypes: CardType[] = [
	"scenario",
	"agenda",
	"act",
	"location",
	"asset",
];

export const storyTypes: StoryType[] = ["campaign", "standalone", "challenge"];
